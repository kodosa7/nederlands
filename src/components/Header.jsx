const Header = ( {wordsLength} ) => {
    return (
        <header className="container mb-4 position-relative">
            <div className="row pt-4">
                    <a href="#">
                        <h1 className="text-4xl font-bold text-center">PERFECTUM</h1>
                    </a>
                    <h2 className="text-lg text-center">Er staan {wordsLength} speciale woorden in dit test.</h2>
                    <h2 className="text-lg text-center">Vul de juiste vorm van <b>het perfectum</b> in.</h2>
                    <h2 className="text-center">(De woordjes staan in het leerboek <i>Zo gezegd 1.2 mondeling</i> op pagina 165 en 166)</h2>
            </div>
        </header>
    )
}

export default Header;