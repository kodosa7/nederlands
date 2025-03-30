import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PerfectumMainTest from "./PerfectumMainTest";

export const Perfectum = () => {
    const [wordsLength, setWordsLength] = useState(0); // initial setup of this state must be here

    return (
        <>
            <div className="bg-yellow-50">
                <Header wordsLength={wordsLength} />
                <PerfectumMainTest
                    setWordsLength={setWordsLength}
                />
                <Footer />
            </div>
        </>
    );
};

export default Perfectum;
