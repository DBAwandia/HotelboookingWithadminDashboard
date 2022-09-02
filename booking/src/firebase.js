import { initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCIJHMtWJedJbbEGzjr9NwXEczhZ2WXKa4",
  authDomain: "receiveotp-d1e95.firebaseapp.com",
  projectId: "receiveotp-d1e95",
  storageBucket: "receiveotp-d1e95.appspot.com",
  messagingSenderId: "25438781863",
  appId: "1:25438781863:web:0ddf08b7f62d3eb9027682"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// export default app