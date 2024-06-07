importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);
firebase.initializeApp({
  apiKey: "AIzaSyAPBVQKxlDw1YgvoR1mJMXg9MWMxEhlHVU",
  authDomain: "hana-v.firebaseapp.com",
  projectId: "hana-v",
  storageBucket: "hana-v.appspot.com",
  messagingSenderId: "772014999430",
  appId: "1:772014999430:web:31607b83737468898e8e07",
  measurementId: "G-6NR609FYVD",
});
const messaging = firebase.messaging();
