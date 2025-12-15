import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import winnerAnim from "../assets/winner1.gif";

// const words = [
//     { cz: "seznámit se (1. moment)", nl: "kennismaken" },
//     { cz: "seznámit se (proces)", nl: "leren kennen" },
//     { cz: "během (nějaké doby)", nl: "binnen" },
//     { cz: "dnes ráno", nl: "vanmorgen" },
//     { cz: "dnes přes den", nl: "vanmiddag" },
//     { cz: "dnes večer", nl: "vanavond" },
//     { cz: "horší než se čekalo", nl: "tegenvallen" },
//     { cz: "lepší než se čekalo", nl: "meevallen" },
//     { cz: "zůčastnit se", nl: "deelnemen" },
//     { cz: "polekat", nl: "schrikken" },
//     { cz: "kopat", nl: "schoppen" },
//     { cz: "bojovat", nl: "vechten" },
//     { cz: "nabírat (např. lopatou)", nl: "scheppen" },
//     { cz: "zasáhnout (cíl)", nl: "raken" },
//     { cz: "podnik", nl: "het bedrijf" },
//     { cz: "hromada", nl: "de stapel" },
//     { cz: "najednou", nl: "plots" },
//     { cz: "vedlejší cesta", nl: "de zijweg" },
//     { cz: "skvělý", nl: "geweldig" },
//     { cz: "zatknout", nl: "arresteren" },
//     { cz: "chytit, zadržet", nl: "vatten" },
//     { cz: "zatknout, uvěznit", nl: "vangen" },
//     { cz: "protestovat", nl: "betogen" },
//     { cz: "nesouhlasit", nl: "niet eens zijn" },
//     { cz: "ukázat", nl: "tonen" },
//     { cz: "vyhrožovat", nl: "bedreigen" },
//     { cz: "postřelit", nl: "neerschieten" },
//     { cz: "utéct", nl: "vluchten" },
//     { cz: "rozdat", nl: "vrijgeven" },
//     { cz: "zločinec", nl: "de dader" },
//     { cz: "trest vězení", nl: "de gevangenisstraf" },
//     { cz: "krádež", nl: "de diefstal" },
//     { cz: "identikit", nl: "de robotfoto" },
//     { cz: "podezřelý", nl: "de verdachte" },
//     { cz: "svědek", nl: "de getuige" },
//     { cz: "přepadení", nl: "de overval" },
//     { cz: "uprchlík", nl: "de vluchteling" },
//     { cz: "kumpán", nl: "de kompaan" },
//     { cz: "zbraň", nl: "het wapen" },
//     { cz: "armáda", nl: "het leger" },
//     { cz: "oběť", nl: "het slachtoffer" },
//     { cz: "státní zastupitelství", nl: "het Parket" },
//     { cz: "pryč", nl: "ervandoor" },
//     { cz: "bílý (rasa)", nl: "blank" },
//     { cz: "učitelka na ZŠ", nl: "de juf" },
//     { cz: "učitel na ZŠ", nl: "de meester" },
//     { cz: "narazit na někoho (potkat)", nl: "tegenkomen" },
//     { cz: "zápas (sportovní)", nl: "de wedstrijd" },
//     { cz: "zřídka", nl: "zelden" },
//     { cz: "pozor", nl: "aandacht" },
//     { cz: "rozšířit", nl: "verspreiden" },
//     { cz: "identifikovat", nl: "identificeren" },
//     { cz: "fakt", nl: "het feit" },
//     { cz: "vést", nl: "leiden" },
//     { cz: "přibližně", nl: "ongeveer" },
//     { cz: "holit se", nl: "scheren" },
//     { cz: "rámeček (brýlí)", nl: "de montuur" },
//     { cz: "svědectví", nl: "de getuigenis" },
//     { cz: "informace", nl: "de inlichting" },
//     { cz: "o, okolo, kolem, týkající se", nl: "omtrent" },
//     { cz: "strašně", nl: "ontzettend" },
//     { cz: "usadit se", nl: "zich vestigen" },
//     { cz: "přesvědčit", nl: "overtuigen" },
//     { cz: "samozřejmě", nl: "uiteraard" },
//     { cz: "skleník", nl: "de serre" },
//     { cz: "bankrot", nl: "het failliet" },
//     { cz: "veselý", nl: "monter" },
//     { cz: "prospěšný", nl: "duurzaam" },
//     { cz: "takzvaný", nl: "zogenomd" },
//     { cz: "slíbit komu", nl: "beloven van"},
//     { cz: "věřit", nl: "geloven"},
//     { cz: "důvěřovat komu", nl: "vertrouwen"},
//     { cz: "vysvětlit", nl: "uitleggen"},
//     { cz: "poskytnout informaci", nl: "aangeven"},
//     { cz: "stoupat", nl: "stijgen"},
//     { cz: "klesat", nl: "dalen"},
//     { cz: "vypadat jako", nl: "lijken op"},
//     { cz: "nejbližší", nl: "dichtsbijzijnde"},
//     { cz: "výrazný", nl: "opvallend"},
//     { cz: "ten samý (de)", nl: "dezelfde"},
//     { cz: "to samé (het)", nl: "hetzelfde"},
//     { cz: "stejně", nl: "even"},
//     { cz: "oba dva", nl: "allebei"},
//     { cz: "všichni tři", nl: "alle drie"},
//     { cz: "všichni (úplně)", nl: "allemaal"},
//     { cz: "oba", nl: "beide"},
//     { cz: "nikdo z nich", nl: "geen van beide"},
//     { cz: "smysl", nl: "de betekenis"},
//     { cz: "spíš", nl: "nogal"},
//     { cz: "rovina, ohled", nl: "vlak"},
//     { cz: "stříkat (inj.)", nl: "spuiten"},
//     { cz: "bavit se s", nl: "babbelen"},
//     { cz: "tlachat", nl: "kletsen"},
//     { cz: "příběh", nl: "het verhaal"},
//     { cz: "míchat", nl: "mengen"},
//     { cz: "chuť na (jinak)", nl: "goesting in"},
//     { cz: "jasný", nl: "duidelijk"},
//     { cz: "o čem", nl: "waarover"},
//     { cz: "vzhled (NED)", nl: "het uiterlijk"},
//     { cz: "charakter (NED)", nl: "het innerlijk"},
//     { cz: "identický", nl: "identiek"},
//     { cz: "vzhled (jinak)", nl: "de fysiek"},
//     { cz: "rozdíl", nl: "het verschil"},
//     { cz: "jednovaječný", nl: "eeneiig"},
//     { cz: "quasi", nl: "qua"},
//     { cz: "výzkum", nl: "het onderzoek"},
//     { cz: "lingvistika", nl: "het linguïstiek"},
//     { cz: "cíl", nl: "het doel"},
//     { cz: "vlastně", nl: "eigenlijk"},
//     { cz: "jak.. tak", nl: "zowel.. als"},
//     { cz: "charakteristický znak", nl: "het kenmark"},
//     { cz: "vlastnost", nl: "het eigenschap"},
//     { cz: "veselý", nl: "vrolijk"},
//     { cz: "vážný", nl: "ernstig"},
//     { cz: "usmívat se", nl: "glimlachen"},
//     { cz: "úsměv", nl: "de glimlach"},
//     { cz: "především", nl: "vooral"},
//     { cz: "smysl pro humor", nl: "het gevoel voor humor"},
//     { cz: "vtip", nl: "de grap"},
//     { cz: "vtipný", nl: "grappig"},
//     { cz: "pozorný", nl: "aandachtig"},
//     { cz: "rovnátka", nl: "de beugel"},
//     { cz: "nakřivo", nl: "scheef"},
//     { cz: "šejdrem", nl: "krom"},
//     { cz: "věřící", nl: "gelovig"},
//     { cz: "v penzi", nl: "met pensioen"},
//     { cz: "jít špatně", nl: "mislopen"},
//     { cz: "postižený", nl: "verlamd"},
//     { cz: "starající se o někoho", nl: "de mantelzorger"},
//     { cz: "záviset na", nl: "afhangen van"},
//     { cz: "docela, celkem", nl: "behoorlijk"},
//     { cz: "v důsledku čehož", nl: "waardoor"},
//     { cz: "trojčata", nl: "de drieling"},
//     { cz: "rozpoznat", nl: "onderscheiden"},
//     { cz: "očekávat", nl: "verwachten"},
//     { cz: "vloupání", nl: "de inbraak"},
//     { cz: "ohlásit", nl: "melden"},
//     { cz: "utéct", nl: "weglopen"},
//     { cz: "pamatovat, vzpomínat", nl: "herinneren"},
//     { cz: "chlap", nl: "de kerel"},
//     { cz: "přítomný", nl: "aanwezig"},
//     { cz: "nepřítomný", nl: "afwezig"},
//     { cz: "poznet", nl: "herkennen"},
//     { cz: "svatba", nl: "het huwelijk"},
//     { cz: "ženit se/vdávat se", nl: "huwen"},
//     { cz: "narození", nl: "de geboorte"},
//     { cz: "bohužel", nl: "helaas"},
//     { cz: "slavit", nl: "vieren"},
//     { cz: "nějaký", nl: "enkel"},
//     { cz: "smutný (jinak)", nl: "droevig"},
//     { cz: "strašně", nl: "erg"},
//     { cz: "vlastní", nl: "eigen"},
//     { cz: "důvod", nl: "de reden"},
//     { cz: "výzva, challenge", nl: "de uitdaging"},
// ];

