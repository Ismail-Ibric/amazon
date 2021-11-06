import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./comp/CheckoutProduct";
import Subtotal from "./comp/Subtotal";
import { useStateValue } from "../util/StateProvider";

function Checkout() {
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkout animFadeIn">
      <div className="checkout__left">
        <img className="checkout__ad" src="amazon_card.png" alt="" />
      </div>
      <div className="checkout__right">
        <Subtotal value={1} />
      </div>
      <div className="checkout__content">
          <h2 className="checkout__title">Your Shopping Basket</h2>
          <div className="checkout__productsContent">
            {basket.length === 0 ? "No Items Added" : basket.map((item, index) => (
              <CheckoutProduct key={index} {...item} index={index} />
            ))}
          </div>
        </div>
    </div>
  );
}

export default Checkout;
