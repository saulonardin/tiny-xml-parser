export type XMLParserTagAttributes = Record<string, string|undefined>;

export interface XMLParserEvents {
  tagOpen: (tagName: string, attributes: XMLParserTagAttributes) => void;
  tagClose: (tagName: string) => void;
  content: (content: string) => void;
  selfClosedTag: (tagName: string, attributes: XMLParserTagAttributes) => void;
  done: () => void;
}

export type XMLParserEventTypes = keyof XMLParserEvents;
