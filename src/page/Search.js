import "./Search.css"
import React, { useState, useEffect } from "react"
import * as QS from "query-string";
import { db } from "../util/firebaseAuth";
import Product from "./comp/Product"
import { useHistory } from "react-router-dom";

function Search() {
  const history = useHistory();
  const parsed = QS.parse( window.location.search );
  const [product, setProduct] = useState(parsed.product);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(parsed.cat);
  const [cats, setCats] = useState([]);

  const catChanged = (event) => {
    const val = event.target.value

    let sURL = "/search?"
    sURL += product ? `product=${escape(product)}&` : ''
    sURL += `cat=${val}`

    history.push( sURL );
    setCategory( val );
  }

  const searchProducts = () => {
    setLoading(true);

    db
    .collection("categories")
    .get()
    .then((querySnapshot) => {
      
      let arr2 = [{id: "All", data: {en: "All", img: ""}}];

      querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        const arrEntry = { id: doc.id, data: docData };

        arr2.push( arrEntry )
        
        return null;
      });

      setCats(arr2);
      setLoading(false);
    });

    const rProducts = db.collection("products");
    const fCategory = category ?
      category === "All" ?
        rProducts :
        rProducts.where("cat", "==", category) :
      rProducts;
    
    fCategory
    .get()
    .then((snapshot) => {
      
      let arr = [];

      snapshot.docs.map((doc) => {
        var docData = doc.data();

        if( product ) {
          const titleLow = docData.title.toLowerCase();
          const prodLow = product.toLowerCase();
          if( titleLow.includes(prodLow) )
            arr.push({ id: doc.id, data: docData })
        } else {
          arr.push({ id: doc.id, data: docData })
        }

        return null;
      });

      setProducts(arr);
      //setLoading(false);
    });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setProduct( event.target.value );
    }
  }

  const handleButtonMouseDown = (event) => {
    const input_search = document.getElementById("input_search");
    setProduct( input_search.value );
  }

  const handleButtonKeyDown = (event) => {
    if (event.key === 'Enter') {
      const input_search = document.getElementById("input_search");
      setProduct( input_search.value );
    }
  }

  useEffect( () => {

    const input_search = document.getElementById("input_search");
    input_search?.addEventListener("keydown", handleKeyDown);

    const button_search = document.getElementById("button_search");
    button_search?.addEventListener( "mousedown", handleButtonMouseDown );
    button_search?.addEventListener( "keydown", handleButtonKeyDown );

    searchProducts();

    return () => {
      // Unbind the event listener on clean up
      input_search?.removeEventListener("keydown", handleKeyDown);
      button_search?.removeEventListener("mousedown", handleButtonMouseDown);
      button_search?.removeEventListener("keydown", handleButtonKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, category]);


  return (
    <div className="search animFadeIn">
      <div className="search__query">
        <div className="search__queryInfo">
          <span className="search__queryLabel">
            Searching for: 
          </span>
        
          <span className="search__queryValue">
            { product ? `"${product}"` : "(All)" }
          </span>
        </div>
        <div className="search__queryInfo">
          <span className="search__queryLabel">
            <label htmlFor="cats">Show Category:</label>
          </span>
          <select id="cats" name="cats" onChange={catChanged} value={category}>
            { cats.map((cat, key) => {
                return (<option key={key} value={cat.id}>{cat.id}</option>)
            }) }
          </select>
        </div>
      </div>
      <div className="search__resultsCount">
        <span >
          { loading ?
            <img src="/thumb/progress.gif" alt="Loading..." /> :
            products.length + " products found"
          }
        </span>
      </div>
      <div className="search__results">
        {products.map( (prod, key) => (
          <div key={key} className="search__product">
            <Product
              id={prod?.data.guid}
              title={prod?.data.title}
              price={prod?.data.price}
              image={prod?.data.image}
              rating={prod?.data.rating}
              index={key}
              key={key}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