const words = [
    { cz: "přátelský", nl: "vriendelijk" },
    { cz: "čestný", nl: "eerlijk"},
    { cz: "přesný", nl: "stipt"},
    { cz: "veselý", nl: "vrolijk"},
    { cz: "odolný proti stresu", nl: "stressbestandig"},
    { cz: "organizovaný", nl: "georganiseerd"},
    { cz: "flexibilní", nl: "flexibel"},
    { cz: "zdvořilý", nl: "beloofd"},
    { cz: "kreativní", nl: "creatief"},
    { cz: "optimistický", nl: "optimistisch"},
    { cz: "štědrý", nl: "vrijgevig"},
    { cz: "důvěryhodný", nl: "betrouwbaar"},
    { cz: "nepřátelský", nl: "onvriendelijk"},
    { cz: "nečestný", nl: "oneerlijk"},
    { cz: "vážný", nl: "ernstig"},
    { cz: "vystresovaný", nl: "gestresseerd"},
    { cz: "chaotický", nl: "chaotisch"},
    { cz: "neflexibilní", nl: "onflexiebel"},
    { cz: "nezdvořilý", nl: "onbeloofd"},
    { cz: "pesimistický", nl: "pessimistisch"},
    { cz: "lakomý", nl: "gierig"},
    { cz: "změna", nl: "de verandering"},
    { cz: "nedůvěryhodný", nl: "onbetrouwbaar"},
    { cz: "slib", nl: "het beloof"},
    { cz: "předpoklad", nl: "het vooroordeel"},
    { cz: "žádost (formální)", nl: "de aanvraag"},
    { cz: "význam", nl: "de betekenis"},
    { cz: "proces, procedura", nl: "de procedure"},
    { cz: "žádost, prosba", nl: "het verzoek"},
    { cz: "šťastný", nl: "blij"},
    { cz: "směšný", nl: "belachelijk"},
    { cz: "staromódní", nl: "ouderwets"},
    { cz: "špatný", nl: "verkeerd"},
    { cz: "oficiální", nl: "officieel"},
    { cz: "nazývat, jmenovat", nl: "noemen"},
    { cz: "znamenat", nl: "betekenen"},
    { cz: "změnit", nl: "veranderen"},
    { cz: "přijmout", nl: "aanvaarden"},
    { cz: "zamítnout", nl: "weigeren"},
    { cz: "zvažovat (myšlenku)", nl: "overwegen"},
    { cz: "vyslovit", nl: "uitspreken"},
    { cz: "zdrobnělé jméno", nl: "de roepnaam"},
    { cz: "vlídné oslovení", nl: "de koosnaam"},
    { cz: "jméno podle vlastnosti", nl: "de bijnaam"},
    { cz: "očekávat", nl: "verwachten"},
    { cz: "předat (tradici)", nl: "voortdoen"},
    { cz: "vymyslet, vynalézt", nl: "verzinnen"},
    { cz: "blázen do", nl: "zot van"},
    { cz: "kostka cukru", nl: "het suikerklontje"},
    { cz: "úvod", nl: "de inleiding"},
    { cz: "byznys", nl: "de zaak"},
    { cz: "vysílání", nl: "de uitzending"},
    { cz: "komín", nl: "de schoorsteen"},
    { cz: "rozdávat", nl: "uitdelen"},
    { cz: "věřit v", nl: "geloven in"},
    { cz: "rozbít (něco hmotného)", nl: "afbreken"},
    { cz: "ukončit (kontrakt, vztah)", nl: "verbreken"},
    { cz: "ponořit se", nl: "onderdompelen"},
    { cz: "řídit (firmu)", nl: "besturen"},
    { cz: "objasnit", nl: "uithalen"},
    { cz: "šikanovat", nl: "pesten"},
    { cz: "hodný", nl: "braaf"},
    { cz: "zlobivý", nl: "stout"},
    { cz: "okouzlující", nl: "betoeverend"},
    { cz: "oddechnutý", nl: "opgelucht"},
    { cz: "als formálně", nl: "indien"},
    { cz: "veselý", nl: "opgewekt"},
    { cz: "dostatečný", nl: "voldoende"},
    { cz: "nedostatečný", nl: "onvoldoende"},
    { cz: "opotřebovaný", nl: "versleten"},
    { cz: "bavit se", nl: "zich vervelen"},
    { cz: "předcházet něčemu", nl: "voorkomen"},
    { cz: "najmout někoho", nl: "aannemen"},
    { cz: "zklamat", nl: "teleurstellen"},
    { cz: "zvažovat něco", nl: "overwegen"},
    { cz: "odkazovat na", nl: "verwijzen naar"},
    { cz: "dravec", nl: "het roofdier"},
    { cz: "orel", nl: "de arend"},
    { cz: "kořist", nl: "de prooi"},
    { cz: "vina", nl: "de schuld"},
    { cz: "váha (přístroj)", nl: "de weegschaal"},
    { cz: "dodržet, splnit", nl: "nakomen"},
    { cz: "rozdat", nl: "uitdelen"},
    { cz: "nepřítel", nl: "de vijand"},
    { cz: "povolení", nl: "de vergunning"},
    { cz: "rodný list", nl: "de geboorteakte"},
    { cz: "kopie", nl: "het afschrift"},
    { cz: "kapesné", nl: "het zakgeld"},
    { cz: "pěstouni", nl: "de voogd"},
    { cz: "v případě, že", nl: "ingeval"},
    { cz: "zmatený", nl: "verward"},
    { cz: "platný", nl: "geldig"},
    { cz: "postoj, názor", nl: "het standpunt"},
    { cz: "nedorozumění", nl: "het misverstand"},
    { cz: "mít toho dost", nl: "beu"},
    { cz: "vést k", nl: "leiden tot"},
    { cz: "očekávat", nl: "afwachten"},
    { cz: "zpráva (článek)", nl: "het verslag"},
    { cz: "data", nl: "de gegevens"},
    { cz: "hádat se", nl: "betogen"},
    { cz: "rozdělení úkolů", nl: "de taakverdeling"},
    { cz: "životní cyklus", nl: "de levensloop"},
    { cz: "zvyk", nl: "de gewoonte"},
    { cz: "starat se o", nl: "zorgen voor"},
    { cz: "těšit se na", nl: "uitkijken naar"},
    { cz: "kromě", nl: "behalve"},
    { cz: "právě, hned", nl: "pas"},
    { cz: "rytmus", nl: "het ritme"},
    { cz: "nadcházející", nl: "komend"},
    { cz: "závislý na", nl: "afhankelijk van"},
    { cz: "soběstačný", nl: "zelfstandig"},
    { cz: "pozoruhodný", nl: "bijzonder"},
    { cz: "zaujmout", nl: "opvallen"},
    { cz: "přehánět", nl: "overdrijven"},
    { cz: "oloupat", nl: "schillen"},
    { cz: "osvěžit", nl: "verversen"},
    { cz: "ustlat (postel)", nl: "opmaken"},
    { cz: "znát", nl: "kennen"},
    { cz: "vědět", nl: "weten"},
    { cz: "pár", nl: "het koppel"},
    { cz: "vyváženost", nl: "het evenwicht"},
    { cz: "jediný", nl: "enig"},
    { cz: "poslušný", nl: "flink"},
    { cz: "boží", nl: "zalig"},
    { cz: "nepříjemný", nl: "vervelend"},
    { cz: "příbor", nl: "het bestek"}
];

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

