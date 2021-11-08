import React, { useState, useEffect } from "react";
import { db } from "../../util/firebaseAuth";
import "./RestoreProducts.css";
import { Timestamp } from "firebase/firestore";
import { useStateValue } from "../../util/StateProvider";

function RestoreProducts() {
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line
  const [{ user }] = useStateValue();

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
    {
      guid: "elec-1",
      title: "Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal",
      img: "https://m.media-amazon.com/images/I/714Rq4k05UL._AC_SL1000_.jpg",
      price: 34.99,
      rating: 5,
      category: "Electronics",
    },
    {
      guid: "elec-2",
      title: "Fire TV Stick with Alexa Voice Remote (includes TV controls), HD streaming device",
      img: "https://m.media-amazon.com/images/I/51KKR5uGn6L._AC_SL1000_.jpg",
      price: 27.99,
      rating: 5,
      category: "Electronics",
    },
    {
      guid: "elec-3",
      title: "Echo Dot (4th Gen) Kids | Designed for kids, with parental controls | Tiger",
      img: "https://m.media-amazon.com/images/I/71ZUNGXc52L._AC_SL1000_.jpg",
      price: 34.99,
      rating: 5,
      category: "Electronics",
    },
    {
      guid: "elec-4",
      title: "Kindle - With a Built-in Front Light - Black",
      img: "https://m.media-amazon.com/images/I/61Ww4abGclL._AC_SL1000_.jpg",
      price: 49.99,
      rating: 5,
      category: "Electronics",
    },
    {
      guid: "elec-5",
      title: "Zombber Smart Light Bulbs, Music Sync RGB Color Changing 7W 60W Equivalent",
      img: "https://m.media-amazon.com/images/I/61yRX1jNWtS._AC_SL1500_.jpg",
      price: 14.99,
      rating: 5,
      category: "Electronics",
    },
    {
      guid: "clot-1",
      title: "Przewalski Winter Thermal Running Cycling Bike Jackets for Men",
      img: "https://m.media-amazon.com/images/I/51X2HncExIL._AC_UX679_.jpg",
      price: 39.99,
      rating: 5,
      category: "Clothing",
    },
    {
      guid: "clot-2",
      title: "VANCOOG Mens Long Sleeve Casual Lightweight Fitted Basic Henley T-Shirt",
      img: "https://m.media-amazon.com/images/I/91AcbqZLwQL._AC_SX679._SX._UX._SY._UY_.jpg",
      price: 21.99,
      rating: 4,
      category: "Clothing",
    },
    {
      guid: "clot-3",
      title: "Ryesoy Touch Screen Fingers Winter Gloves for Men Women",
      img: "https://m.media-amazon.com/images/I/710hRR1NaTS._AC_SL1500_.jpg",
      price: 16.99,
      rating: 5,
      category: "Clothing",
    },
    {
      guid: "clot-4",
      title: "OFEEFAN Women's Turtle Neck Sweatshirts High Low Hem Side Slit",
      img: "https://m.media-amazon.com/images/I/71rrVOpFXQL._AC_SX569._SX._UX._SY._UY_.jpg",
      price: 22.09,
      rating: 5,
      category: "Clothing",
    },
    {
      guid: "clot-5",
      title: "PGANDS Women's Casual Fall Long Sleeve Drawstring Sweatshirt Hoodies with Pockets",
      img: "https://m.media-amazon.com/images/I/71Vhq-NbUwL._AC_SY679._SX._UX._SY._UY_.jpg",
      price: 24.98,
      rating: 5,
      category: "Clothing",
    },
    {
      guid: "outd-1",
      title: "Keter Eden 70 Gallon Storage Bench Deck Box for Patio Seating – Brown",
      img: "https://m.media-amazon.com/images/I/41kBFWag+ZL._AC_.jpg",
      price: 241.90,
      rating: 5,
      category: "Outdoors",
    },
    {
      guid: "outd-2",
      title: "Hazli Platform Tree Swing for Kids and Adults – 60’’ Outdoor Swing Set 700 lb",
      img: "https://m.media-amazon.com/images/I/71tXHWiZ-kS._AC_SL1500_.jpg",
      price: 89.89,
      rating: 5,
      category: "Outdoors",
    },
    {
      guid: "outd-3",
      title: "LimeHill Garden Metal Wind Spinner - Yard Lawn Patio (84 inches, Copper Teal)",
      img: "https://m.media-amazon.com/images/I/71smTuwHG4L._AC_SL1500_.jpg",
      price: 109.99,
      rating: 0,
      category: "Outdoors",
    },
    {
      guid: "outd-4",
      title: "Rokia R 10.6' Inflatable Stand Up Paddle Board (6 Inches) Fishing on Flat Water",
      img: "https://m.media-amazon.com/images/I/51tEv4J2T2L._AC_.jpg",
      price: 359.99,
      rating: 0,
      category: "Outdoors",
    },
    {
      guid: "pets-1",
      title: "ZippyPaws - Birthday Cake Squeaky Dog Toy with Soft Stuffing",
      img: "https://m.media-amazon.com/images/I/41wcDJTa5lL._AC_.jpg",
      price: 109.99,
      rating: 0,
      category: "Pets",
    },
    {
      guid: "pets-2",
      title: "Tough Treat Dispensing Dog Chew Toy for Aggressive Chewers - Large Breed",
      img: "https://m.media-amazon.com/images/I/71LynfPlHEL._AC_SL1500_.jpg",
      price: 14.99,
      rating: 4,
      category: "Pets",
    },
    {
      guid: "pets-3",
      title: "Pet Zone IQ Treat Ball – Adjustable Treat Dispensing Dog Toy",
      img: "https://m.media-amazon.com/images/I/71Sd4tGdDzL._AC_SL1500_.jpg",
      price: 10.95,
      rating: 4,
      category: "Pets",
    },
    {
      guid: "toys-1",
      title: "Stephen Joseph Girls 2-6x Quilted & Coin Purse Butterfly, Purple/Hot Pink",
      img: "https://m.media-amazon.com/images/I/81yb0PruBiL._AC_SY741._SX._UX._SY._UY_.jpg",
      price: 16.00,
      rating: 5,
      category: "Toys",
    },
    {
      guid: "toys-2",
      title: "Flashing Cube Electronic Memory & Brain Game | Fun for Kids Ages 6-12 Years Old",
      img: "https://m.media-amazon.com/images/I/81aAQAycUcL._AC_SL1500_.jpg",
      price: 39.99,
      rating: 5,
      category: "Toys",
    },
    {
      guid: "toys-3",
      title: "Wooden Paddle Ball Toy (Set of 2) w/ Green Carry Bag | for Kids Ages 4+ Years Old",
      img: "https://m.media-amazon.com/images/I/71v8S2dCSTL._AC_SL1500_.jpg",
      price: 13.90,
      rating: 4,
      category: "Toys",
    },
    {
      guid: "toys-4",
      title: "Star Wars Grogu Plush Toy, 11-in from The Mandalorian, Ages 3+ Years Old",
      img: "https://m.media-amazon.com/images/I/71qSkhEsXNL._AC_SL1500_.jpg",
      price: 15.99,
      rating: 5,
      category: "Toys",
    },
    {
      guid: "kitc-1",
      title: "S&T INC. Soap Pump Dispenser and Sponge Holder, 13 Ounces, Silver",
      img: "https://m.media-amazon.com/images/I/81PehN9eRhS._AC_SL1500_.jpg",
      price: 10.99,
      rating: 5,
      category: "Kitchen",
    },
    {
      guid: "kitc-2",
      title: "Kitchen Sink Caddy Sponge Holder: Rust Proof - with Drain Tray for Counter",
      img: "https://m.media-amazon.com/images/I/71u87BVnHTL._AC_SL1200_.jpg",
      price: 22.98,
      rating: 5,
      category: "Kitchen",
    },
    {
      guid: "kitc-3",
      title: "Digital Food Scale, 11 lbs/5kg Small Stainless Steel, Precise Graduation",
      img: "https://m.media-amazon.com/images/I/610nfvWpwCL._SL1500_.jpg",
      price: 12.99,
      rating: 5,
      category: "Kitchen",
    },
    {
      guid: "kitc-4",
      title: "Stand Mixer, 660W 7.5Qt w/ 6+1 Speeds | Dishwasher-Safe | Red",
      img: "https://m.media-amazon.com/images/I/71cDY3kWavL._AC_SL1500_.jpg",
      price: 149.90,
      rating: 5,
      category: "Kitchen",
    },
    {
      guid: "kitc-5",
      title: "DFITO 3.5-8 Inch Chef Boxed Knives Set | Stainless Steel for Professionals",
      img: "https://m.media-amazon.com/images/I/81juHfVCKbL._AC_SL1500_.jpg",
      price: 99.99,
      rating: 5,
      category: "Kitchen",
    },
    {
      guid: "heal-1",
      title: "APLUGTEK Jump, Skipping Rope for Fitness, Adjustable Cordless for Men Women Kids",
      img: "https://m.media-amazon.com/images/I/71lzpNNiP2L._AC_SL1500_.jpg",
      price: 12.73,
      rating: 5,
      category: "Health",
    },
    {
      guid: "heal-2",
      title: "Sunny Health & Fitness Slim Folding Treadmill with Speakers for Home Gyms",
      img: "https://m.media-amazon.com/images/I/71THROEAgVL._AC_SL1500_.jpg",
      price: 699.97,
      rating: 5,
      category: "Health",
    },
    {
      guid: "heal-3",
      title: "Goplus 2 in 1 Folding Treadmill w/ Dual Display, 2.25HP, for Home/Office",
      img: "https://m.media-amazon.com/images/I/71GWOq1OWVL._AC_SL1500_.jpg",
      price: 399.99,
      rating: 4,
      category: "Health",
    },
    {
      guid: "heal-4",
      title: "KOMSURF Adjustable Dumbbell, 25/55 lb, for Men and Women, for Strength Training",
      img: "https://m.media-amazon.com/images/I/61EuGjMoDOS._AC_SL1500_.jpg",
      price: 72.99,
      rating: 5,
      category: "Health",
    },
    {
      guid: "heal-5",
      title: "Vitalitown Probiotics 120 Billion CFUs | Digestive & Immune Support | for Men Women",
      img: "https://m.media-amazon.com/images/I/71D5lJ6lJeL._AC_SL1500_.jpg",
      price: 18.49,
      rating: 5,
      category: "Health",
    },
    {
      guid: "heal-6",
      title: "Dove Original Clean Invisible Solid Deodorant, 2 Count",
      img: "https://m.media-amazon.com/images/I/61L0aVKDuxL._SL1500_.jpg",
      price: 9.89,
      rating: 5,
      category: "Health",
    },
    {
      guid: "groc-1",
      title: "Quaker Roni Cups Mix, Butter & Garlic Pasta, 2.15 Oz (Pack of 12)",
      img: "https://m.media-amazon.com/images/I/91mS+g5d7HL._SL1500_.jpg",
      price: 17.89,
      rating: 5,
      category: "Groceries",
    },
    {
      guid: "groc-2",
      title: "Jack Link’s Beef Jerky, Teriyaki, (2) 9 Oz Bags – 96% Fat Free, No Added MSG",
      img: "https://m.media-amazon.com/images/I/71TGsotXewL._SL1199_.jpg",
      price: 19.99,
      rating: 5,
      category: "Groceries",
    },
    {
      guid: "groc-3",
      title: "OREO Double Stuf Chocolate Sandwich Cookies, Family Size, 3 Packs",
      img: "https://m.media-amazon.com/images/I/8195fOj3XSS._SL1500_.jpg",
      price: 10.68,
      rating: 5,
      category: "Groceries",
    },
    {
      guid: "groc-4",
      title: "Tropicana Orange Juice, 10 Ounce (Pack of 24)",
      img: "https://m.media-amazon.com/images/I/81KwNbKZ5EL._SL1500_.jpg",
      price: 9.91,
      rating: 5,
      category: "Groceries",
    },
    {
      guid: "groc-5",
      title: "Mountain Dew, 12 oz (pack of 12)",
      img: "https://m.media-amazon.com/images/I/71U+aVCC9+L._SL1500_.jpg",
      price: 5.99,
      rating: 5,
      category: "Groceries",
    },
    {
      guid: "groc-6",
      title: "Zevia Ginger Root Beer, Zero Calories, 12 Ounce Cans (Pack of 6)",
      img: "https://m.media-amazon.com/images/I/71GHE+C6zeL._SL1500_.jpg",
      price: 4.99,
      rating: 5,
      category: "Groceries",
    },
    {
      guid: "groc-7",
      title: "Mary Kitchen Hash - Corned Beef -14 Ounce (Pack of 12)",
      img: "https://m.media-amazon.com/images/I/61cNezmSItL._SL1000_.jpg",
      price: 45.99,
      rating: 5,
      category: "Groceries",
    },
    {
      guid: "groc-8",
      title: "Chock Full o’Nuts New York Dark Roast Ground Coffee, 100% Arabica, 23 ounces",
      img: "https://m.media-amazon.com/images/I/81TBeTikHhL._SL1500_.jpg",
      price: 8.49,
      rating: 5,
      category: "Groceries",
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

    await timeout(500);
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

    await timeout(3000);

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

  console.log( user );

  return (
    <div className="restore">
      {user?.email === "admin@izzys.work" ?
        <button onClick={restoreAllProducts}>
          Restore All Products
        </button> :
        <button disabled onClick={restoreAllProducts}>
          Restore All Products
        </button>
      }
      <br/>
      <div className="restore__onFirestore">
        On Google Firestore: &nbsp; ({products.length} items)
      </div>
      { products.map((prod, key) => (
        <ul key={key} className="restore__product">
          <li>
            <span className="title">{prod.data.title}</span>
            in <span className="category">{prod.data.cat}</span>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default RestoreProducts
