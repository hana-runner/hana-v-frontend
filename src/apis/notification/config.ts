import { useEffect } from "react";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";

export const VAPID_PUBLIC_KEY = "BKCxoDymGFRQXp21d5FhA9ncs-BqMfT0FmC__3HzNmMX9m4veRjnlfhSTi0yBPVfn80O-KSvDMYSZzW5jfyKE7k";

const firebaseConfig = {
  apiKey: "AIzaSyDdWVKTE3q17G6lRtF_D2xmi0zPxxLsYCY",
  authDomain: "hanav-3f6ee.firebaseapp.com",
  projectId: "hanav-3f6ee",
  storageBucket: "hanav-3f6ee.appspot.com",
  messagingSenderId: "964360216393",
  appId: "1:964360216393:web:7af3e9a9ec433897ae4498",
  measurementId: "G-2Z0TK05PLK"
};

const PushNotification: React.FC = () => {
  useEffect(() => {
    // Firebase 초기화
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const messaging: Messaging = getMessaging(app);

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') { // 브라우저에서 알림 허용시
        getToken(messaging, {
          vapidKey: VAPID_PUBLIC_KEY,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log(currentToken);
              alert("토큰: " + currentToken);
              // 토큰을 서버에 전달...
            } else {
              console.log("No registration token available. Request permission to generate one.");
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      } else {
        console.log("Permission not granted for Notification");
      }
    });

  }, []);

  return (
    <div>
      <h1>Push Notification Setup</h1>
    </div>
  );
};

export default PushNotification;