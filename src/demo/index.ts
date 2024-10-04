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
                    <taken>
                      <saw>1559519361.2729125</saw>
                      <cell farmer="explain">
                        <south>1399007795</south>
                        <play seeing="which">-345001081</play>
                        <score beauty="size">hay</score>
                        <industry>catch</industry>
                        <safety halfway="solid">choose</safety>
                        <protection>17060687.899629116</protection>
                        <funny rod="north">
                          <ran spell="needs">-169368696</ran>
                          <interior>experience</interior>
                          <fireplace related="outline">-1015311410</fireplace>
                          <western ball="college">-846270052</western>
                          <spread off="bet">
                            <typical>
                              <week locate="nest">-585682699</week>
                              <against know="gift">shine</against>
                              <keep tell="complex">
                                <tight straw="rise">
                                  <forward>
                                    <popular>-1747391870.9788966</popular>
                                    <managed>
                                      <explore>bad</explore>
                                      <related>
                                        <muscle>them</muscle>
                                        <nose wind="peace">-335488273</nose>
                                        <chemical>
                                          <pull>697018202.9704647</pull>
                                          <alphabet needs="bring">1771782480</alphabet>
                                          <declared spite="agree">where</declared>
                                          <weight>-1687399184.1008482</weight>
                                          <gold>947429543</gold>
                                          <my>prove</my>
                                          <second>became</second>
                                          <under>-640076502.6432409</under>
                                          <engine experiment="hard">try</engine>
                                          <radio somebody="operation">58218644</radio>
                                        </chemical>
                                        <enter>1987099432</enter>
                                        <electricity>trunk</electricity>
                                        <shade>-867835450</shade>
                                        <increase shown="floor">1490328955</increase>
                                        <anything making="tightly">dirt</anything>
                                        <burst hair="tax">magnet</burst>
                                        <command>tail</command>
                                      </related>
                                      <powerful>-1042376735</powerful>
                                      <traffic>different</traffic>
                                      <welcome>-1259425714</welcome>
                                      <medicine impossible="reason">-1273752894.7658324</medicine>
                                      <plant>-1298836539.7607656</plant>
                                      <forget>-1335537695.7219825</forget>
                                      <cheese>1919998910.0096369</cheese>
                                      <planned>-1199577750</planned>
                                    </managed>
                                    <twice>-463240045</twice>
                                    <band>wood</band>
                                    <along>1625788358.4138775</along>
                                    <chance>dried</chance>
                                    <where sure="yourself">bread</where>
                                    <major bound="helpful">halfway</major>
                                    <shout won="power">tongue</shout>
                                    <capital>-1966107405.7860842</capital>
                                  </forward>
                                  <whatever garden="same">-1132105722</whatever>
                                  <go proper="labor">engineer</go>
                                  <slowly>end</slowly>
                                  <larger stranger="visitor">1258877650.9194908</larger>
                                  <excitement>birth</excitement>
                                  <mirror>announced</mirror>
                                  <surrounded whale="back">-1728152018</surrounded>
                                  <pull animal="nation">having</pull>
                                  <race>-269370543.82869625</race>
                                </tight>
                                <children>1788153635</children>
                                <tape>161878424</tape>
                                <fix>-2051650810</fix>
                                <similar television="service">tight</similar>
                                <alike correct="excellent">2050076287</alike>
                                <answer greatly="iron">grass</answer>
                                <piano nearer="clearly">universe</piano>
                                <popular breeze="jack">frame</popular>
                                <corn>1683372490.8155665</corn>
                              </keep>
                              <both came="welcome">porch</both>
                              <done>skin</done>
                              <sky even="force">1294055694</sky>
                              <globe over="forty">-1909918376</globe>
                              <fly>with</fly>
                              <wash pattern="salt">1068266852.0332999</wash>
                              <trade>-1636529415.2446165</trade>
                            </typical>
                            <duck body="line">-772783145</duck>
                            <bag involved="whose">usual</bag>
                            <captured>-1948470729</captured>
                            <serious us="wet">2122111345</serious>
                            <boy front="likely">palace</boy>
                            <joy suit="combine">1719645828.014968</joy>
                            <spite>-385211142</spite>
                            <longer struck="bell">return</longer>
                            <bound particular="mean">-1438145640.3058987</bound>
                          </spread>
                          <cut lower="private">1238580970.0497289</cut>
                          <leave rain="card">990398946</leave>
                          <rice source="scientist">-2086938216.4310722</rice>
                          <court became="choose">1107685831.537539</court>
                          <title needs="noun">football</title>
                        </funny>
                        <yesterday>run</yesterday>
                        <bag>halfway</bag>
                        <master environment="top">123066097</master>
                      </cell>
                      <whale>-1959428370.626246</whale>
                      <pain tip="shore">-1848448699</pain>
                      <stove>unknown</stove>
                      <fog>-2052295370</fog>
                      <gradually>-1266653498.469092</gradually>
                      <opinion>388361360</opinion>
                      <crew>-2129629504.3082466</crew>
                      <organization>-1022068578</organization>
                    </taken>
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
                <related>1514679220.186871</related>
                <touch mostly="judge">deal</touch>
                <chart person="plain">brass</chart>
                <colony>2127448388</colony>
                <came>plus</came>
                <mighty seems="strong">somebody</mighty>
                <chemical consist="within">-1000268425.3185291</chemical>
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
            <pan musical="somebody">1224892179</pan>
            <solve swing="tape">better</solve>
            <ancient hill="nearby">1564551903.0023956</ancient>
            <suddenly myself="raw">begun</suddenly>
            <circle>load</circle>
            <remove baby="pleasure">-942760290</remove>
            <off>object</off>
          </example>
          <pain mice="highest">-708222383.6239381</pain>
          <plan>stared</plan>
          <gather claws="meant">1154213055.8358474</gather>
          <still symbol="driver">525530228.70248795</still>
          <easily tired="this">plus</easily>
          <plane>surprise</plane>
          <browserling leaving="shadow">-405811284</browserling>
          <college bring="slept">-2027212885.4797397</college>
        </copper>
        <feed exchange="coast">-517830646.41052437</feed>
        <picture eager="language">nation</picture>
        <more>root</more>
        <park>came</park>
        <daughter>desk</daughter>
        <comfortable>gasoline</comfortable>
        <youth front="dropped">1332561997</youth>
        <burn during="giant">-2023602152</burn>
        <gentle>783376190.7175431</gentle>
      </effort>
      <introduced every="handle">aboard</introduced>
      <agree>-1947427604.168274</agree>
      <hill round="wherever">characteristic</hill>
      <discussion also="seen">-937905413</discussion>
      <laid good="length">calm</laid>
      <crack husband="announced">-348414762</crack>
      <moving>1278449540.699811</moving>
      <sell percent="fellow">were</sell>
    </egg>
    <browserling>2114918562.3638167</browserling>
    <morning composed="get">partly</morning>
    <bare>friendly</bare>
    <save>fall</save>
    <related>later</related>
    <box left="introduced">middle</box>
    <dawn faster="whatever">-1858660344</dawn>
    <fierce>-1706176822.1351027</fierce>
    <pan>-1172008500.2502646</pan>
  </root>
  `;

const parseContent = (content: string | Buffer) => {
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

async function main() {
  console.log(" ----- TEST_HTML -----");
  parseContent(TEST_HTML);
  console.log(" ----- TEST_SSML -----");
  parseContent(TEST_XML);
}


main()
.then(() => console.log("Application completed"))
.catch(e => console.error(`Error occurred: ${e}`, e));
