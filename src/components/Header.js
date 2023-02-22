import React from "react";
import NavBar from "./NavBar";

function Header(props) {
    return (
        <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navnbar-sticky">
            <NavBar left={props.left} center={props.center} right={props.right} />
        </div>
    );
}

export default Header;