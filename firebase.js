// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5aP7ZycF-2C43y10zccSC51VM3H4CHDQ",
  authDomain: "monthly-contribution.firebaseapp.com",
  projectId: "monthly-contribution",
  storageBucket: "monthly-contribution.firebasestorage.app",
  messagingSenderId: "1063788479411",
  appId: "1:1063788479411:web:2ad94d9733fcc14db581c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);