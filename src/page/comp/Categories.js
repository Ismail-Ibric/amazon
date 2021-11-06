import React from "react"
import "./Categories.css"
import { db } from "../../util/firebaseAuth"
import { useState, useEffect } from "react"

function Categories() {
  // eslint-disable-next-line
  const [cats, setCats] = useState([]);
  // eslint-disable-next-line
  const [catsLoading, setCatsLoading] = useState(false);

  useEffect( () => {
    setCatsLoading(true);

    db
    .collection("categories")
    .get()
    .then((querySnapshot) => {
      
      let arr = [];

      querySnapshot.docs.map((doc) => {
        var docData = doc.data();
        arr.push({ id: doc.id, data: docData })
        return null;
      });
      
      setCats(arr);
      setCatsLoading(false);
    });

  }, []);


  return (
    <div className="home__catCont">
      { catsLoading && <img src="/thumb/progress.gif" alt="" className="home__catsLoading"/> }
      { cats.map((item,key) => (
        <div key={key} className="home__catThumbCont grow">
          <a href={`/search?cat=${item.id}`} >
            <img src={item.data.img} alt="" className="home__catThumb" />
          </a>
        </div>
      )) }
    </div>
  )
}

export default Categories
