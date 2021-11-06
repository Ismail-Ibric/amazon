import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { auth } from "../util/firebaseAuth";
// eslint-disable-next-line
import { LeakRemoveTwoTone } from "@material-ui/icons";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // eslint-disable-next-line
  const [refresh, setRefresh] = useState(false);

  const createAcc = (e) => {
    // e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((auth) => {
      if( auth ) {
        auth.user.updateProfile({
          displayName: username
        })
        
        setRefresh(true);
        
        // cannot use history.push("/"),  setRefresh() fails to re-render
        history.replace("/");
        window.location.assign("/");
      }
    })
    .catch(error => alert(error.message))
  };

  return (
    <div className="register">
      <Link to="/">
        <img className="register__logo" src="amazon256.webp" alt="" />
      </Link>
      <div className="register__container">
        <h1>Sign Up</h1>
        <div className="register__form">
          <h5>E-Mail</h5>
          <input
            type="text"
            placeholder="demo@amazon.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="demo"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <h5>Userame</h5>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button
            className="register__createAccButton"
            type="submit"
            onClick={createAcc}
          >
            Create Account
          </button>
          <p>
            By registering, you agree to the Amazon Clone's Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice, and our
            Interest-Based Ads Notice.
          </p>
          <span className="register__orLogin">Or...</span>
          <Link to="/login" className="register__loginLink">
            <button className="register__loginButton">
              Log into you Amazon Clone Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
