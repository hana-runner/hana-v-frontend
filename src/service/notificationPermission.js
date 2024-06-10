import { getToken, getMessaging } from "firebase/messaging";
import app from "./initFirebase";
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

const messaging = getMessaging(app);

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

async function handleAllowNotification() {
  registerServiceWorker(); // 나중에 설명
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
        console.log("token : ", token); // (토큰을 서버로 전송하는 로직)
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      alert(
        "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요",
      );
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}

export default handleAllowNotification;