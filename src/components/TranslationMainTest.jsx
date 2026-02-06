import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import winnerAnim from "../assets/winner1.gif";

// const words = [
//     { cz: "přijít s nápadem", nl: "bedenken" },
//     { cz: "naštvaný", nl: "kwaad" },
//     { cz: "citlivý", nl: "gevoelig" },
//     { cz: "spravedlivý", nl: "rechtvaardig" },
//     { cz: "nápomocný", nl: "behulpzaam" },
//     { cz: "stydlivý, plachý", nl: "verlegen" },
//     { cz: "učenlivý", nl: "leergierig" },
//     { cz: "pilný", nl: "ijverig" },
//     { cz: "opravdový", nl: "nuchter" },
//     { cz: "pečující", nl: "zorgzaam" },
//     { cz: "pochybovač", nl: "de twijfelaar" },
//     { cz: "útulnost", nl: "de gezelligheid" },
//     { cz: "shovívavý", nl: "toegeeflijk" },
//     { cz: "sebevědomý", nl: "zelfsverzekerd" },
//     { cz: "uvolněný", nl: "ontspannen" },
//     { cz: "věrný", nl: "trouw" },
//     { cz: "domácký", nl: "huiselijk" },
//     { cz: "rychlý", nl: "vlot" },
//     { cz: "bujný", nl: "opgewekt" },
//     { cz: "pověrčivý", nl: "bijgelovig" },
//     { cz: "letitý", nl: "bejaard" },
//     { cz: "úsporný", nl: "zuinig" },
//     { cz: "narušený", nl: "verstoord" },
//     { cz: "zaměnitelný", nl: "verwisselbaar" },
//     { cz: "ponurý", nl: "somber" },
//     { cz: "požadovat", nl: "eisen" },
//     { cz: "poslušný", nl: "flink" },
//     { cz: "blahoslavený", nl: "zalig" },
//     { cz: "nepříjemný", nl: "vervelend" },
//     { cz: "zmatený", nl: "verward" },
//     { cz: "kromě", nl: "behalve" },
//     { cz: "jedovatý", nl: "giftig" },
//     { cz: "vyvolávající závrať", nl: "duizelijk" },
//     { cz: "v bezvědomí", nl: "bewusteloos" },
//     { cz: "cítit nevolnost", nl: "misselijk" },
//     { cz: "indisponovaný", nl: "onwel" },
//     { cz: "uvolněný, volný, nepevný", nl: "los" },
//     { cz: "porouchaný", nl: "slecht verkeerd" },
//     { cz: "nebezpečný", nl: "gevaarlijk" },
//     { cz: "škodlivý", nl: "schadelijk" },
//     { cz: "dělat s", nl: "meemaken"},
//     { cz: "zdůraznit", nl: "beandrukken"},
//     { cz: "uvědomit si", nl: "doorkrijgen"},
//     { cz: "omluvit se", nl: "zich verontschuldigen"},
//     { cz: "koukat překvapeně", nl: "verbaasd kijken"},
//     { cz: "listovat v", nl: "bladeren door"},
//     { cz: "zkontrolovat", nl: "polsen"},
//     { cz: "ohyb, zatáčka", nl: "de bocht"},
//     { cz: "paprsek", nl: "de straal"},
//     { cz: "zářivý (jako paprsek)", nl: "stralend"},
//     { cz: "jmenovitě", nl: "naamelijk"},
//     { cz: "do (kam)", nl: "naartoe"},
//     { cz: "od (z)", nl: "vandaan"},
//     { cz: "trvat", nl: "duren"},
//     { cz: "vyzdobit", nl: "versieren"},
//     { cz: "sloužit", nl: "servieren"},
//     { cz: "sníst úplně", nl: "opeten"},
//     { cz: "had", nl: "de slang"},
//     { cz: "hadice (zahradní)", nl: "de tuinslang"},
//     { cz: "přesný", nl: "nauwkeurig"},
//     { cz: "viditelný", nl: "zichtbaar"},
//     { cz: "pohrdavý", nl: "minachtig"},
//     { cz: "zařídit", nl: "regelen"},
//     { cz: "nárokovat", nl: "beweren"},
//     { cz: "znamení", nl: "de teken"},
//     { cz: "spisovný jazyk", nl: "de eenheidstaal"},
//     { cz: "vzácný", nl: "zeldzaam"},
//     { cz: "pevný jako skála", nl: "muurvast"},
//     { cz: "kvůli", nl: "vanwege"},
//     { cz: "chybět", nl: "ontbreken"},
//     { cz: "vnucovat se", nl: "zich opdringen"},
//     { cz: "postavit se za", nl: "opkomen voor"},
//     { cz: "vnější zeď", nl: "de gevel"},
//     { cz: "hravý", nl: "ludiek"},
//     { cz: "současný", nl: "huidig"},
//     { cz: "dřívější", nl: "voormalig"},
//     { cz: "samozřejmě (jinak)", nl: "uiteraard"},
//     { cz: "plakát", nl: "de affiche"},
//     { cz: "nelegální skládka", nl: "het sluikstort"},
//     { cz: "konzultace", nl: "het overleg"},
//     { cz: "atrakce", nl: "de trekpleister"},
//     { cz: "památka", nl: "de bezienswaardigheid"},
//     { cz: "cesta kolem více míst", nl: "de tocht"},
//     { cz: "odpočinout si", nl: "uitrusten"},
//     { cz: "utkvět v paměti", nl: "zich bijblijven"},
//     { cz: "sebrat", nl: "oprapen"},
//     { cz: "impozantní", nl: "indrukwekkend"},
//     { cz: "pozlacený", nl: "verguld"},
//     { cz: "doporučit", nl: "aanprijzen"},
//     { cz: "schovat, ukrýt", nl: "verbergen"},
//     { cz: "poskytnout", nl: "toedienen"},
//     { cz: "odhadnout", nl: "inschatten"},
//     { cz: "přesvědčit", nl: "overtuigen"},
//     { cz: "destinace", nl: "de bestemming"},
//     { cz: "odkázat (na něco)", nl: "doorverwijzen"},
//     { cz: "pořadí", nl: "de volgorde"},
//     { cz: "seriózní, vážný", nl: "ernstig"},
//     { cz: "naléhavý, akutní", nl: "dringend"},
//     { cz: "nadbytečný", nl: "overbodig"},
//     { cz: "jednoduchý", nl: "eenvoudig"},
//     { cz: "nicméně", nl: "nochtans"},
//     { cz: "zažít", nl: "meemaken"}
// ]

