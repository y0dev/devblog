import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    authDomain: process.env.VUE_APP_GOOGLE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_GOOGLE_PRODUCT_ID,
    storageBucket:process.env.VUE_APP_GOOGLE_STORAGE_BUCKET,
    messagingSenderId:process.env.VUE_APP_GOOGLE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_GOOGLE_APP_ID
  };

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

// collection references
const aboutMeCollection = db.collection('aboutMe')
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')

// export utils/refs
export {
  db,
  auth,
  storage,
  timeStamp,
  aboutMeCollection,
  usersCollection,
  postsCollection,
}
