import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import winnerAnim from "../assets/winner1.gif";

const words = [
    { cz: "seznámit se (1. moment)", nl: "kennismaken" },
    { cz: "seznámit se (proces)", nl: "leren kennen" },
    { cz: "během (nějaké doby)", nl: "binnen" },
    { cz: "dnes ráno", nl: "venmorgen" },
    { cz: "dnes přes den", nl: "vanmiddag" },
    { cz: "dnes večer", nl: "vanavond" },
    { cz: "horší než se čekalo", nl: "tegenvallen" },
    { cz: "lepší než se čekalo", nl: "meevallen" },
    { cz: "zůčastnit se", nl: "deelnemen" },
    { cz: "polekat", nl: "schrikken" },
    { cz: "kopat", nl: "schoppen" },
    { cz: "bojovat", nl: "vechten" },
    { cz: "nabírat (např. lopatou)", nl: "scheppen" },
    { cz: "zasáhnout (cíl)", nl: "raken" },
    { cz: "podnik", nl: "het bedrijf" },
    { cz: "hromada", nl: "de stapel" },
    { cz: "najednou", nl: "plots" },
    { cz: "vedlejší cesta", nl: "de zijweg" },
    { cz: "skvělý", nl: "geweldig" },
    { cz: "zatknout", nl: "arresteren" },
    { cz: "chytit, zadržet", nl: "vatten" },
    { cz: "zatknout, uvěznit", nl: "vangen" },
    { cz: "protestovat", nl: "betogen" },
    { cz: "nesouhlasit", nl: "niet eens zijn" },
    { cz: "ukázat", nl: "tonen" },
    { cz: "vyhrožovat", nl: "bedreigen" },
    { cz: "postřelit", nl: "neerschieten" },
    { cz: "utéct", nl: "vluchten" },
    { cz: "rozdat", nl: "vrijgeven" },
    { cz: "zločinec", nl: "de dader" },
    { cz: "trest vězení", nl: "de gevangenisstraf" },
    { cz: "krádež", nl: "de diefstal" },
    { cz: "identikit", nl: "de robotfoto" },
    { cz: "podezřelý", nl: "de verdachte" },
    { cz: "svědek", nl: "de getuige" },
    { cz: "přepadení", nl: "de overval" },
    { cz: "uprchlík", nl: "de vluchteling" },
    { cz: "kumpán", nl: "de kompaan" },
    { cz: "zbraň", nl: "het wapen" },
    { cz: "armáda", nl: "het leger" },
    { cz: "oběť", nl: "het slachtoffer" },
    { cz: "státní zastupitelství", nl: "het Parket" },
    { cz: "pryč", nl: "ervandoor" },
    { cz: "bílý (rasa)", nl: "blank" },
    { cz: "učitelka na ZŠ", nl: "de juf" },
    { cz: "učitel na ZŠ", nl: "de meester" },
    { cz: "narazit na někoho (potkat)", nl: "tegenkomen" },
    { cz: "zápas (sportovní)", nl: "de wedstrijd" },
    { cz: "zřídka", nl: "zelden" },
    { cz: "pozor", nl: "aandacht" },
    { cz: "rozšířit", nl: "verspreiden" },
    { cz: "identifikovat", nl: "identificeren" },
    { cz: "fakt", nl: "het feit" },
    { cz: "vést", nl: "leiden" },
    { cz: "přibližně", nl: "ongeveer" },
    { cz: "holit se", nl: "scheren" },
    { cz: "rámeček (brýlí)", nl: "de montuur" },
    { cz: "svědectví", nl: "de getuigenis" },
    { cz: "informace", nl: "de inlichting" },
    { cz: "o, okolo, kolem, týkající se", nl: "omtrent" },
    { cz: "strašně", nl: "ontzettend" },
    { cz: "usadit se", nl: "zich vestigen" },
    { cz: "přesvědčit", nl: "overtuigen" },
    { cz: "samozřejmě", nl: "uiteraard" },
    { cz: "skleník", nl: "de serre" },
    { cz: "bankrot", nl: "het failliet" },
    { cz: "veselý", nl: "monter" },
    { cz: "prospěšný", nl: "duurzaam" },
    { cz: "takzvaný", nl: "zogenomd" },
    { cz: "slíbit komu", nl: "beloven van"},
    { cz: "věřit", nl: "geloven"},
    { cz: "důvěřovat komu", nl: "vertrouwen"},
    { cz: "vysvětlit", nl: "uitleggen"},
    { cz: "poskytnout informaci", nl: "aangeven"},
    { cz: "stoupat", nl: "stijgen"},
    { cz: "klesat", nl: "dalen"},
    { cz: "vypadat jako", nl: "lijken op"},
    { cz: "nejbližší", nl: "dichtsbijzijnde"},
    { cz: "výrazný", nl: "opvallend"},
    { cz: "ten samý (de)", nl: "dezelfde"},
    { cz: "to samé (het)", nl: "hetzelfde"},
    { cz: "stejně", nl: "even"},
    { cz: "oba dva", nl: "allebei"},
    { cz: "všichni tři", nl: "alle drie"},
    { cz: "všichni (úplně)", nl: "allemaal"},
    { cz: "oba", nl: "beide"},
    { cz: "nikdo z nich", nl: "geen van beide"},
    { cz: "smysl", nl: "de betekenis"},

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
