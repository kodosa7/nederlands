const Header = ( {wordsLength} ) => {
    return (
        <header className="container mb-4 position-relative">
            <div className="row pt-4">
                    <a href="#">
                        <h1 className="text-4xl font-bold text-center">IRREGULIERE VERBA: PERFECTUM & IMPERFECTUM</h1>
                    </a>
                    <h2 className="text-lg text-center">Er staan {wordsLength} speciale woorden in deze test.</h2>
                    <h2 className="text-lg text-center">In deze test, vul de juiste vorm van <b>het perfectum</b> of <b>het imperfectum</b> in. Klik vervolgens op OK of druk op Enter.</h2>
                    <h2 className="text-center">(De woordjes staan in de leerboeken <i>Zo gezegd 2.1 schriftelijk persoonlijk</i> op pagina 147 en <i>publiek</i> op pagina 170)</h2>
            </div>
        </header>
    )
}

export default Header;