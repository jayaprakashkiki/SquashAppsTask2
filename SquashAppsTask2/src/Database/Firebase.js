import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCBpllpMwL3ir5JIob4LIJlQeIijytSxN4",
  authDomain: "squashappstask.firebaseapp.com",
  databaseURL: "https://squashappstask.firebaseio.com",
  projectId: "squashappstask",
  storageBucket: "squashappstask.appspot.com",
  messagingSenderId: "542066500610",
  appId: "1:542066500610:web:7a7f61769b8ed18b7d331b",
  measurementId: "G-1XSRRN8DC7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
