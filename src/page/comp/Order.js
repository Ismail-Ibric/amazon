import moment from "moment";
import React from "react";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";
import "./Order.css";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <span className="order__amoutLabel">Amount:</span>
      <CurrencyFormat
        className="order__amount"
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      <p className="order__date">
        {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
      </p>
      {order.data.basket?.map((item,key) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideRemoveBtn
          key={key}
        />
      ))}
    </div>
  );
}

export default Order;
