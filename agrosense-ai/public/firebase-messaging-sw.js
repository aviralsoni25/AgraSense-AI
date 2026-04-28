importScripts("https://www.gstatic.com/firebasejs/12.12.1/firebase-app-compat.js");
importScripts(
  "https://www.gstatic.com/firebasejs/12.12.1/firebase-messaging-compat.js",
);

const config = {
  apiKey: "REPLACE_WITH_FIREBASE_API_KEY",
  authDomain: "REPLACE_WITH_FIREBASE_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_FIREBASE_PROJECT_ID",
  storageBucket: "REPLACE_WITH_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_FIREBASE_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_FIREBASE_APP_ID",
};

const hasRealConfig = Object.values(config).every(
  (value) => typeof value === "string" && !value.startsWith("REPLACE_WITH_"),
);

if (hasRealConfig) {
  firebase.initializeApp(config);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification?.title ?? "AgroSense Alert", {
      body: payload.notification?.body ?? "New farm advisory available.",
      icon: "/icons/icon-192.svg",
    });
  });
}
