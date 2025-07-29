import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import winnerAnim from "../assets/winner1.gif";

const words = [
    { present: "aandoen", imperfectum: "deed aan" },
    { present: "aankomen", imperfectum: "kwam aan" },
    { present: "aflopen", imperfectum: "liep af" },
    { present: "aanvragen", imperfectum: "vroeg aan" },
    { present: "afwassen", imperfectum: "waste af" },
    { present: "bakken", imperfectum: "bakte" },
    { present: "beginnen", imperfectum: "begon" },
    { present: "begrijpen", imperfectum: "begreep" },
    { present: "behangen", imperfectum: "behing" },
    { present: "bewegen", imperfectum: "bewoog" },
    { present: "bezoeken", imperfectum: "bezocht" },
    { present: "bijten", imperfectum: "beet" },
    { present: "blazen", imperfectum: "blies" },
    { present: "blijven", imperfectum: "bleef" },
    { present: "breken", imperfectum: "brak" },
    { present: "brengen", imperfectum: "bracht" },
    { present: "denken", imperfectum: "dacht" },
    { present: "doen", imperfectum: "deed" },
    { present: "dragen", imperfectum: "droeg" },
    { present: "drinken", imperfectum: "dronk" },
    { present: "eten", imperfectum: "at" },
    { present: "gaan", imperfectum: "ging" },
    { present: "genezen", imperfectum: "genas" },
    { present: "geven", imperfectum: "gaf" },
    { present: "gieten", imperfectum: "goot" },
    { present: "hangen", imperfectum: "hing" },
    { present: "hebben", imperfectum: "had" },
    { present: "helpen", imperfectum: "hielp" },
    { present: "houden (van)", imperfectum: "hield" },
    { present: "innemen", imperfectum: "nam in" },
    { present: "kiezen", imperfectum: "koos" },
    { present: "kijken", imperfectum: "keek" },
    { present: "komen", imperfectum: "kwam" },
    { present: "kopen", imperfectum: "kocht" },
    { present: "krijgen", imperfectum: "kreeg" },
    { present: "kunnen", imperfectum: "kon" },
    { present: "laten", imperfectum: "liet" },
    { present: "lezen", imperfectum: "las" },
    { present: "liggen", imperfectum: "lag" },
    { present: "lopen", imperfectum: "liep" },
    { present: "meenemen", imperfectum: "nam mee" },
    { present: "meerijden", imperfectum: "reed mee" },
    { present: "moeten", imperfectum: "moest" },
    { present: "mogen", imperfectum: "mocht" },
    { present: "nakijken", imperfectum: "keek na" },
    { present: "nemen", imperfectum: "nam" },
    { present: "onderzoeken", imperfectum: "onderzocht" },
    { present: "ontbijten", imperfectum: "ontbeet" },
    { present: "opkomen", imperfectum: "kwam op" },
    { present: "opnemen", imperfectum: "nam op" },
    { present: "opstaan", imperfectum: "stond op" },
    { present: "opzoeken", imperfectum: "opzocht" },
    { present: "oversteken (zijn)", imperfectum: "stak over" },
    { present: "rijden", imperfectum: "reed" },
    { present: "roepen", imperfectum: "riep" },
    { present: "scheiden (zijn)", imperfectum: "scheidde" },
    { present: "schijnen", imperfectum: "scheen" },
    { present: "schrijven", imperfectum: "schreef" },
    { present: "slapen", imperfectum: "sliep" },
    { present: "sluiten", imperfectum: "sloot" },
    { present: "snijden", imperfectum: "sneed" },
    { present: "spreken", imperfectum: "sprak" },
    { present: "springen", imperfectum: "sprong" },
    { present: "staan", imperfectum: "stond" },
    { present: "steken", imperfectum: "stak" },
    { present: "sterven", imperfectum: "stierf" },
    { present: "strijken", imperfectum: "streek" },
    { present: "treffen", imperfectum: "trof" },
    { present: "trekken", imperfectum: "trok" },
    { present: "uitdoen", imperfectum: "deed uit" },
    { present: "uitgaan", imperfectum: "ging uit" },
    { present: "uittrekken", imperfectum: "trok uit" },
    { present: "vallen", imperfectum: "viel" },
    { present: "varen", imperfectum: "voer" },
    { present: "verbieden", imperfectum: "verbood" },
    { present: "vergeten", imperfectum: "vergat" },
    { present: "verkopen", imperfectum: "verkocht" },
    { present: "verliezen", imperfectum: "verloor" },
    { present: "vermijden", imperfectum: "vermeed" },
    { present: "verstaan", imperfectum: "verstond" },
    { present: "vertrekken", imperfectum: "vertrok" },
    { present: "vervangen", imperfectum: "verving" },
    { present: "vinden", imperfectum: "vond" },
    { present: "vliegen", imperfectum: "vloog" },
    { present: "vragen", imperfectum: "vroeg" },
    { present: "vriezen", imperfectum: "vroor" },
    { present: "wassen", imperfectum: "waste" },
    { present: "wegen", imperfectum: "woog" },
    { present: "weten", imperfectum: "wist" },
    { present: "wijzen", imperfectum: "wees" },
    { present: "willen", imperfectum: "wou/wilde" },
    { present: "winnen", imperfectum: "won" },
    { present: "worden", imperfectum: "werd" },
    { present: "zeggen", imperfectum: "zei" },
    { present: "zien", imperfectum: "zag" },
    { present: "zijn", imperfectum: "was" },
    { present: "zingen", imperfectum: "zong" },
    { present: "zitten", imperfectum: "zat" },
    { present: "zoeken", imperfectum: "zocht" },
    { present: "zullen", imperfectum: "zou" },
    { present: "zwemmen", imperfectum: "zwom" }
];

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};


