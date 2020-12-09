import firebase from 'firebase'

const firebaseConfig = {};




firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
