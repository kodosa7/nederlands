import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import winnerAnim from "../assets/winner1.gif";

const words = [
    { cz: "přijít s nápadem", nl: "bedenken" },
    { cz: "naštvaný", nl: "kwaad" },
    { cz: "citlivý", nl: "gevoelig" },
    { cz: "spravedlivý", nl: "rechtvaardig" },
    { cz: "nápomocný", nl: "behulpzaam" },
    { cz: "stydlivý, plachý", nl: "verlegen" },
    { cz: "učenlivý", nl: "leergierig" },
    { cz: "pilný", nl: "ijverig" },
    { cz: "opravdový", nl: "nuchter" },
    { cz: "pečující", nl: "zorgzaam" },
    { cz: "pochybovač", nl: "de twijfelaar" },
    { cz: "útulnost", nl: "de gezelligheid" },
    { cz: "shovívavý", nl: "toegeeflijk" },
    { cz: "sebevědomý", nl: "zelfsverzekerd" },
    { cz: "uvolněný", nl: "ontspannen" },
    { cz: "věrný", nl: "trouw" },
    { cz: "domácký", nl: "huiselijk" },
    { cz: "rychlý", nl: "vlot" },
    { cz: "bujný", nl: "opgewekt" },
    { cz: "pověrčivý", nl: "bijgelovig" },
    { cz: "letitý", nl: "bejaard" },
    { cz: "úsporný", nl: "zuinig" },
    { cz: "narušený", nl: "verstoord" },
    { cz: "zaměnitelný", nl: "verwisselbaar" },
    { cz: "ponurý", nl: "somber" },
    { cz: "požadovat", nl: "eisen" },
    { cz: "poslušný", nl: "flink" },
    { cz: "blahoslavený", nl: "zalig" },
    { cz: "nepříjemný", nl: "vervelend" },
    { cz: "zmatený", nl: "verward" },
    { cz: "kromě", nl: "behalve" },
    { cz: "jedovatý", nl: "giftig" },
    { cz: "vyvolávající závrať", nl: "duizelijk" },
    { cz: "v bezbědomí", nl: "bewusteloos" },
    { cz: "cítit nevolnost", nl: "misselijk" },
    { cz: "indisponovaný", nl: "onwel" },
    { cz: "uvolněný, volný, nepevný", nl: "los" },
    { cz: "porouchaný", nl: "slecht verkeerd" },
    { cz: "nebezpečný", nl: "gevaarlijk" },
    { cz: "škodlivý", nl: "schadelijk" },
    { cz: "dělat s", nl: "meemaken"},
    { cz: "zdůraznit", nl: "beandrukken"},
    { cz: "uvětomit si", nl: "doorkrijgen"},
    { cz: "omluvit se", nl: "zich verontschuldigen"},
    { cz: "koukat překvapeně", nl: "verbaasd kijken"},
    { cz: "listovat v", nl: "bladeren door"},
    { cz: "zkontrolovat", nl: "polsen"},
    { cz: "ohyb, zatáčka", nl: "de bocht"},
    { cz: "paprsek", nl: "de straal"},
    { cz: "zářivý (jako paprsek)", nl: "stralend"},
    { cz: "jmenovitě", nl: "naamelijk"},
    { cz: "do (kam)", nl: "naartoe"},
    { cz: "od (z)", nl: "vandaan"},
    { cz: "trvat", nl: "duren"},
    { cz: "vyzdobit", nl: "versieren"},
    { cz: "sloužit", nl: "servieren"},
    { cz: "sníst úplně", nl: "opeten"},
    { cz: "had", nl: "de slang"},
    { cz: "hadice (zahradní)", nl: "de tuinslang"},
    { cz: "přesný", nl: "nauwkeurig"},
    { cz: "viditelný", nl: "zichtbaar"},
    { cz: "pohrdavý", nl: "minachtig"},
    { cz: "zařídit", nl: "regelen"},
    { cz: "nárokovat", nl: "beweren"},
    { cz: "znamení", nl: "de teken"},
    { cz: "spisovný jazyk", nl: "de eenheidstaal"},
    { cz: "vzácný", nl: "zeldzaam"},
    { cz: "pevný jako skála", nl: "muurvast"},
    { cz: "kvůli", nl: "vanwege"},
    { cz: "chybět", nl: "ontbreken"},
    { cz: "vnucovat se", nl: "zich opdringen"},
    { cz: "postave se za", nl: "opkomen voor"},
    { cz: "vnější zeď", nl: "de gevel"},
    { cz: "hravý", nl: "ludiek"},
    { cz: "současný", nl: "huidig"},
    { cz: "dřívější", nl: "voormalig"},
    { cz: "samozřejmě (jinak)", nl: "uiteraard"},
    { cz: "plakát", nl: "de affiche"},
    { cz: "nelegální skládka", nl: "het sluikstort"},
    { cz: "konzultace", nl: "het overleg"},
    { cz: "atrakce", nl: "de trekpleister"},
    { cz: "památka", nl: "de bezienswaardigheid"},
    { cz: "cesta kolem více míst", nl: "de tocht"},
    { cz: "odpočinout si", nl: "uitrusten"},
    { cz: "utkvět v paměti", nl: "zich bijblijven"},
    { cz: "sebrat", nl: "oprapen"},
    { cz: "impozantní", nl: "indrukwekkend"},
    { cz: "pozlacený", nl: "verguld"},
    { cz: "doporučit", nl: "aanprijzen"},
    { cz: "schovat, ukrýt", nl: "verbergen"},
    { cz: "poskytnout", nl: "toedienen"},
    { cz: "odhadnout", nl: "inschatten"},
    { cz: "přesvědčit", nl: "overtuigen"},
    { cz: "destinace", nl: "de bestemming"},
    { cz: "odkázat (na něco)", nl: "doorverwijzen"},
    { cz: "pořadí", nl: "de volgorde"},
    { cz: "seriózní, vážný", nl: "ernstig"},
    { cz: "naléhavý, akutní", nl: "dringend"},
    { cz: "nadbytečný", nl: "overbodig"},
    { cz: "jednoduchý", nl: "eenvoudig"},
    { cz: "nicméně", nl: "nochtans"}
]


