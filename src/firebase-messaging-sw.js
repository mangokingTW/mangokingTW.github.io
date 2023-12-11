importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");
firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDAlVwsXWZXB3K2pGHugMBKT31-9yAA4e4",
  authDomain: "mango-messager.firebaseapp.com",
  projectId: "mango-messager",
  storageBucket: "mango-messager.appspot.com",
  messagingSenderId: "117096789211",
  appId: "1:117096789211:web:2baa6b726226eb9a28c8fe",
  measurementId: "G-0MXZSF2BND",
});
const messaging = firebase.messaging.isSupported() ? firebase.messaging() : console.log("Error")
console.log("Loaded")
messaging.onMessage((payload) => {
  console.log("Message received:", payload)
})