export const TranslationMainTest = ({ setWordsLength }) => {
    const [shuffledWords, setShuffledWords] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [questionCount, setQuestionCount] = useState(120);
    const inputRef = useRef(null);

    useEffect(() => {
        setWordsLength(words.length);
    }, [setWordsLength]);

    useEffect(() => {
        setShuffledWords(shuffleArray([...words]));
    }, []);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [currentIndex]);

    const checkAnswer = () => {
        const word = shuffledWords[currentIndex];
        const isCorrect = (answers[word.cz] || "").trim().toLowerCase() === word.nl;
        setResults({ ...results, [word.cz]: isCorrect });
        setCurrentIndex((prev) => (prev + 1 < questionCount ? prev + 1 : prev));
    };

    const handleChange = (value) => {
        setAnswers({ ...answers, [shuffledWords[currentIndex].cz]: value });
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && (answers[shuffledWords[currentIndex].cz] || "").trim() === "") {
            event.preventDefault();
            return;
        }
        if (event.key === "Enter") checkAnswer();
    };

    const handleFinish = () => setFinished(true);

    const restartTest = () => {
        setShuffledWords(shuffleArray([...words]));
        setAnswers({});
        setResults({});
        setCurrentIndex(0);
        setFinished(false);
    };

    const increaseCount = () => {
        if (questionCount < words.length) setQuestionCount(questionCount + 1);
    };

    const decreaseCount = () => {
        if (questionCount > 1) setQuestionCount(questionCount - 1);
    };

    const isButtonDisabled = (word) => (answers[word.cz] || "").trim() === "";

    const runConfetti = () => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    };

    return (
        <div className="flex flex-col items-center p-4 bg-yellow-50">
            <h2 className="text-lg text-center">
                Vertaal {questionCount} woorden van het Tsjechisch naar het Nederlands. Verget niet de artikels (b.v. <b><u>het</u> huis</b>) en zich (b.v. <b><u>zich</u> wassen</b>)!
                Stel het aantal woorden in met de knoppen <b>+</b> en <b>-</b>.
            </h2>

            <div className="flex items-center space-x-4 mt-4 mb-6">
                <button
                    onClick={decreaseCount}
                    disabled={questionCount <= 1}
                    className={`px-4 py-2 rounded-md ${
                        questionCount <= 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-red-400 hover:bg-red-500 text-white"
                    }`}
                >
                    −
                </button>
                <span className="text-xl font-semibold">{questionCount}</span>
                <button
                    onClick={increaseCount}
                    disabled={questionCount >= words.length}
                    className={`px-4 py-2 rounded-md ${
                        questionCount >= words.length
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-green-400 hover:bg-green-500 text-white"
                    }`}
                >
                    +
                </button>
            </div>

            <div className="w-full max-w-md bg-green-50 shadow-lg rounded-lg pt-5 pl-5 pr-5 pb-2">
                {shuffledWords.slice(0, Math.min(currentIndex + 1, questionCount)).map((word, index) => (
                    <div key={word.cz} className="mb-4 flex flex-col sm:flex-row items-center sm:justify-between">
                        <span className="text-lg font-semibold w-1/3 text-center sm:text-left">{word.cz}</span>
                        <input
                            ref={index === currentIndex ? inputRef : null}
                            type="text"
                            className="border p-2 rounded-md w-full sm:w-1/3 text-center bg-white"
                            value={answers[word.cz] || ""}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={results[word.cz] !== undefined}
                        />
                        {results[word.cz] === undefined ? (
                            index === currentIndex && (
                                <button
                                    className="ml-0 sm:ml-1 mt-2 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    onClick={checkAnswer}
                                    disabled={isButtonDisabled(word)}
                                >
                                    OK
                                </button>
                            )
                        ) : (
                            <span
                                className={`ml-4 mr-4 text-lg font-semibold ${
                                    results[word.cz] ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                {results[word.cz] ? "✅" : "❌"}
                            </span>
                        )}
                    </div>
                ))}

                {Object.keys(results).length === questionCount && !finished && (
                    <button
                        onClick={handleFinish}
                        className="mt-4 mb-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Controleer
                    </button>
                )}

                {finished && (
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-bold">Resultaten</h3>
                        <p className="text-green-600 font-semibold">
                            Juist: {Object.values(results).filter(Boolean).length}
                        </p>
                        <p className="text-red-600 font-semibold">
                            Fout: {Object.values(results).filter((r) => !r).length}
                        </p>
                        {Object.values(results).filter((r) => !r).length === 0 && (
                            <>
                                <h1 className="font-bold text-3xl">Goed zo!</h1>
                                <img src={winnerAnim} width="77%" alt="winner" />
                                {runConfetti()}
                            </>
                        )}

                        <ul className="mt-2 text-left">
                            {shuffledWords.slice(0, questionCount).map((word) =>
                                results[word.cz] === false ? (
                                    <li key={word.cz} className="text-red-600">
                                        {word.cz} – juist: <b>{word.nl}</b>
                                    </li>
                                ) : null
                            )}
                        </ul>

                        <button
                            onClick={restartTest}
                            className="mt-4 mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Test herhalen
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TranslationMainTest;
