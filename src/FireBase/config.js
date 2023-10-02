import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-1MwP-dSHhVlw9Pn3SWUd9ZGqQDDQxcY",
  authDomain: "safaanhairy-1d8cb.firebaseapp.com",
  projectId: "safaanhairy-1d8cb",
  storageBucket: "safaanhairy-1d8cb.appspot.com",
  messagingSenderId: "96064345525",
  appId: "1:96064345525:web:a9d1305312d14f63a335fc",
  measurementId: "G-B2Z492PTX7",
};

initializeApp(firebaseConfig);

// export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

// export let signedUser = null; // initialize signedUser to null

// onAuthStateChanged(auth, (user) => {
//   signedUser = user
//     ? {
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         uid: user.uid,
//       }
//     : null;
// });
