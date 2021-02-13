import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

// images
import logoWhite from "@Images/logoWhite.svg";
import logoBlack from "@Images/logoBlack.svg";

// Components
import Menu from "../molecules/Menu";

const Header = ({ dark }) => {
  const headerClass = classNames({
    header: true,
    "header-dark": dark,
  });
  return (
    <header className={headerClass}>
      <Link to="/">
        <img src={(dark && logoWhite) || logoBlack} alt="Neobit logo" />
      </Link>
      <Menu dark={dark} />
    </header>
  );
};

export default Header;
