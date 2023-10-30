import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwhdXPzaZdhxJCrKFyzn3SkAb-9mgFFs8",
  authDomain: "newbook-a7f04.firebaseapp.com",
  databaseURL: "https://newbook-a7f04-default-rtdb.firebaseio.com",
  projectId: "newbook-a7f04",
  storageBucket: "newbook-a7f04.appspot.com",
  messagingSenderId: "565168065146",
  appId: "1:565168065146:web:b86a7cc6a46388b4e4c9c3"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);