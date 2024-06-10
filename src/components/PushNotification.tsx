import { useEffect } from "react";
import firebase from "firebase/compat/app";
import { getMessaging } from "firebase/messaging/sw";
import { getToken } from "firebase/messaging";
import ApiClient from "../apis/apiClient";
import { useModal } from "../context/ModalContext";

export const VAPID_PUBLIC_KEY =
  "BKCxoDymGFRQXp21d5FhA9ncs-BqMfT0FmC__3HzNmMX9m4veRjnlfhSTi0yBPVfn80O-KSvDMYSZzW5jfyKE7k";
const firebaseConfig = {
  apiKey: "AIzaSyDdWVKTE3q17G6lRtF_D2xmi0zPxxLsYCY",
  authDomain: "hanav-3f6ee.firebaseapp.com",
  projectId: "hanav-3f6ee",
  storageBucket: "hanav-3f6ee.appspot.com",
  messagingSenderId: "964360216393",
  appId: "1:964360216393:web:7af3e9a9ec433897ae4498",
  measurementId: "G-2Z0TK05PLK",
};
const firebaseapp = firebase.initializeApp(firebaseConfig);

// import { sendTokenToServer } from "./api";

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
          console.log(
            "Service Worker가 scope에 등록되었습니다.:",
            registration.scope,
          );
        })
        .catch(function (err) {
          console.log("Service Worker 등록 실패:", err);
        });
    });
  }
}

const messaging = getMessaging(firebaseapp);

// onMessage(messaging, (payload) => {
//   // console.log("알림 도착 ", payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   if (Notification.permission === "granted") {
//     new Notification(notificationTitle, notificationOptions);
//   }
// });

// async function handleAllowNotification() {
//   registerServiceWorker(); // 나중에 설명
//   try {
//     const permission = await Notification.requestPermission();

//     if (permission === "granted") {
//       const token = await getToken(messaging, {
//         vapidKey: VAPID_PUBLIC_KEY,
//       });
//       if (token) {
//         console.log("token : ", token); // (토큰을 서버로 전송하는 로직)
//       } else {
//         alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
//       }
//     } else if (permission === "denied") {
//       alert(
//         "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요",
//       );
//     }
//   } catch (error) {
//     console.error("푸시 토큰 가져오는 중에 에러 발생", error);
//   }
// }

async function handleAllowNotification() {
  registerServiceWorker(); // 나중에 설명
  try {
    Notification.requestPermission().then((per) => {
      getToken(messaging, {
        vapidKey: VAPID_PUBLIC_KEY,
      }).then((currToke) => {
        if (currToke) {
          console.log("token : ", currToke); // (토큰을 서버로 전송하는 로직)
        } else {
          alert("그딴거 없음");
        }
      });
    });

    const token = await getToken(messaging, {
      vapidKey: VAPID_PUBLIC_KEY,
    });
    if (token) {
      console.log("token : ", token); // (토큰을 서버로 전송하는 로직)
    } else {
      alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}

const PushNotification: React.FC = () => {
  const { openModal } = useModal();

  const updateIsReceive = async (stat: boolean) => {
    try {
      const response = await ApiClient.getInstance().updateNotiReceive(stat);
      return response.success;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateDeviceToken = async (token: string) => {
    try {
      const response = await ApiClient.getInstance().updateDeviceToken(token);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateAlarmAtts = async (stat: boolean, token: string) => {
    try {
      const isReceive = await updateIsReceive(stat);
      if (isReceive) {
        try {
          const isTokenupdated = await updateDeviceToken(token);
          if (!isTokenupdated) {
            throw new Error("Failed to update token");
          }
          console.log("알람 성공");
        } catch (err) {
          return false;
        }
      }
    } catch (err) {
      openModal("알람 등록 실패");
      return false;
    }
  };

  useEffect(() => {
    handleAllowNotification();
    // console.log(firebaseConfig);
    // try {
    //   const messaging = firebase.messaging(firebaseapp);
    //   Notification.requestPermission().then((permission) => {
    //     if (permission === "granted") {
    //       // 브라우저에서 알림 허용시
    //       messaging
    //         .getToken({
    //           vapidKey: VAPID_PUBLIC_KEY,
    //         })
    //         .then((currentToken) => {
    //           if (currentToken) {
    //             console.log(currentToken);
    //             // 토큰을 서버에 전달...
    //             updateAlarmAtts(true, currentToken);
    //           } else {
    //             console.log(
    //               "No registration token available. Request permission to generate one.",
    //             );
    //           }
    //         })
    //         .catch((err) => {
    //           console.log("An error occurred while retrieving token. ", err);
    //         });
    //     } else {
    //       console.log("Permission not granted for Notification");
    //     }
    //   });
    // } catch (error) {
    //   console.error("An error occurred while initializing messaging: ", error);
    // }
  }, []);

  return (
    <section>
      <h1>Push Notification Setup</h1>
    </section>
  );
};

export default PushNotification;
