const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")("sk_test_MWBXEnf2SXg2b3keXVXpvHBI");

// API

// App config
const app = express();

// Middleware(s)

app.use(cors);

app.use(express.json());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

// API routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  //let paymentIntent = null;
  let clientSecret = null;
  console.log("Payment Request Received for: ", total);

  try {
    await stripe.paymentIntents
      .create(
        {
          amount: total,
          currency: "usd",
          payment_method_types: ["card"],
          receipt_email: "email@email.com",
        },
        function (err, paymentIntent) {
          if (err) {
            console.log(err, "failed payment");
          }

          console.log( "paymentIntent:  ", paymentIntent );

          //charged = paymentIntent.id;
          clientSecret = paymentIntent.client_secret;

          console.log( "clientSecret:   ", clientSecret );

          res.status(201).send({
            //res.status(200).send({
            //clientSecret: paymentIntent.clientSecret,
            clientSecret: clientSecret,
          });      
        }
      )
      .catch((error) => {
        console.log("CATCH 1.a:  ", error);
        return res.status(500).send(error);
      });
  } catch (error) {
    console.log("CATCH 1:  ", error);
    return res.status(500).send(error);
  }

  // try {
  // res.set("Access-Control-Allow-Origin", "*");
  // // res.setHeader("Access-Control-Allow-Credentials", "true");
  // // res.setHeader("Access-Control-Max-Age", "1800");
  // res.set("Access-Control-Allow-Headers", "*");
  // res.set(
  //   "Access-Control-Allow-Methods",
  //   "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  // );
  // } catch (err) {
  //   console.log("CATCH 2:  ", error);
  //   return res.status(500).send(error);
  // }

});

// Listener(s)
exports.api = functions.https.onRequest(app);

// exports.exampleFunction = functions.https.onRequest((request, response) => {
//   cors(request, response, () => {});
//   return response.send("Hello from Firebase!");
// });

// endpoint(s)
// http://localhost:5001/amaz0ne/us-central1/api
