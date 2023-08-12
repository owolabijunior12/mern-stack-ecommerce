import { getApp,getApps,initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCJ4F2qKZlDx_oNLxy2OyRHRzuYyKziPBY",
  authDomain: "iboytech-e-commence-project.firebaseapp.com",
  projectId: "iboytech-e-commence-project",
  storageBucket: "iboytech-e-commence-project.appspot.com",
  messagingSenderId: "112553563144",
  appId: "1:112553563144:web:7e7683846e80750e63adbd",
  measurementId: "G-ZSWG7DSNGC"
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export {app ,storage}; 
