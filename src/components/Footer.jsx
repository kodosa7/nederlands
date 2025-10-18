import { useState } from "react";
import { getYear } from "../utils/utils.js";

const Footer = () => {
    const [currentYear, setCurrentDate] = useState(getYear());

    return (
        <footer className="footer-container mt-4 pb-5 position-relative row pt-2">
            <div className="perex row pt-4">
                <div className="d-flex justify-content-center">
                    <h2 className="text-center">© {currentYear} ELS Design | versie 250808</h2>
                </div>
            </div>
        </footer>
    )
}

export default Footer;