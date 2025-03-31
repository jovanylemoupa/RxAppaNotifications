import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtiz0ThVOcdz18d8gwZ7lppn99cHAq25w",
  authDomain: "rxappanotifications.firebaseapp.com",
  projectId: "rxappanotifications",
  storageBucket: "rxappanotifications.firebasestorage.app",
  messagingSenderId: "42367831628",
  appId: "1:42367831628:web:3194f425cba6bd3d27aee9",
  measurementId: "G-60PD7846F0"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default app;
