import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { useStateValue } from "../util/StateProvider";
import Header from "./comp/Header";
import Footer from "./comp/Footer";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Register from "./Register";
import Payment from "./Payment"
import Orders from "./Orders"
import Search from "./Search"
import RestoreProducts from "./admin/RestoreProducts"
import { auth } from "../util/firebaseAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import dotenv from "dotenv";
import ScrollToTop from "../util/ScrollToTop";

function App() {
  // eslint-disable-next-line
  const [ {}, dispatch] = useStateValue();

  // dotenv.config();
  // const pub_key = process.env.MY_PUB_KEY;
  const promise = loadStripe( "pk_test_Say4CRHEEmamSssiAXYbEA7P" );   

  useEffect(() => {
    
    auth.onAuthStateChanged((authUser) => {

      if (authUser) {
        console.log("USER LOOGED IN >> ", authUser);

        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
  
    });

    return () => {
      //cleanup
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (

    <Router>
      <ScrollToTop />
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer />
          </Route>
          <Route path="/search">
            <Header />
            <Search />
            <Footer />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/admin/restoreproducts">
            <Header />
            <RestoreProducts />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  
  );
}

export default App;
