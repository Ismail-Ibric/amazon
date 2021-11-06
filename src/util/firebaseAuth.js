import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-5n5gZtWPVMIMcmxWUhGr5gKb9KcgLD0",
  authDomain: "amaz0ne.firebaseapp.com",
  projectId: "amaz0ne",
  storageBucket: "amaz0ne.appspot.com",
  messagingSenderId: "287006628455",
  appId: "1:287006628455:web:85eb327b917e65ebefd2c2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };