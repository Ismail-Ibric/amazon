import React, { useState } from "react";
import "./Header.css";
import HeaderNav from "./HeaderNav";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


function Header() {
  const history = useHistory();
  const [input, setInput] = useState("");
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value

      let sURL = "/search?"
      sURL += input ? `product=${escape(query)}` : ''
      
      //const sURL = `/search?product=${escape(query)}`;
      //window.location.href = sURL;
      history.push( sURL );
      //window.refreshTopMostParent();
    }
  }

  const searchProducts = (event) => {
    let sURL = "/search?"
    
    sURL += input ? `product=${escape(input)}` : ''
    //window.location.href = sURL;
    history.push( sURL );
    //window.refreshTopMostParent();
  }

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src="/amazon_logo.png" alt="Amazon Home" />
      </Link>
      <div className="header__search">
        <input
          id="input_search"
          className="header__searchInput"
          type="text"
          value={input}
          placeholder="Search here"
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
        />
        <div id="button_search" onClick={searchProducts} tabIndex="0" >
          <SearchIcon className="header__searchIcon" />
        </div>
      </div>

      <HeaderNav />
    </div>
  );
}

export default Header;
