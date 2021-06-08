import React from "react";
import { ReactComponent as LogoutIcon } from './../../icons/logout.svg';

export default function Navbar() {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">
            <NavItem icon={<LogoutIcon/>} />
        </ul>
      </nav>
    );
}

function NavItem(props) {
      
    return (
      <li className="nav-item">
        <a href="#" className="icon-button">
          {props.icon}
        </a>
      </li>
    );
}