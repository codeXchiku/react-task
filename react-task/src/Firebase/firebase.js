// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCP7jyZcygb6Sdvj72KJhbmrHPkChYUqyQ",
  authDomain: "react-task-a7ac7.firebaseapp.com",
  projectId: "react-task-a7ac7",
  storageBucket: "react-task-a7ac7.firebasestorage.app",
  messagingSenderId: "19986779989",
  appId: "1:19986779989:web:7bfebe3ff44d83fb6b69dc",
  measurementId: "G-7B1QBQHN02"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);


export const requestPermission = async () => {
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BJTgagTY2_Ba_IaCOaVG_Sc-Ta_2--t2dQuWj2e08vg0KqSajKOid7rYYDlli8Xd6mbsoU4z-6Gltq2oBbfExz0",
    });
    console.log("FCM Token:", token);
    alert("Notification permission granted!");
    return token;
  } else {
    alert("Notification permission denied.");
  }
};


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground message:", payload);
      resolve(payload);
    });
  });
