importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});
const messaging = firebase.messaging();
if ('serviceWorker' in navigator) {
  console.log('in the service worker')
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
  console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
  console.log('Service worker registration failed, error:', err);
  });
  }
  messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Notification Service';
  const notificationOptions = {
  body: 'you have some new notifications.',
  icon: '/firebase-logo.png'
  };
  
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
