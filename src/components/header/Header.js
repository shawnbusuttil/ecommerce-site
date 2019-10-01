import React from "react";

import "./Header.scss";

const Header = (props) => (
    <header>
        {props.logo ? <img src={props.logo} alt="logo" /> : null}
    </header>
);

export default Header;