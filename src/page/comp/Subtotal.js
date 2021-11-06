import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../util/StateProvider";
import { getBasketTotal } from "../../util/reducer";
import { Link } from "react-router-dom";

function Subtotal(myval) {

  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        decimalScale={2}
        value={getBasketTotal(basket)}
        thousandSeparator={","}
        prefix={"$"}
        displayType={"text"}
        renderText={(value) => (
          <>
            <p>
              {/* TODO: ... */}
              Subtotal ({basket.length} items):&nbsp;
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
      />
      <Link to="/payment" >
        {getBasketTotal(basket) === 0 ?
          <button disabled>Proceed with Payment</button> :
          <button >Proceed with Payment</button>
        }
      </Link>
    </div>
  );
}

export default Subtotal;
