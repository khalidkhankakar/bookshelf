
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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

