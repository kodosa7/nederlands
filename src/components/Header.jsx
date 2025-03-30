const Header = ( {wordsLength} ) => {
    return (
        <header className="container mb-4 position-relative">
            <div className="row pt-4">
                    <a href="#">
                        <h1 className="text-4xl font-bold text-center">PERFECTUM</h1>
                    </a>
                    <h2 className="text-lg text-center">Er staan {wordsLength} speciale woorden in het test.</h2>
                    <h2 className="text-lg text-center">Vul de juiste vorm van het perfectum in.</h2>
            </div>
        </header>
    )
}

export default Header;