const words = [
    { cz: "obývající", nl: "inwonend" },
    { cz: "pomaličku", nl: "stilaan" },
    { cz: "překvapující", nl: "verwonderlijk" },
    { cz: "být soustředěný", nl: "bewust zijn" },
    { cz: "být opatrný", nl: "aandachtig zijn" },
    { cz: "dávat pozor", nl: "aandacht krijgen" },
    { cz: "lézt", nl: "kruipen" },
    { cz: "strávit s", nl: "besteden aan" },
    { cz: "srazit se (auta)", nl: "botsen" },
    { cz: "zapříčinit", nl: "veroorzaken" },
    { cz: "společenská hra", nl: "het gezelschapspel" },
    { cz: "proužek", nl: "de strook" },
    { cz: "příčina", nl: "de veroorzaak" },
    { cz: "týden", nl: "de week" },
    { cz: "výhled na moře", nl: "het zeezicht" },
    { cz: "masívní", nl: "massaal" },
    { cz: "škrábat", nl: "krabben" },
    { cz: "strávit s", nl: "doorbrengen met" },
    { cz: "smutný", nl: "droevig" },
    { cz: "chřipka", nl: "de griep" },
    { cz: "nachlazení", nl: "de verkoudheid" },
    { cz: "střevo", nl: "de darmen" },
    { cz: "palce", nl: "de duimen" },
    { cz: "neschopenka", nl: "het doktersattest" },
    { cz: "horečka", nl: "het koorts" },
    { cz: "přebytek", nl: "het overschotje" },
    { cz: "smrkat", nl: "snuiten" },
    { cz: "šířit", nl: "verspreiden" },
    { cz: "nakazit", nl: "besmetten" },
    { cz: "předcházet", nl: "vermijden" },
    { cz: "opláchnout", nl: "afspoelen" },
    { cz: "patřit k", nl: "behoren tot" },
    { cz: "zastavit", nl: "tegenhouden" },
    { cz: "protřít", nl: "wrijven" },
    { cz: "přehánět", nl: "overdrijven" },
    { cz: "tekutý", nl: "vloeibaar" },
    { cz: "nicméně", nl: "nochtans" },
    { cz: "řetízek", nl: "de ketting" },
    { cz: "byt pro důchodce", nl: "de serviceflat" },
    { cz: "pomoc pro důchodce", nl: "de bejaardenhulp" },
    { cz: "denní centrum", nl: "het dagcentrum" },
    { cz: "domov důchodců", nl: "het rusthuis" },
    { cz: "spolužák", nl: "het klasgenootje" },
    { cz: "přesvědčit", nl: "overtuigen" },
    { cz: "uvědomit si", nl: "beseffen" },
    { cz: "rozhodnout se", nl: "beslissen" },
    { cz: "soucítit s", nl: "meevoelen met" },
    { cz: "diskutovat", nl: "bespreken" },
    { cz: "dojímat", nl: "zich ontroeren" },
    
]

/* Fisher–Yates shuffle */
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const pickRandomWords = (allWords, count) => {
    return shuffleArray([...allWords]).slice(0, count);
};

