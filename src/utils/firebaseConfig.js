import firebase from 'firebase';

var firebaseConfig = { 
    apiKey: "AIzaSyCkgABeanZIxYGTPx-BieM4uW_xPFzCW4c",
    authDomain: "nyous-b6aca.firebaseapp.com",
    projectId: "nyous-b6aca",
    storageBucket: "nyous-b6aca.appspot.com",
    messagingSenderId: "605057588992",
    appId: "1:605057588992:web:135de486b34326fc699de5"
};
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const storage = app.storage();
export default firebaseConfig;