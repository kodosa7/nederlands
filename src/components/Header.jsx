import woordenLijstFile from "../assets/onregelmatige_verba.pdf"

const Header = ( {wordsLength} ) => {
    return (
        <header className="container mb-4 position-relative">
            <div className="row pt-4">
                    <a href="#">
                        <h1 className="text-4xl font-bold text-center">IRREGULIERE VERBA: PERFECTUM & IMPERFECTUM</h1>
                    </a>
                    <h2 className="text-center">
                        (De woordjes staan b.v. <a href={ woordenLijstFile }>hier</a> (PDF) en in de leerboeken <i>Zo gezegd 2.3 mondeling persoonlijk</i> op pagina's 234–236 en <i>publiek</i> op pagina's 266–268)
                    </h2>
            </div>
        </header>
    )
}

export default Header;