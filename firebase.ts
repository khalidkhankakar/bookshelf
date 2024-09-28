// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlaT7d_uFSR2Yco-FNYIkJyoqhP-SUbrE",
  authDomain: "bookshelf-421df.firebaseapp.com",
  projectId: "bookshelf-421df",
  storageBucket: "bookshelf-421df.appspot.com",
  messagingSenderId: "216672110157",
  appId: "1:216672110157:web:822bc74cc8805f26da3e04",
  measurementId: "G-R8XFFPQSKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };