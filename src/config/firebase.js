import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCh-S50WITKi95CjrGqcQTZebVe6p4rDdY",
    authDomain: "social-media-app-f1328.firebaseapp.com",
    databaseURL: "https://social-media-app-f1328.firebaseio.com",
    projectId: "social-media-app-f1328",
    storageBucket: "social-media-app-f1328.appspot.com",
    messagingSenderId: "45360796400",
    appId: "1:45360796400:web:cb9319b722bdfa9c462835",
    measurementId: "G-EC4TET4PG9"
  };

  firebase.initializeApp(firebaseConfig)

  export const auth = firebase.auth()
  export const db = firebase.firestore()
  export const functions = firebase.functions()
  export const storage = firebase.storage()