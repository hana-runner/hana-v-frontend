/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";
import ApiClient from "../apis/apiClient";
import { useModal } from "../context/ModalContext";

export const VAPID_PUBLIC_KEY =
  "BKCxoDymGFRQXp21d5FhA9ncs-BqMfT0FmC__3HzNmMX9m4veRjnlfhSTi0yBPVfn80O-KSvDMYSZzW5jfyKE7k";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const PushNotification: React.FC = () => {
  const { openModal } = useModal();
  const updateIsReceive = async (stat: boolean) => {
    try {
      const response: BaseResponseType =
        await ApiClient.getInstance().updateNotiReceive(stat);

      return response.success;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateDeviceToken = async (token: string) => {
    try {
      const response: BaseResponseType =
        await ApiClient.getInstance().updateDeviceToken(token);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateAlarmAtts = async (stat: boolean, token: string) => {
    try {
      const isReceive: boolean = await updateIsReceive(stat);
      if (isReceive) {
        try {
          const isTokenupdated: boolean = await updateDeviceToken(token);
        } catch (err) {
          return false;
        }
        console.log("알람 성공");
      }
    } catch (err) {
      openModal("알람 등록 실패");
      return false;
    }
  };

  useEffect(() => {
    console.log(firebaseConfig);
    // Firebase 초기화
    const app: FirebaseApp = initializeApp(firebaseConfig);
    try {
      const messaging: Messaging = getMessaging(app);
  
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // 브라우저에서 알림 허용시
          getToken(messaging, {
            vapidKey: VAPID_PUBLIC_KEY,
          })
            .then((currentToken) => {
              if (currentToken) {
                console.log(currentToken);
                //   alert("토큰: " + currentToken);
                // 토큰을 서버에 전달...
                updateAlarmAtts(true, currentToken);
              } else {
                console.log(
                  "No registration token available. Request permission to generate one.",
                );
              }
            })
            .catch((err) => {
              console.log("An error occurred while retrieving token. ", err);
            });
        } else {
          console.log("Permission not granted for Notification");
        }
      });
    } catch (error) {
      console.error("An error occurred while initializing messaging: ", error);
    }
  }, []);

  return (
    <section>
      <h1>Push Notification Setup</h1>
    </section>
  );
};

export default PushNotification;
