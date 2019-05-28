import React from 'react';
import './Header.css';
import logo from '../../images/sk-logo.png';

//käytetään importilla tuotua logo-kuvaa
function Header() {
    return (
      <div className="header">
        <img src={logo} alt="logo" />
      </div>
    );
}

export default Header;