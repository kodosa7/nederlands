import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import winnerAnim from "../assets/winner1.gif";

const words = [
    { present: "aandoen", imperfectum: "aangedaan" },
    { present: "aankomen (zijn)", imperfectum: "aangekomen" },
    { present: "aflopen (zijn)", imperfectum: "afgelopen" },
    { present: "aanvragen", imperfectum: "aangevraagd" },
    { present: "afwassen", imperfectum: "afgewassen" },
    { present: "bakken", imperfectum: "gebakken" },
    { present: "beginnen (zijn)", imperfectum: "begonnen" },
    { present: "begrijpen", imperfectum: "begrepen" },
    { present: "behangen", imperfectum: "behangen" },
    { present: "bewegen", imperfectum: "bewogen" },
    { present: "bezoeken", imperfectum: "bezocht" },
    { present: "bijten", imperfectum: "gebeten" },
    { present: "blazen", imperfectum: "geblazen" },
    { present: "blijven (zijn)", imperfectum: "gebleven" },
    { present: "breken", imperfectum: "gebroken" },
    { present: "brengen", imperfectum: "gebracht" },
    { present: "denken", imperfectum: "gedacht" },
    { present: "doen", imperfectum: "gedaan" },
    { present: "dragen", imperfectum: "gedragen" },
    { present: "drinken", imperfectum: "gedronken" },
    { present: "eten", imperfectum: "gegeten" },
    { present: "gaan (zijn)", imperfectum: "gegaan" },
    { present: "genezen", imperfectum: "genezen" },
    { present: "geven", imperfectum: "gegeven" },
    { present: "gieten", imperfectum: "gegoten" },
    { present: "hangen", imperfectum: "gehangen" },
    { present: "hebben", imperfectum: "gehad" },
    { present: "helpen", imperfectum: "geholpen" },
    { present: "houden", imperfectum: "gehouden" },
    { present: "innemen", imperfectum: "ingenomen" },
    { present: "kiezen", imperfectum: "gekozen" },
    { present: "kijken", imperfectum: "gekeken" },
    { present: "komen (zijn)", imperfectum: "gekomen" },
    { present: "kopen", imperfectum: "gekocht" },
    { present: "krijgen", imperfectum: "gekregen" },
    { present: "kunnen", imperfectum: "gekund" },
    { present: "laten", imperfectum: "gelaten" },
    { present: "lezen", imperfectum: "gelezen" },
    { present: "liggen", imperfectum: "gelegen" },
    { present: "lopen (h/z)", imperfectum: "gelopen" },
    { present: "meenemen", imperfectum: "meegenomen" },
    { present: "meerijden (h/z)", imperfectum: "meegereden" },
    { present: "moeten", imperfectum: "gemoeten" },
    { present: "mogen", imperfectum: "gemogen" },
    { present: "nakijken", imperfectum: "nagekeken" },
    { present: "nemen", imperfectum: "genomen" },
    { present: "onderzoeken", imperfectum: "onderzocht" },
    { present: "ontbijten", imperfectum: "ontbeten" },
    { present: "opkomen (zijn)", imperfectum: "opgekomen" },
    { present: "opnemen", imperfectum: "opgenomen" },
    { present: "opstaan (zijn)", imperfectum: "opgestaan" },
    { present: "opzoeken", imperfectum: "opgezocht" },
    { present: "oversteken (zijn)", imperfectum: "overgestoken" },
    { present: "rijden (h/z)", imperfectum: "gereden" },
    { present: "roepen", imperfectum: "geroepen" },
    { present: "scheiden (zijn)", imperfectum: "gescheiden" },
    { present: "schijnen", imperfectum: "geschenen" },
    { present: "schrijven", imperfectum: "geschreven" },
    { present: "slapen", imperfectum: "geslapen" },
    { present: "sluiten", imperfectum: "gesloten" },
    { present: "snijden", imperfectum: "gesneden" },
    { present: "spreken", imperfectum: "gesproken" },
    { present: "springen", imperfectum: "gesprongen" },
    { present: "staan", imperfectum: "gestaan" },
    { present: "steken", imperfectum: "gestoken" },
    { present: "sterven (zijn)", imperfectum: "gestorven" },
    { present: "strijken", imperfectum: "gestreken" },
    { present: "treffen", imperfectum: "getroffen" },
    { present: "trekken", imperfectum: "getrokken" },
    { present: "uitdoen", imperfectum: "uitgedaan" },
    { present: "uitgaan (zijn)", imperfectum: "uitgegaan" },
    { present: "uittrekken", imperfectum: "uitgetrokken" },
    { present: "vallen (zijn)", imperfectum: "gevallen" },
    { present: "varen (h/z)", imperfectum: "gevaren" },
    { present: "verbieden", imperfectum: "verboden" },
    { present: "vergeten (h/z)", imperfectum: "vergeten" },
    { present: "verkopen", imperfectum: "verkocht" },
    { present: "verliezen", imperfectum: "verloren" },
    { present: "vermijden", imperfectum: "vermeden" },
    { present: "verstaan", imperfectum: "verstaan" },
    { present: "vertrekken (zijn)", imperfectum: "vertrokken" },
    { present: "vervangen", imperfectum: "vervangen" },
    { present: "vinden", imperfectum: "gevonden" },
    { present: "vliegen (h/z)", imperfectum: "gevlogen" },
    { present: "vragen", imperfectum: "gevraagd" },
    { present: "vriezen", imperfectum: "gevroren" },
    { present: "wassen", imperfectum: "gewassen" },
    { present: "wegen", imperfectum: "gewogen" },
    { present: "weten", imperfectum: "geweten" },
    { present: "wijzen", imperfectum: "gewezen" },
    { present: "willen", imperfectum: "gewild" },
    { present: "winnen", imperfectum: "gewonnen" },
    { present: "worden (zijn)", imperfectum: "geworden" },
    { present: "zeggen", imperfectum: "gezegd" },
    { present: "zien", imperfectum: "gezien" },
    { present: "zijn (zijn)", imperfectum: "geweest" },
    { present: "zingen", imperfectum: "gezongen" },
    { present: "zitten", imperfectum: "gezeten" },
    { present: "zoeken", imperfectum: "gezocht" },
    { present: "zwemmen (h/z)", imperfectum: "gezwommen" }
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