/* Zamíchání pole */
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

/* Vybere N náhodných slov z celého seznamu */
const pickRandomWords = (allWords, count) => {
    return shuffleArray([...allWords]).slice(0, count);
};

export const TranslationMainTest = ({ setWordsLength }) => {
    const [shuffledWords, setShuffledWords] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [questionCount, setQuestionCount] = useState(100);

    const inputRef = useRef(null);

    /* Celkový počet slov */
    useEffect(() => {
        setWordsLength(words.length);
    }, [setWordsLength]);

    /* Vylosuj nová slova při změně počtu */
    useEffect(() => {
        setShuffledWords(pickRandomWords(words, questionCount));
        setAnswers({});
        setResults({});
        setCurrentIndex(0);
        setFinished(false);
    }, [questionCount]);

    /* Autofocus */
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [currentIndex]);

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

    const restartTest = () => {
        setShuffledWords(pickRandomWords(words, questionCount));
        setAnswers({});
        setResults({});
        setCurrentIndex(0);
        setFinished(false);
    };

    const increaseCount = () => {
        if (questionCount < words.length) {
            setQuestionCount((c) => c + 1);
        }
    };

    const decreaseCount = () => {
        if (questionCount > 1) {
            setQuestionCount((c) => c - 1);
        }
    };

    const isButtonDisabled = (word) =>
        (answers[word.cz] || "").trim() === "";

    const runConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };

    return (
        <div className="flex flex-col items-center p-4 bg-yellow-50">
            <h2 className="text-lg text-center">
                Vertaal {questionCount} woorden van het Tsjechisch naar het
                Nederlands. Vergeet niet de artikels en <i>zich</i>.
                Stel het aantal woorden in met <b>+</b> en <b>-</b>.
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

            <div className="w-full max-w-md bg-green-50 shadow-lg rounded-lg p-5">
                {shuffledWords
                    .slice(0, currentIndex + 1)
                    .map((word, index) => (
                        <div
                            key={word.cz}
                            className="mb-4 flex flex-col sm:flex-row items-center sm:justify-between"
                        >
                            <span className="text-lg font-semibold w-1/3 text-center sm:text-left">
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

                        <p className="text-green-600 font-semibold">
                            Juist:{" "}
                            {Object.values(results).filter(Boolean).length}
                        </p>
                        <p className="text-red-600 font-semibold">
                            Fout:{" "}
                            {
                                Object.values(results).filter((r) => !r)
                                    .length
                            }
                        </p>

                        {Object.values(results).every(Boolean) && (
                            <>
                                <h1 className="font-bold text-3xl">
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
                            Test herhalen
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TranslationMainTest;
