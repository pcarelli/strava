import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'


// const app = firebase.initializeApp({
//     apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
//     appId: import.meta.env.VITE_FIREBASE_APPID,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
// })


const app = firebase.initializeApp({
    apiKey: "AIzaSyD9h8t7h9QdOBf0bTIHd7JepadrBXo9jzc",
    authDomain: "fragment-ba087.firebaseapp.com",
    projectId: "fragment-ba087",
    storageBucket: "fragment-ba087.appspot.com",
    messagingSenderId: "1003097532126",
    appId: "1:1003097532126:web:c0392bd644380a489ec44f",
    measurementId: "G-3SY2LYH5ST"
})

export const auth = app.auth()
export default app