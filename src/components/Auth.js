
import {auth} from './Config'
import firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };

//   const signInNormal=() =>{
//       auth.signInWithEmailAndPassword()
//       .then((user)=>{
//           console.log(user)

//       })
//   }

export {signInWithGoogle} ;