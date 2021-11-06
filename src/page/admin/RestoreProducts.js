import React, { useState, useEffect } from "react";
import { db } from "../../util/firebaseAuth";
import "./RestoreProducts.css";
import { Timestamp } from "firebase/firestore";

function RestoreProducts() {
  const [products, setProducts] = useState([]);
  const productsToRestore = [
    {
      guid: "isbn-1",
      title: "React Cookbook: Recipes for Mastering the React Framework",
      img: "https://images-na.ssl-images-amazon.com/images/I/41tLEAfYNJL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      price: 24.99,
      rating: 5,
      category: "Books",
    },
    {
      guid: "isbn-2",
      title: "React Native Cookbook: Bringing the Web to Native Platforms",
      img: "https://images-na.ssl-images-amazon.com/images/I/51XHBjqNpnL._SX379_BO1,204,203,200_.jpg",
      price: 27.99,
      rating: 4,
      category: "Books",
    },
    {
      guid: "isbn-3",
      title: "JavaScript Cookbook: Programming the Web",
      img: "https://images-na.ssl-images-amazon.com/images/I/41B63gsAnIS._SX379_BO1,204,203,200_.jpg",
      price: 42.99,
      rating: 4,
      category: "Books",
    },
    {
      guid: "isbn-4",
      title: "C# Cookbook: Modern Recipes for Professional Developers",
      img: "https://images-na.ssl-images-amazon.com/images/I/4185842VMML._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      price: 44.99,
      rating: 4,
      category: "Books",
    },
    {
      guid: "isbn-5",
      title: "Effective Modern C++: 42 Specific Ways to Improve Your Use of C++11 and C++14",
      img: "https://pictures.abebooks.com/isbn/9781491903995-us.jpg",
      price: 22.99,
      rating: 4,
      category: "Books",
    },
    {
      guid: "isbn-6",
      title: "Hands-On Django: Going Beyond the Polls",
      img: "https://images-na.ssl-images-amazon.com/images/I/51XaSrpJ5WL._SX379_BO1,204,203,200_.jpg",
      price: 28.99,
      rating: 4,
      category: "Books",
    },
    {
      guid: "isbn-7",
      title: "Flutter Cookbook: Over 100 proven techniques and solutions for app development",
      img: "https://images-na.ssl-images-amazon.com/images/I/513zm8ofKdS._SX404_BO1,204,203,200_.jpg",
      price: 44.99,
      rating: 5,
      category: "Books",
    },
  ];

  const addProductToFirestore = async (product) => {

    db
    .collection("products")
    .add({
      guid: product.guid,
      cat: product.category,
      title: product.title,
      image: product.img,
      price: product.price,
      rating: product.rating,
      date: Timestamp.fromDate(new Date())
    }).then(function () {
      console.log("Products successfully added to Firestore!");
    })
    .catch(function (error) {
      console.error("Error adding Products to Firestore: ", error);
    });

    await timeout(400);
  };

  const deleteAllDocsInProducts = () => {
    db.collection('products').get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(snapshot => {
          snapshot.ref.delete();
      })
      console.log("Products successfully deleted to Firestore!");
    }).catch(function (error) {
      console.error("Error deleting Productss on Firestore: ", error);
    });
  }

  const restoreAllProducts = async () => {

    deleteAllDocsInProducts();

    await timeout(1000);

    productsToRestore.map( (product, key) => {
      return addProductToFirestore( product );
    });
  }

  const timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  useEffect( () => {

    db
    .collection("products")
    .get()
    .then((querySnapshot) => {
      console.log( "querySnapshot", querySnapshot );
      
      let arr = [];    
      querySnapshot.docs.map((doc) => {
        return arr.push({ id: doc.id, data: doc.data() })
      });

      setProducts(arr);
    });
  }, []);

  return (
    <div className="restore">
      <button onClick={restoreAllProducts}>
        Restore All Products
      </button>
      <br/>
      {
        products.map((prod, key) => (
          
          <span key={key}>
            title: {prod.data.title} <br/>
            guid: {prod.data.guid} <br/>
          </span> 
        ))
      }
    </div>
  )
}

export default RestoreProducts
