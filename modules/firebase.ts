import firebase from "firebase";
import firebaseJson from "../firebase.json";

const firebaseConfig = {
  apiKey: "AIzaSyBVnCnzJUxTgAgTOVLuyMbNEu6TSPTEH64",
  authDomain: "chocoburn-prod.firebaseapp.com",
  projectId: "chocoburn-prod",
  storageBucket: "chocoburn-prod.appspot.com",
  messagingSenderId: "1075529154513",
  appId: "1:1075529154513:web:488031e294c0ed4c062af0",
  measurementId: "G-G2GV192ZYL",
};

const nodeEnv = process.env.NODE_ENV;
const app = firebase.initializeApp(firebaseConfig);

const analytics = app.analytics();
const firestore = app.firestore();
const functions = app.functions(firebaseJson.region);
const auth = app.auth();

if (nodeEnv === "development") {
  firestore.settings({
    host: `localhost:${firebaseJson.emulators.firestore.port}`,
    ssl: false,
  });
  functions.useEmulator("localhost", firebaseJson.emulators.functions.port);
  auth.useEmulator(`http://localhost:${firebaseJson.emulators.auth.port}`);
}

export { analytics, firestore, functions, auth };
