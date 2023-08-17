import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics' 
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCUQBmjHaEU_89StonLK4xxg_RsXhqr8Q0",
  authDomain: "react-chat-68e62.firebaseapp.com",
  projectId: "react-chat-68e62",
  storageBucket: "react-chat-68e62.appspot.com",
  messagingSenderId: "546999924528",
  appId: "1:546999924528:web:77af7001a2a5978a043af5",
  measurementId: "G-QBJ7BY2GZY"
  };

//   initialize firebase
// Initialize the Firebase app with the provided configuration
export const app = initializeApp(firebaseConfig);
// Get the Analytics instance for the initialized Firebase app
export const analytics = getAnalytics(app);
// Get the Authentication instance
export const auth = getAuth();
// Get the Storage instance
export const storage = getStorage();
// Get the Firestore instance
export const db = getFirestore()


