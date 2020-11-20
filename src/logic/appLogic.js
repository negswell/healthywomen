import { kea } from 'kea';
import { auth } from '../components/Config';
import firebase from 'firebase';
const appLogic = kea({
  path: () => ['app'],

  defaults: {
    user: {},
    error: '',
  },

  actions: {
    setError: (error) => ({ error }),
    setUser: (user) => ({ user }),
    signInGoogle: true,
    signOut: true,
    signInNormal: (userDetails) => ({ userDetails }),
    signUpNormal: (userDetails) => ({ userDetails }),
  },

  reducers: {
    user: {
      setUser: (_, user) => user,
    },
    error: {
      setError: (_, error) => error,
    },
  },
  listeners: ({ actions, values }) => ({
    signInGoogle: async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const user = await auth.signInWithPopup(provider);
        console.log(user);
      } catch (error) {
        console.log('error in google login', error);
        actions.setError(error.message);
      }
    },
    signInNormal: async ({ userDetails }) => {
      try {
        console.log(userDetails);
        const user = await auth.signInWithEmailAndPassword(
          userDetails.email,
          userDetails.password
        );
        console.log(user);
        // actions.setUser(user)
      } catch (error) {
        console.log('error in normal login', error);
        actions.setError(error.message);
      }
    },
    signUpNormal: async ({ userDetails }) => {
      try {
        const user = await auth.createUserWithEmailAndPassword(
          userDetails.email,
          userDetails.password
        );
        console.log(user);
        // actions.setUser(user)
      } catch (error) {
        console.log('error in normal login', error);
        actions.setError(error.message);
      }
    },
    signOut: async () => {
      try {
        await auth.signOut();

        // actions.setUser(user)
      } catch (error) {
        console.log('error in sign out', error);
        actions.setError(error.message);
      }
    },
  }),
});

export default appLogic;
