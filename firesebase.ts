import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCM6oxDKYH0i-5H6ajR-t5h5NX6PS7X1Ow",
    authDomain: "web-scraper-f3800.firebaseapp.com",
    projectId: "web-scraper-f3800",
    storageBucket: "web-scraper-f3800.appspot.com",
    messagingSenderId: "865543678474",
    appId: "1:865543678474:web:219b0ce20b875d92d70df3",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
