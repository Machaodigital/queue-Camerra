import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXTxJ2ZzZyM2FaxLINvkIB3seDyIeHHc8",
  authDomain: "camera-queue.firebaseapp.com",
  projectId: "camera-queue",
  storageBucket: "camera-queue.firebasestorage.app",
  messagingSenderId: "370387867886",
  appId: "1:370387867886:web:9447c8b79f2b80a249fbff",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
