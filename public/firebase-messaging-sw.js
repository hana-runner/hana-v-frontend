importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js",
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

const firebaseConfig = {
  apiKey: "AIzaSyDdWVKTE3q17G6lRtF_D2xmi0zPxxLsYCY",
  authDomain: "hanav-3f6ee.firebaseapp.com",
  projectId: "hanav-3f6ee",
  storageBucket: "hanav-3f6ee.appspot.com",
  messagingSenderId: "964360216393",
  appId: "1:964360216393:web:7af3e9a9ec433897ae4498",
  measurementId: "G-2Z0TK05PLK",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
