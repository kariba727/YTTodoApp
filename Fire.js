import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKErAFpVutinYEjdPZZiMMbN8LuqlZXvc",
  authDomain: "yttodoapp-35971.firebaseapp.com",
  databaseURL: "https://yttodoapp-35971.firebaseio.com",
  projectId: "yttodoapp-35971",
  storageBucket: "yttodoapp-35971.appspot.com",
  messagingSenderId: "1085095905191",
  appId: "1:1085095905191:web:e256312e28f4ba380e9882",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];
      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
