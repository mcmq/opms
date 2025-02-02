// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOT3_7ueDAq3jyqqTXu3wBwyxnIzGQNBI",
  authDomain: "opms-27706.firebaseapp.com",
  projectId: "opms-27706",
  storageBucket: "opms-27706.firebasestorage.app",
  messagingSenderId: "109992102223",
  appId: "1:109992102223:web:6bbd172a44f71541ef9d3a",
  measurementId: "G-TKQKXW4T01"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
