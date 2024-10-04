# Tiny XML Parser.
## Simple XML/Html parser.
---

Still pending features:
* CDATA
* Comments.

---

Usage:
```typescript
import {XMLParser} from "../index";
import {Buffer} from "buffer";



const TEST_HTML = `
  <html lang="en">
    <head><title>my title</title></head>
    <body>
      <p>My test starts now<br/>And this should be a new line, followed by an HR<hr/></p>
      Now <a href="https://www.google.com.br">a link to google</a>
    </body>
  </html>
  `;

const TEST_XML = `
  <root>
    <egg question="lungs">
      <bound cast="sudden">1303084126</bound>
      <effort>
        <copper>
          <accurate>exciting</accurate>
          <example>
            <play>
              <beside hay="victory">deep</beside>
              <mental evening="wash">
                <equipment grandfather="store">master</equipment>
                <fuel>
                  <motor>
                    <season>thank</season>
                    <shout combine="blanket">improve</shout>
                    <surface>means</surface>
                    <modern>she</modern>
                    <union>-807008260</union>
                    <lamp double="line">-1109661522.027597</lamp>
                    <average farther="couple">dream</average>
                    <edge>-2036530761.0569358</edge>
                    <shore>763896923.1687851</shore>
                  </motor>
                  <arrange onto="wind">heat</arrange>
                  <crew shown="stronger">square</crew>
                  <camp>-277624747.895421</camp>
                  <frighten addition="dead">-1294377836.0891328</frighten>
                  <instead captain="break">263057686.06744337</instead>
                  <else>six</else>
                  <immediately>1855937759.0306087</immediately>
                  <entirely stream="paint">try</entirely>
                  <enter>-971156049</enter>
                </fuel>
              </mental>
              <develop>weak</develop>
              <explanation>-126529756.96902657</explanation>
              <court>stared</court>
              <base>-873524073</base>
              <noise mountain="dress">1814773399.5241036</noise>
              <scene research="rapidly">1433945867</scene>
              <mad brass="changing">869914599</mad>
              <death darkness="no">some</death>
            </play>
            <home>43428815</home>
            <night>1733589386.9722686</night>
          </example>
        </copper>
        <feed exchange="coast">-517830646.41052437</feed>
      </effort>
      <introduced every="handle">aboard</introduced>
    </egg>
    <browserling>2114918562.3638167</browserling>
  </root>
  `;


function parseContent (content: string | Buffer) {
  let indentation = 0;

  const printContent = (...content: any[]) => {
    console.log(' '.repeat(indentation), ...content);
  }

  new XMLParser(content)
  .subscribe("tagOpen", (tagName: string, args) => {
    printContent("<", tagName, args, ">")
    indentation++
  })
  .subscribe("tagClose", (tagName: string) => {
    indentation--
    printContent("</", tagName, ">")
  })
  .subscribe("selfClosedTag", (tagName: string) => {
    indentation--
    printContent("<", tagName, "/>")
  })
  .subscribe("content", (content: string) => {
    printContent("```", content?.trim(), "```")
  })
  .subscribe("done", () => {
    printContent("done!")
  })
  .parse()
}

console.log(" ----- TEST_HTML -----");
parseContent(TEST_HTML);
console.log(" ----- TEST_SSML -----");
parseContent(TEST_XML);

```
