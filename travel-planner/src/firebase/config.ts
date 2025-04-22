// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDSqsvYddvyFI1O3JBB08sm-a_Ms8ODEhE",
    authDomain: "travel-plan-1e0c3.firebaseapp.com",
    projectId: "travel-plan-1e0c3",
    storageBucket: "travel-plan-1e0c3.firebasestorage.app",
    messagingSenderId: "832736988571",
    appId: "1:832736988571:web:368fcc3684e3aa2f82e53e",
    measurementId: "G-ZYB4BMM1K5"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); 
  
  export { auth }; 