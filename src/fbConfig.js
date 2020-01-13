import * as firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA9Pz43ZiFy9oglAJ9usRikwnDckP-Q3_U",
    authDomain: "sakongstagram.firebaseapp.com",
    databaseURL: "https://sakongstagram.firebaseio.com",
    projectId: "sakongstagram",
    storageBucket: "sakongstagram.appspot.com",
    messagingSenderId: "873488151880",
    appId: "1:873488151880:web:db2fe365c3de365232af7d",
    measurementId: "G-MLKDTE396Y"
  };
  firebase.initializeApp(firebaseConfig);

  export const anal = firebase.analytics();