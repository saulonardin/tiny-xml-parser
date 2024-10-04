import {Buffer} from "buffer";
import {EventEmitter} from "events";
import {XMLParserEvents, XMLParserEventTypes} from "./common-types";

type TagType = {
  name: string,
  params: Record<string, string | undefined>,
  isCloseTag: boolean,
};

export class XMLParser {
  private static readonly BEGIN_OF_TAG_CHARS = ["<", "</"];
  private static readonly END_OF_TAG_CHARS = [">"];
  private static readonly TAG_CLOSER_CHARS = ["/"];
  private static readonly BLANK_CHARS = [' ', '\n', '\r', '\t', '\f', '\v'];
  private static readonly END_OF_TAG_NAME_CHARS = [...XMLParser.BLANK_CHARS, ">"];
  private static readonly PARAM_SEPARATOR_CHARS = ["="];
  private static readonly ESCAPE_CHARS = ["\\"];
  private static readonly QUOTES = ['"', "'"];
  private static readonly END_OF_TAG_PARAM_NAME_CHARS = [...XMLParser.PARAM_SEPARATOR_CHARS, ...XMLParser.END_OF_TAG_CHARS];
  private static readonly BLANK_SPACE_OR_BEGIN_OF_TAG_CHARS = [...XMLParser.BLANK_CHARS, ...XMLParser.BEGIN_OF_TAG_CHARS];

  private content: string;
  private readonly eventEmitter = new EventEmitter();
  private bytesRead = 0;

  constructor(text: string | Buffer) {
    this.content = text instanceof Buffer ? text.toString() : text;
  }

  private hasData(): boolean {
    return this.content.length > 0;
  }

  private read(count: number = 1): string | undefined {
    if (!this.hasData()) return undefined;
    if (count > this.content.length) count = this.content.length;
    this.bytesRead += count;

    const result = this.content.slice(0, count);
    this.content = this.content.slice(count);
    return result;
  }

  private spyChar(idx: number = 0): string {
    if (!this.hasData() || idx >= this.content.length) return "";
    return this.content[idx];
  }

  public parse(): void {
    while (this.hasData()) {
      this.handleContent();
      this.handleTag();
    }
    this.emit("done");
  }

  private nextIndexOf(...values: string[]): number {
    return values.reduce((minIndex, value) => {
      const idx = this.content.indexOf(value);
      return (idx !== -1 && (minIndex === -1 || idx < minIndex)) ? idx : minIndex;
    }, -1);
  }

  private handleContent(): void {
    const tagIdx = this.nextIndexOf(...XMLParser.BEGIN_OF_TAG_CHARS);
    if (tagIdx === -1) {
      this.emit("content", this.read(this.content.length) ?? "");
    } else if (tagIdx > 0) {
      this.emit("content", this.read(tagIdx) ?? "");
    }
  }

  private handleTag() {
    if (!this.hasData()) return;

    let tag: TagType = {
      name: "",
      params: {},
      isCloseTag: false,
    };

    this.skipChars(XMLParser.BLANK_SPACE_OR_BEGIN_OF_TAG_CHARS);
    const eoTagName = this.nextIndexOf(...XMLParser.END_OF_TAG_NAME_CHARS);

    if (eoTagName === -1) throw new Error(`Invalid tag at ${this.bytesRead}`);
    const tagName = this.read(eoTagName)!.trim();
    tag = this.parseTagName(tag, tagName);
    this.skipChars(XMLParser.BLANK_CHARS);

    if (XMLParser.TAG_CLOSER_CHARS.includes(this.spyChar())) {
      this.read(); // consume '/'
      if (this.handleEndOfTag(tag, true)) return;
    } else if (this.handleEndOfTag(tag, false)) {
      return;
    }
    tag.params = this.extractTagAttributes();
    if (this.handleEndOfTag(tag, false)) {
      return;
    }
  }

  private skipChars(chars: string[]) {
    while (this.hasData() && chars.includes(this.spyChar())) {
      this.read();
    }
  }

  private parseTagName(tag: TagType, tagName: string): TagType {
    const isCloseTag = XMLParser.TAG_CLOSER_CHARS.some(char => tagName.startsWith(char));
    return {
      ...tag,
      name: isCloseTag ? tagName.substring(1) : tagName,
      isCloseTag,
    };
  }

  private handleEndOfTag(tag: TagType, selfClosed: boolean): boolean {
    if (this.spyChar() === ">") {
      this.read(); // consume '>'
      if (selfClosed) {
        this.emit("selfClosedTag", tag.name, tag.params);
      } else if (tag.isCloseTag) {
        this.emit("tagClose", tag.name);
      } else {
        this.emit("tagOpen", tag.name, tag.params);
      }
      return true;
    }
    return false;
  }

  private extractTagAttributes(): Record<string, string | undefined> {
    const params: Record<string, string | undefined> = {};

    while (this.hasData() && !XMLParser.END_OF_TAG_CHARS.includes(this.spyChar())) {
      this.skipChars(XMLParser.BLANK_CHARS);
      const attributeName = this.readWhile(char => !XMLParser.END_OF_TAG_PARAM_NAME_CHARS.includes(char)) || "";
      this.skipChars([...XMLParser.BLANK_CHARS, ...XMLParser.PARAM_SEPARATOR_CHARS]);
      params[attributeName] = this.readAttributeValue();
    }
    return params;
  }

  private readWhile(predicate: (char: string) => boolean): string {
    let result = "";
    while (this.hasData() && predicate(this.spyChar())) {
      result += this.read();
    }
    return result;
  }

  private readAttributeValue(): string {
    if (!this.hasData() || !XMLParser.QUOTES.includes(this.spyChar())) return '';

    const quoteChar = this.read();
    let value = '';
    let escaping = false;

    while (this.hasData()) {
      const char = this.read()!;
      if (escaping) {
        value += char;
        escaping = false;
      } else if (XMLParser.ESCAPE_CHARS.includes(char)) {
        escaping = true;
      } else if (quoteChar && char === quoteChar) {
        break;
      } else if (!quoteChar && XMLParser.BLANK_SPACE_OR_BEGIN_OF_TAG_CHARS.includes(char)) {
        break;
      } else {
        value += char;
      }
    }

    return value;
  }

  private emit<Event extends XMLParserEventTypes>(event: Event, ...params: Parameters<XMLParserEvents[Event]>) {
    this.eventEmitter.emit(event, ...params);
  }

  public subscribe<Event extends XMLParserEventTypes>(event: Event, listener: XMLParserEvents[Event]): this {
    this.eventEmitter.on(event, listener);
    return this;
  }
}
