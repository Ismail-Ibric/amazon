import React, { Fragment, useState, useRef, useEffect } from "react";
import "./HeaderNav.css";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import Menu from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../util/StateProvider";
import { auth } from "../../util/firebaseAuth"

function HeaderNav() {
  const history = useHistory();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                //console.log("You clicked outside of me!");
                setShowMenu(0);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }

  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue();
  const [showMenu, setShowMenu] = useState(0);

  const firebase_SignOut = () => {
    if( user ){
      auth.signOut();
      //window.location.href = "/";
      history.push("/");
    }
  }

  const toggleShowMenu = () => {
    setShowMenu( !showMenu );
  }

  let username = "";
  let usertitle = "";

  if( !user ) {
    username = "Guest";
    usertitle = "";
  } else if( user.displayName ) {
    username = user.displayName
    usertitle = user.email
  } else {
    const parts = user.email.split("@")
    username = parts[0]
    usertitle = user.email
  }

  const options = (
    
    <Fragment>
      <div className="header__option">
        <span className="header__optionLineOne">
          Hello <span className="header__optionUsername" title={usertitle}>{username}</span>
        </span>
        <span className="header__optionLineTwo">
          {user ? (
            <div className="header__optionLineTwo_Link"
              onClick={firebase_SignOut}>Log Out</div>
          ) : (
            <Link to="/login">
              Log In
            </Link>
          )}
        </span>
      </div>
      <div className='header__option'>
        <Link to="/orders">
          <span className="header__optionLineOne">Returns &</span>
        </Link>
        <Link to="/orders">
          <span className="header__optionLineTwo">Orders</span>
        </Link>
      </div>
      <div className='header__option'>
        <Link to="/prime">
          <span className="header__optionLineOne">Your</span>
        </Link>
        <Link to="/prime">
          <span className="header__optionLineTwo">Prime</span>
        </Link>
      </div>
    </Fragment>
  );

  
  return (
    <div className="header__nav">
      <div className="header__optionCont">
        { options }
      </div>
      <Link to="/checkout" className="header__optionBasketLink">
        <div className="header__optionBasket">
          <ShoppingBasket className="header__optionBasketIcon" />
          <span className="header__optionBasketCount header__optionLineTwo">
            {basket?.length}
          </span>
        </div>
      </Link>
      <div className="header__optionMenu">
        <Menu onClick={(e) => toggleShowMenu()} className="header__optionMenuIcon" />
        <div ref={wrapperRef} className={showMenu?"header__optionsMenuPopup header__optionsMenuPopupShow":"header__optionsMenuPopup"}>
          { showMenu > 0 && options}
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
