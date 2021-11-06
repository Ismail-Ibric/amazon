import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "../util/firebaseAuth";
// eslint-disable-next-line
import { LeakRemoveTwoTone } from "@material-ui/icons";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .then((auth) => {
      if( auth ) {
        //console.log("login - auth: ", auth);
        history.push("/");
      }
    })
    .catch(error => alert(error.message))
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src="amazon256.webp" alt="" />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <div className="login__form">
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
          <button
            className="login__signinButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
          <p>
            By signing-in, you agree to the Amazon Clone's Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice, and our
            Interest-Based Ads Notice.
          </p>
          <span className="login__OrRegister">Or...</span>
          <Link to="/register" className="login__registerLink">
            <button className="login__registerButton">
              Create you Amazon Clone Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