export const ImperfectumMainTest = ({ wordsLength, setWordsLength }) => {
    const [shuffledWords, setShuffledWords] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setWordsLength(words.length);
    }, [words.length, setWordsLength]);

    useEffect(() => {
        setShuffledWords(shuffleArray([...words]));
    }, []);

    // new
    useEffect(() => {
    if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentIndex]);


    const checkAnswer = () => {
        const word = shuffledWords[currentIndex];
        const isCorrect = (answers[word.present] || "").trim().toLowerCase() === word.imperfectum;
        setResults({ ...results, [word.present]: isCorrect });
        setCurrentIndex((prev) => (prev + 1 < shuffledWords.length ? prev + 1 : prev));
    };

    const handleChange = (value) => {
        setAnswers({ ...answers, [shuffledWords[currentIndex].present]: value });
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && (answers[shuffledWords[currentIndex].present] || "").trim() === "") {
            event.preventDefault();
            return;
        }
        if (event.key === "Enter") checkAnswer();
    };

    const handleFinish = () => {
        setFinished(true);
    };

    const restartTest = () => {
        setShuffledWords(shuffleArray([...words]));
        setAnswers({});
        setResults({});
        setCurrentIndex(0);
        setFinished(false);
    };

    // Disable button if the input field is empty
    const isButtonDisabled = (word) => {
        return (answers[word.present] || "").trim() === "";
    };

    const runConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                y: 0.6
            }
        });
    };

    return (
        <div className="flex flex-col items-center p-4 bg-yellow-50">
            <div className="w-full max-w-md bg-green-50 shadow-lg rounded-lg pt-5 pl-5 pr-5 pb-2">
                {shuffledWords.slice(0, currentIndex + 1).map((word, index) => (
                    <div key={word.present} className="mb-4 flex flex-col sm:flex-row items-center sm:justify-between">
                        <span className="text-lg font-semibold w-1/3 text-center sm:text-left">{word.present}</span>
                        <input
                            ref={index === currentIndex ? inputRef : null}
                            type="text"
                            className="border p-2 rounded-md w-full sm:w-1/3 text-center bg-white"
                            value={answers[word.present] || ""}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={results[word.present] !== undefined}
                        />

                        {results[word.present] === undefined ? (
                            index === currentIndex && (
                                <button
                                    className="ml-0 sm:ml-1 mt-2 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    onClick={checkAnswer}
                                    disabled={isButtonDisabled(word)} // Disable button if input is empty
                                >
                                    OK
                                </button>
                            )
                        ) : (
                            <span className={`ml-4 mr-4 text-lg font-semibold ${results[word.present] ? "text-green-500" : "text-red-500"}`}>
                                {results[word.present] ? "✅" : "❌"}
                            </span>
                        )}
                    </div>
                ))}
                {Object.keys(results).length === shuffledWords.length && !finished && (
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
                        <p className="text-green-600 font-semibold">Juist: {Object.values(results).filter(Boolean).length}</p>
                        <p className="text-red-600 font-semibold">Fout: {Object.values(results).filter((res) => !res).length}</p>
                        {Object.values(results).filter((res) => !res).length === 0 ? (
                            <>
                                <h1 className="font-bold text-3xl">Goed zo!</h1>
                                <img src={winnerAnim} width="77%"></img>
                                {runConfetti()}
                            </>
                        ) : ""}

                        <ul className="mt-2 text-left">
                            {shuffledWords.map((word) =>
                                results[word.present] === false ? (
                                    <li key={word.present} className="text-red-600">
                                        {word.present} - Juiste antwoord: <b>{word.imperfectum}</b>
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

export default ImperfectumMainTest;
