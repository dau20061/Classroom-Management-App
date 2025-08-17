const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://classroom-management-app-99427-default-rtdb.firebaseio.com/"

});

const db = admin.firestore();

module.exports = db;
