import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "../util/StateProvider";
import CheckoutProduct from "./comp/CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../util/reducer";
import axios from "../util/Axios";
import { db } from "../util/firebaseAuth";

function Payment() {
  const history = useHistory();
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  
  const handleCardPayment = async (e) => {
    e.preventDefault();
    setProcessing( true );

    // eslint-disable-next-line
    const payload = await stripe.confirmCardPayment( clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then( ({paymentIntent}) => {

      console.log( "basket", basket );

      db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: "EMPTY_BASKET"
      });

      //window.location.assign("/orders");
      history.replace("/orders");
    })

  };

  const handleCardChanged = (e) => {
    setDisabled( e.empty );
    setError( e.error ? e.error.message : "" );
  };

  useEffect(() => {
    
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      }).catch( () => { console.log("Error calling Axios"); return; })
  
      if( response )
      {
        //console.log("response.data: ", response.data);
        setClientSecret(response.data.clientSecret);
        console.log("The Secret is: ", response.data.clientSecret);
      }
    };

    getClientSecret();

    // return () => {      
    // }
  }, [basket]);

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Section: Delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <div className="payment__addressContainer">
              <p>{user?.email}</p>
              <p>9877 Saram0n Path</p>
              <p>Los Altos, CA</p>
            </div>
          </div>
        </div>

        {/* Section: Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items</h3>
            {/* and delivery */}
          </div>
          <div className="payment__items">
            <div className="payment__itemsContainer">
              { getBasketTotal(basket) === 0 ?
                <span>No Items in Basket</span>
                : basket.map((item, index) => (
                  <CheckoutProduct key={index} {...item} index={index} />
              )) }
            </div>
          </div>
        </div>

        {/* Section: Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <div className="payment__detailsContainer">
              {/* Stripe code will go here */}
              <form onSubmit={handleCardPayment}>
                <CardElement onChange={handleCardChanged} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={","}
                    prefix={"$"}
                    renderText={ (value) => (
                      <h3>Order Total: {value}</h3>
                    )}
                  />
                  { (processing || disabled || succeeded || getBasketTotal(basket) === 0) ?
                    <button disabled className="payment__buyNow">
                      <span>Buy Now</span>
                    </button>
                    : 
                    <button className="payment__buyNow">
                      <span>Buy Now</span>
                    </button>
                  }
                </div>
                { error && <div>{error}</div> }
              </form>
            </div>
          </div>
          <div>
            <p>for testing please use:</p>
            <p>card: <b>4242 4242 4242 4242</b></p>
            <p>MM/YY: <b>04 / 24</b></p>
            <p>CVC: <b>242</b></p>
            <p>ZIP: <b>42424</b></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Payment;
