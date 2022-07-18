const firebase = require("firebase-admin");

const serviceAccount = require("../../../serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

const firebaseDb = firebase.firestore();

module.exports = firebaseDb;
