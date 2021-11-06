import "./Featured.css"
import Product from "./Product";
import { db } from "../../util/firebaseAuth";
import React, { useState, useEffect } from "react"

function Featured() {
  const [loading, setLoading] = useState(false);
  //const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect( () => {

    setLoading(true);

    // db
    // .collection("categories")
    // .get()
    // .then((querySnapshot) => {
      
    //   let arr = [{id: "All", data: {en: "All", img: ""}}];

    //   querySnapshot.docs.map((doc) => {
    //     const docData = doc.data();
    //     const arrEntry = { id: doc.id, data: docData };

    //     arr.push( arrEntry )
        
    //     return null;
    //   });

    //   setCats(arr);
      
      // ------------------------------------------
      // TODO:  randomly use one catetegory to display
      const catRandom = "Books";

      const rProducts = db.collection("products");
      const fCategory = rProducts.where("cat", "==", catRandom).limit(8);
      
      fCategory
      .get()
      .then((snapshot) => {
        
        let arr = [];
  
        snapshot.docs.map((doc) => {
          var docData = doc.data();
          arr.push({ id: doc.id, data: docData })
          
          return null;
        });
  
        setProducts(arr);
        setLoading(false);
      });

    // });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // const products = [
  //   {
  //     title: "React Cookbook: Recipes for Mastering the React Framework",
  //     img: "https://images-na.ssl-images-amazon.com/images/I/41tLEAfYNJL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
  //     price: 24.99,
  //     rating: 5,
  //     id: "isbn##"
  //   },
  //   {
  //     title: "React Native Cookbook: Bringing the Web to Native Platforms",
  //     img: "https://images-na.ssl-images-amazon.com/images/I/51XHBjqNpnL._SX379_BO1,204,203,200_.jpg",
  //     price: 27.99,
  //     rating: 4,
  //     id: "isbn##"
  //   },
  //   {break: true},
  //   {
  //     title: "JavaScript Cookbook: Programming the Web",
  //     img: "https://images-na.ssl-images-amazon.com/images/I/41B63gsAnIS._SX379_BO1,204,203,200_.jpg",
  //     price: 42.99,
  //     rating: 4,
  //     id: "isbn##"
  //   },
  //   {
  //     title: "C# Cookbook: Modern Recipes for Professional Developers",
  //     img: "https://images-na.ssl-images-amazon.com/images/I/4185842VMML._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
  //     price: 44.99,
  //     rating: 4,
  //     id: "isbn##"
  //   },
  //   {
  //     title: "Effective Modern C++: 42 Specific Ways to Improve Your Use of C++11 and C++14",
  //     img: "https://pictures.abebooks.com/isbn/9781491903995-us.jpg",
  //     price: 22.99,
  //     rating: 4,
  //     id: "isbn##"
  //   },
  //   {break: true},
  //   {
  //     title: "Hands-On Django: Going Beyond the Polls",
  //     img: "https://images-na.ssl-images-amazon.com/images/I/51XaSrpJ5WL._SX379_BO1,204,203,200_.jpg",
  //     price: 28.99,
  //     rating: 4,
  //     id: "isbn##"
  //   },
  //   {
  //     title: "Flutter Cookbook: Over 100 proven techniques and solutions for app development",
  //     img: "https://images-na.ssl-images-amazon.com/images/I/513zm8ofKdS._SX404_BO1,204,203,200_.jpg",
  //     price: 44.99,
  //     rating: 5,
  //     id: "isbn##"
  //   },
  // ];

  let prods = [];
  let items = [];
  let rows = [];

  for (let key = 0; key < products.length; key++) {
    const prod = products[key];

    if (key === 2 || key === 5 || key === 8){
      rows.push( items );
      items = [];
      //continue;
    }

    items.push(
      <Product
        id={prod.data.guid}
        title={prod.data.title}
        price={prod.data.price}
        image={prod.data.image}
        rating={prod.data.rating}
        index={key}
        key={key}
      />
    );

    if (key === products.length-1) {
      rows.push( items );
      items = [];
    }
  }

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];

    prods.push(
      <div key={r} className="home__row">
        {row}
      </div>
    );
  }

  return (
    <div className="featured">
      {loading && <img src="/thumb/progress.gif" alt="" className="featured__loading" /> }
      {prods}
    </div>
  )
}

export default Featured
