import React from "react";
import NavBar from "./NavBar";
import "./Footer.css"

function Footer(props) {
    return (
        <div className="footer" uk-position-bottom="true">
            <NavBar left={props.left} center={props.center} right={props.right} />
        </div>
    );
}

export default Footer;