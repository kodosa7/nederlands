import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import winnerAnim from "../assets/winner1.gif";

const words = [
    { cz: "dům", nl: "huis" },
    { cz: "kočka", nl: "kat" },
    { cz: "pes", nl: "hond" },
    { cz: "auto", nl: "auto" },
    { cz: "jablko", nl: "appel" },
    { cz: "voda", nl: "water" },
    { cz: "mléko", nl: "melk" },
    { cz: "chléb", nl: "brood" },
    { cz: "člověk", nl: "mens" },
    { cz: "židle", nl: "stoel" },
    { cz: "stůl", nl: "tafel" },
    { cz: "město", nl: "stad" },
    { cz: "škola", nl: "school" },
    { cz: "slunce", nl: "zon" },
    { cz: "den", nl: "dag" },
    { cz: "noc", nl: "nacht" },
    { cz: "okno", nl: "raam" }
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
    const [questionCount, setQuestionCount] = useState(10);
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
                Vertaal {questionCount} woorden van het Tsjechisch naar het Nederlands. Verget niet de artikels (b.v. <b><u>het</u> huis</b>)!
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
