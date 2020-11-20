import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA0CrrZ7_NjNajOFF3afNvSTk4Jwrft2gM",
    authDomain: "healthywomen.firebaseapp.com",
    databaseURL: "https://healthywomen.firebaseio.com",
    projectId: "healthywomen",
    storageBucket: "healthywomen.appspot.com",
    messagingSenderId: "892575687822",
    appId: "1:892575687822:web:852d549ab12a800cbfd5df",
    measurementId: "G-57SGHFQPNZ"
  };




firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();