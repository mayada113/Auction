
import { initializeApp } from "firebase/app";
import { getStorage } from  'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI5fM_076csWzRA6PzkuBwb1bmKA7UMcI",
  authDomain: "auction-5bc8d.firebaseapp.com",
  projectId: "auction-5bc8d",
  storageBucket: "auction-5bc8d.appspot.com",
  messagingSenderId: "237550114496",
  appId: "1:237550114496:web:0186307d4933b39be9ff25",
  measurementId: "G-37X5MTG6GN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage
