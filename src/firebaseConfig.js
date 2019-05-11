import firebase from 'firebase'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCRgSONqxC4x3ea_Hp606W40wq8YSvWO6A",
    authDomain: "vuechallenge-efe68.firebaseapp.com",
    databaseURL: "https://vuechallenge-efe68.firebaseio.com",
    projectId: "vuechallenge-efe68",
    storageBucket: "vuechallenge-efe68.appspot.com",
    messagingSenderId: "481663267392",
    appId: "1:481663267392:web:e9dfb6934202ec5b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // firebase utils
  const db = firebase.firestore()
  const auth = firebase.auth()
  const currentUser = auth.currentUser

  // date issue fix according to firebase
  const settings = {
      timestampsInSnapshots: true
  }
  db.settings(settings)

  // firebase collections
  const usersCollection = db.collection('users')
  const questionsCollection = db.collection('questions')
  const scoresCollection = db.collection('scores')

  export {
      db,
      auth,
      currentUser,
      usersCollection,
      questionsCollection,
      scoresCollection
  }
