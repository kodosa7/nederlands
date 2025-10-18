import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PerfectumMainTest from "./PerfectumMainTest";
import ImperfectumMainTest from "./ImperfectumMainTest";
import TranslationMainTest from "./TranslationMainTest"; // ← nový import

export const Main = () => {
    const [wordsLength, setWordsLength] = useState(0);
    const [mode, setMode] = useState(null); // 'perfectum', 'imperfectum', 'translation'

    return (
        <div className="bg-yellow-50 min-h-screen">
            <Header wordsLength={wordsLength} />

            {mode === null && (
                <div className="flex flex-col items-center mt-8 space-y-4">
                    <p className="text-xl font-semibold">Kies een test</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-40"
                            onClick={() => setMode("perfectum")}
                        >
                            Perfectum
                        </button>
                        <button
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 w-40"
                            onClick={() => setMode("imperfectum")}
                        >
                            Imperfectum
                        </button>
                        <button
                            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 w-40"
                            onClick={() => setMode("translation")}
                        >
                            Vertaling CZ→NL
                        </button>
                    </div>
                </div>
            )}


            {mode === "perfectum" && <PerfectumMainTest setWordsLength={setWordsLength} />}
            {mode === "imperfectum" && <ImperfectumMainTest setWordsLength={setWordsLength} />}
            {mode === "translation" && <TranslationMainTest setWordsLength={setWordsLength} />}

            <Footer />
        </div>
    );
};

export default Main;
