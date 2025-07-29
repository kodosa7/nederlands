import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import winnerAnim from "../assets/winner1.gif";

const words = [
    { present: "aandoen", perfectum: "aangedaan" },
    { present: "aankomen (zijn)", perfectum: "aangekomen" },
    { present: "aflopen (zijn)", perfectum: "afgelopen" },
    { present: "aanvragen", perfectum: "aangevraagd" },
    { present: "afwassen", perfectum: "afgewassen" },
    { present: "bakken", perfectum: "gebakken" },
    { present: "beginnen (zijn)", perfectum: "begonnen" },
    { present: "begrijpen", perfectum: "begrepen" },
    { present: "behangen", perfectum: "behangen" },
    { present: "bewegen", perfectum: "bewogen" },
    { present: "bezoeken", perfectum: "bezocht" },
    { present: "bijten", perfectum: "gebeten" },
    { present: "blazen", perfectum: "geblazen" },
    { present: "blijven (zijn)", perfectum: "gebleven" },
    { present: "breken", perfectum: "gebroken" },
    { present: "brengen", perfectum: "gebracht" },
    { present: "denken", perfectum: "gedacht" },
    { present: "doen", perfectum: "gedaan" },
    { present: "dragen", perfectum: "gedragen" },
    { present: "drinken", perfectum: "gedronken" },
    { present: "eten", perfectum: "gegeten" },
    { present: "gaan (zijn)", perfectum: "gegaan" },
    { present: "genezen", perfectum: "genezen" },
    { present: "geven", perfectum: "gegeven" },
    { present: "gieten", perfectum: "gegoten" },
    { present: "hangen", perfectum: "gehangen" },
    { present: "hebben", perfectum: "gehad" },
    { present: "helpen", perfectum: "geholpen" },
    { present: "houden", perfectum: "gehouden" },
    { present: "innemen", perfectum: "ingenomen" },
    { present: "kiezen", perfectum: "gekozen" },
    { present: "kijken", perfectum: "gekeken" },
    { present: "komen (zijn)", perfectum: "gekomen" },
    { present: "kopen", perfectum: "gekocht" },
    { present: "krijgen", perfectum: "gekregen" },
    { present: "kunnen", perfectum: "gekund" },
    { present: "laten", perfectum: "gelaten" },
    { present: "lezen", perfectum: "gelezen" },
    { present: "liggen", perfectum: "gelegen" },
    { present: "lopen (h/z)", perfectum: "gelopen" },
    { present: "meenemen", perfectum: "meegenomen" },
    { present: "meerijden (h/z)", perfectum: "meegereden" },
    { present: "moeten", perfectum: "gemoeten" },
    { present: "mogen", perfectum: "gemogen" },
    { present: "nakijken", perfectum: "nagekeken" },
    { present: "nemen", perfectum: "genomen" },
    { present: "onderzoeken", perfectum: "onderzocht" },
    { present: "ontbijten", perfectum: "ontbeten" },
    { present: "opkomen (zijn)", perfectum: "opgekomen" },
    { present: "opnemen", perfectum: "opgenomen" },
    { present: "opstaan (zijn)", perfectum: "opgestaan" },
    { present: "opzoeken", perfectum: "opgezocht" },
    { present: "oversteken (zijn)", perfectum: "overgestoken" },
    { present: "rijden (h/z)", perfectum: "gereden" },
    { present: "roepen", perfectum: "geroepen" },
    { present: "scheiden (zijn)", perfectum: "gescheiden" },
    { present: "schijnen", perfectum: "geschenen" },
    { present: "schrijven", perfectum: "geschreven" },
    { present: "slapen", perfectum: "geslapen" },
    { present: "sluiten", perfectum: "gesloten" },
    { present: "snijden", perfectum: "gesneden" },
    { present: "spreken", perfectum: "gesproken" },
    { present: "springen", perfectum: "gesprongen" },
    { present: "staan", perfectum: "gestaan" },
    { present: "steken", perfectum: "gestoken" },
    { present: "sterven (zijn)", perfectum: "gestorven" },
    { present: "strijken", perfectum: "gestreken" },
    { present: "treffen", perfectum: "getroffen" },
    { present: "trekken", perfectum: "getrokken" },
    { present: "uitdoen", perfectum: "uitgedaan" },
    { present: "uitgaan (zijn)", perfectum: "uitgegaan" },
    { present: "uittrekken", perfectum: "uitgetrokken" },
    { present: "vallen (zijn)", perfectum: "gevallen" },
    { present: "varen (h/z)", perfectum: "gevaren" },
    { present: "verbieden", perfectum: "verboden" },
    { present: "vergeten (h/z)", perfectum: "vergeten" },
    { present: "verkopen", perfectum: "verkocht" },
    { present: "verliezen", perfectum: "verloren" },
    { present: "vermijden", perfectum: "vermeden" },
    { present: "verstaan", perfectum: "verstaan" },
    { present: "vertrekken (zijn)", perfectum: "vertrokken" },
    { present: "vervangen", perfectum: "vervangen" },
    { present: "vinden", perfectum: "gevonden" },
    { present: "vliegen (h/z)", perfectum: "gevlogen" },
    { present: "vragen", perfectum: "gevraagd" },
    { present: "vriezen", perfectum: "gevroren" },
    { present: "wassen", perfectum: "gewassen" },
    { present: "wegen", perfectum: "gewogen" },
    { present: "weten", perfectum: "geweten" },
    { present: "wijzen", perfectum: "gewezen" },
    { present: "willen", perfectum: "gewild" },
    { present: "winnen", perfectum: "gewonnen" },
    { present: "worden (zijn)", perfectum: "geworden" },
    { present: "zeggen", perfectum: "gezegd" },
    { present: "zien", perfectum: "gezien" },
    { present: "zijn (zijn)", perfectum: "geweest" },
    { present: "zingen", perfectum: "gezongen" },
    { present: "zitten", perfectum: "gezeten" },
    { present: "zoeken", perfectum: "gezocht" },
    { present: "zwemmen (h/z)", perfectum: "gezwommen" }
];

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};


export const PerfectumMainTest = ({ wordsLength, setWordsLength }) => {
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
        const isCorrect = (answers[word.present] || "").trim().toLowerCase() === word.perfectum;
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
                                        {word.present} - Juiste antwoord: <b>{word.perfectum}</b>
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

export default PerfectumMainTest;
