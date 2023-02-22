import React from "react";

function NavBar(props) {
    return (
        <nav className="uk-navbar-container" uk-navbar="true">
            <div className="uk-navbar-left uk-margin-medium-left">
                { props.left }
            </div>
            <div className="uk-navbar-center">
                { props.center }
            </div>
            <div className="uk-navbar-right uk-margin-medium-right">
                { props.right }
            </div>
        </nav>
    );
}

export default NavBar