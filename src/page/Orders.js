import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "../util/firebaseAuth";
import { useStateValue } from "../util/StateProvider";
import Order from "./comp/Order";

function Orders() {
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [user]);

  return (
    <div className="orders animFadeIn">
      <h1>Your Orders</h1>
      <div className="orders__listing">
        {orders?.map((order,key) => (
          <Order key={key} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
