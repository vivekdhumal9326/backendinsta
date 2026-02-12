import admin from "firebase-admin";
import serviceAccount from "../instagram-followers-9326-firebase-adminsdk-fbsvc-e9ebc4100b.json" with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://instagram-followers-9326-default-rtdb.firebaseio.com"
});

const db = admin.database();

export default db;
