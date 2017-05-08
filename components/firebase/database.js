/**
 * @class Database
 */

import * as firebase from "firebase";

class Database {

    static sendMessage(text) {

        let messagePath = "message";

        return firebase.database().ref(messagePath).push({
            text: text,
            createdAt: Date.now()
        })
    }

    static listenMessage(callback) {
        this.messageRef = firebase.database().ref('message/refuserId');
        this.messageRef.limitToLast(5).on('child_added', (data) => {
            callback(data.val())
        });
    }

    static setUserMobile(userId, mobile, name) {

        let userMobilePath = "/user/" + userId + "/details";

        return firebase.database().ref(userMobilePath).set({
            mobile: mobile,
            name: name
        })
    }

    /**
     * Listen for changes to a users mobile number
     * @param userId
     * @param callback Users mobile number
     */
    static listenUserMobile(userId, callback) {

        let userMobilePath = "/user/" + userId + "/details";

        firebase.database().ref(userMobilePath).on('value', (snapshot) => {

            var mobile = "";

            if (snapshot.val()) {
                mobile = snapshot.val().mobile
            }

            callback(mobile)
        });
    }

}

module.exports = Database;
