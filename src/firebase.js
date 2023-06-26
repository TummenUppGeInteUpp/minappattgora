import firebase from 'firebase/app';
import 'firebase/firestore';

// Konfigurera Firebase med dina inställningar
const firebaseConfig = {
  apiKey: "AIzaSyBap1-lUvFVwktmwu_acx_2-9NDLaTTgIA",
  authDomain: "minappattgora.firebaseapp.com",
  projectId: "minappattgora",
  storageBucket: "minappattgora.appspot.com",
  messagingSenderId: "1025688573941",
  appId: "1:1025688573941:web:cf4af1e95d3755f7ff32bc",
  measurementId: "G-75MC669KHK"
};

// Initialisera Firebase-appen
firebase.initializeApp(firebaseConfig);

// Exportera Firestore-instansen
export const firestore = firebase.firestore();