export const TranslationMainTest = ({ setWordsLength }) => {
    const [questionCount, setQuestionCount] = useState(10);
    const [started, setStarted] = useState(false);
    const [shuffledWords, setShuffledWords] = useState([]);

    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        setWordsLength(words.length);
    }, [setWordsLength]);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [currentIndex]);

    const startTest = () => {
        setShuffledWords(pickRandomWords(words, questionCount));
        setAnswers({});
        setResults({});
        setCurrentIndex(0);
        setFinished(false);
        setStarted(true);
    };

    const restartTest = () => {
        setStarted(false);
        setShuffledWords([]);
        setAnswers({});
        setResults({});
        setCurrentIndex(0);
        setFinished(false);
    };

    const checkAnswer = () => {
        const word = shuffledWords[currentIndex];
        const isCorrect =
            (answers[word.cz] || "").trim().toLowerCase() === word.nl;

        setResults((prev) => ({ ...prev, [word.cz]: isCorrect }));
        setCurrentIndex((prev) =>
            prev + 1 < shuffledWords.length ? prev + 1 : prev
        );
    };

    const handleChange = (value) => {
        setAnswers((prev) => ({
            ...prev,
            [shuffledWords[currentIndex].cz]: value,
        }));
    };

    const handleKeyPress = (event) => {
        if (
            event.key === "Enter" &&
            (answers[shuffledWords[currentIndex].cz] || "").trim() === ""
        ) {
            event.preventDefault();
            return;
        }
        if (event.key === "Enter") checkAnswer();
    };

    const increaseCount = () => {
        if (!started && questionCount < words.length) {
            setQuestionCount((c) => c + 1);
        }
    };

    const decreaseCount = () => {
        if (!started && questionCount > 1) {
            setQuestionCount((c) => c - 1);
        }
    };

    const isButtonDisabled = (word) =>
        (answers[word.cz] || "").trim() === "";

    const runConfetti = () => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    };

    return (
        <div className="flex flex-col items-center p-4 bg-yellow-50">
            <h2 className="text-lg text-center">
                Vertaal woorden van het Tsjechisch naar het Nederlands.
                Stel eerst het aantal woorden in en druk op <b>Start</b>.
            </h2>

            {/* Nastavení počtu */}
            <div className="flex items-center space-x-4 mt-4 mb-6">
                <button
                    onClick={decreaseCount}
                    disabled={started || questionCount <= 1}
                    className={`px-4 py-2 rounded-md ${
                        started || questionCount <= 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-red-400 hover:bg-red-500 text-white"
                    }`}
                >
                    −
                </button>

                <span className="text-xl font-semibold">{questionCount}</span>

                <button
                    onClick={increaseCount}
                    disabled={started || questionCount >= words.length}
                    className={`px-4 py-2 rounded-md ${
                        started || questionCount >= words.length
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-green-400 hover:bg-green-500 text-white"
                    }`}
                >
                    +
                </button>
            </div>

            {!started && (
                <button
                    onClick={startTest}
                    className="mb-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Start
                </button>
            )}

            {/* TEST */}
            {started && (
                <div className="w-full max-w-md bg-green-50 shadow-lg rounded-lg p-5">
                    {shuffledWords
                        .slice(0, currentIndex + 1)
                        .map((word, index) => (
                            <div
                                key={word.cz}
                                className="mb-4 flex flex-col sm:flex-row items-center sm:justify-between"
                            >
                                <span className="text-lg font-semibold w-1/3">
                                    {word.cz}
                                </span>

                                <input
                                    ref={index === currentIndex ? inputRef : null}
                                    type="text"
                                    className="border p-2 rounded-md w-full sm:w-1/3 text-center bg-white"
                                    value={answers[word.cz] || ""}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                    onKeyPress={handleKeyPress}
                                    disabled={results[word.cz] !== undefined}
                                />

                                {results[word.cz] === undefined ? (
                                    index === currentIndex && (
                                        <button
                                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            onClick={checkAnswer}
                                            disabled={isButtonDisabled(word)}
                                        >
                                            OK
                                        </button>
                                    )
                                ) : (
                                    <span
                                        className={`ml-4 text-lg ${
                                            results[word.cz]
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {results[word.cz] ? "✅" : "❌"}
                                    </span>
                                )}
                            </div>
                        ))}

                    {Object.keys(results).length === shuffledWords.length &&
                        !finished && (
                            <button
                                onClick={() => setFinished(true)}
                                className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Controleer
                            </button>
                        )}

                    {finished && (
                        <div className="mt-6 text-center">
                            <h3 className="text-xl font-bold">Resultaten</h3>

                            <p className="text-green-600">
                                Juist:{" "}
                                {Object.values(results).filter(Boolean).length}
                            </p>
                            <p className="text-red-600">
                                Fout:{" "}
                                {
                                    Object.values(results).filter((r) => !r)
                                        .length
                                }
                            </p>

                            {Object.values(results).every(Boolean) && (
                                <>
                                    <h1 className="text-3xl font-bold">
                                        Goed zo!
                                    </h1>
                                    <img
                                        src={winnerAnim}
                                        width="77%"
                                        alt="winner"
                                    />
                                    {runConfetti()}
                                </>
                            )}

                            <ul className="mt-2 text-left">
                                {shuffledWords.map((word) =>
                                    results[word.cz] === false ? (
                                        <li
                                            key={word.cz}
                                            className="text-red-600"
                                        >
                                            {word.cz} – juist:{" "}
                                            <b>{word.nl}</b>
                                        </li>
                                    ) : null
                                )}
                            </ul>

                            <button
                                onClick={restartTest}
                                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Nieuw test
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TranslationMainTest;