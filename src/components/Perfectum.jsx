import Header from "./Header";
import Footer from "./Footer";
import PerfectumMainTest from "./PerfectumMainTest";

export const Perfectum = () => {
    return (
        <>
            <Header wordsLength={wordsLength} />
            <PerfectumMainTest />
            <Footer />
        </>
    );
};

export default Perfectum;
