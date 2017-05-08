
import * as firebase from "firebase";

class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyBKpI0LWNQT8ZFK0RdH7rEjfkZm7b9P1MM",
            authDomain: "prj-gog.firebaseapp.com",
            databaseURL: "https://prj-gog.firebaseio.com",
            storageBucket: "prj-gog.appspot.com"
        });
    }

}

module.exports = Firebase;
