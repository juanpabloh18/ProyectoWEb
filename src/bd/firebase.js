import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyABQm6rbwA8Hcc8PZSVN2ud9RHcWDc_8yg",
    authDomain: "proyectoweb-29032.firebaseapp.com",
    projectId: "proyectoweb-29032",
    storageBucket: "proyectoweb-29032.appspot.com",
    messagingSenderId: "732080864521",
    appId: "1:732080864521:web:8a7d74711799ad09c667d8"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);







