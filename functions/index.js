const functions = require('firebase-functions');

/* var serviceAccount = {
    "type": "service_account",
    "project_id": "gyst-93a6d",
    "private_key_id": "f0dd52c2660956f9bfe6c30f54482509fe811b31",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBUIE9/GhbxnEf\nnx4dPfC9HPv8BFQ/BIzOkfljBncA25m29KLUDwSXQRmNx27qlMxOox8inPSIbKbY\nJ4/ylmSeDgUPhWzKOQ79TeaUsvDQl4KpAnKTNa0/CtSvnkvHhcfioYVov7qGk3oh\nKIebD6baOmokxuh0+igT53tHLP1McZ/fZwqKEIggCvy1abEmlZfoSHIXMF6uNLHi\nevkBoQruAcs9BKzv99gFtXZFw9eCMucHKnj8rsFJslacvteKPQQfGE5QmocWFr2y\n2s5vjBvNn6m2Bv1qo6eIK8ZbRU1PjQaZ1ARHLBWrdChTSVMw6HXXwZmffgWrsVP9\ntmVx4vE/AgMBAAECggEAN8rGyj+HVPl0W6Z+N/1Q9huf5C/RqrBi/RlnKvvKK761\nYfa/6cj9z7OTrvYgnmZcgtOUYFaBQsBs9NSSOHbMSkuMjVq6N7D5EQVDJ6ZvVxxr\nMuEIdVEYE6pKEPd0Mnz7X/6y9LTlHgMBTAGZBZkiVDhouv2HSH+MQpZb34JuBnoC\nKHLc1r1/KoNtUDJQXZj1cnsebHdz8FRXRB3nSQc7tY3fJI2FRTXgrZuAIGJz315e\njzUm/0XKJAWtBieGOhueOviMfk4PjAVEXP0i4P1p97QO5iIB1NA5666oGqHmWjc/\nt+HcaVXPN4fEthUGWHWv8F0exo8YUCsrxtwPkPXX3QKBgQDmOqbtKZ3oEMlv+tX3\nv15uAVagkOtQaATa5AXWXeDQytHkP9uFM7l46Zud9sne78bpcCGxzcy75HdEGPmR\nmcwxXasuU8rHAS5U0wTvMKhGQkVGXsF75BI88Q5fpljZISmE+rk55oPOLMsXJsaP\nSBcMqLe7NrXUFncdAHvIjH2b/QKBgQDW9Arlb9h3r474TNEKtqOKkuFgDlyZt5wW\nksKyVJ7jYHh8UuZyE+RCfbd+IQu2GyNin+j9QviazmrUGHKJsQv6rnCy1UNBquFh\nSOXPkiabjcaB+wqTq9P2eLVWLVWF5zc3HJ+UyOJcvU4zCF0NV3FKInwCx/WAoMy4\ngFIHWiPA6wKBgEK4wsG+qt2jZ82FI1duZX558tILzbZ6vtV0+eAbStkXvmZov0TG\nLb1F7myEJhLu6HWkoo819lyJpKrelg1FRjEUVVTSwdSUmgnJMgfj0RCzigIP2gD+\nou54adL8kYkznCXGx8Fo9c/dmWn3OdoyaUOo7b5a5600aYbFKhp/5LM9AoGBAMvJ\nChuC8cJmWjDlAroZdOqHXcvnUbsZ640rDhJrT0dZymBzZ653VUwES9X0FlpLWDzE\nRer1dyOs1nLFyrDnfOfoQUgKD31ON+Y3akhj0t5ehvfrvJdLq+Rbg+9zg0Uzc5F4\nPYKdAJ3TizOulilz4R/bmZ45XHLZ/7xbS2lU99iJAoGBAOFDzu//Yx61aFBRxYCa\nQ8PdonhISru1eeUt8hbE2B5WtsnIna0S7VDL8Q2jPwX9UKtBy1gppW2lMHkzsglQ\nXP/npStSfJ//2di9FYzLBBfacpf18BPGtqB4G5RPpgJXtBl4khmoAz57yk8ha0PH\noHZevjzgS8gA84/vV04JmqJy\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-tk0e1@gyst-93a6d.iam.gserviceaccount.com",
    "client_id": "111707611175776184980",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tk0e1%40gyst-93a6d.iam.gserviceaccount.com"
} */


/* admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gyst-93a6d.firebaseio.com"
}); */

const admin = require('firebase-admin');
const { endsWith } = require('whimsy/lib/filters');

// So I need this...
admin.initializeApp(functions.config().firebase);


//17 minutes into this https://fireship.io/lessons/the-ultimate-beginners-guide-to-firebase/

exports.findNewGame = functions.https.onCall (async(data, context) => {

    const queryRef = admin.firestore().collection('players').where("pending", "==", true).limit(2);

    queryRef
    .get()
    .then(async function(querySnapshot) {


        if (querySnapshot.size === 2){
            
            console.log("Yooo")
            // Collect all data and refs before calling transaction
            var player1id = querySnapshot.docs[0].id;
            var player2id = querySnapshot.docs[1].id;

            var game = admin.firestore().collection('games').doc()
            game.set({
                player1: null,
                player2: null,
                winner: null,
                turn: 1
            }).then(async () => {
                try {
                    await admin.firestore().runTransaction(async (t) => {
                        const p1 = await admin.firestore().collection('players').doc(player1id)
                        const p2 = await admin.firestore().collection('players').doc(player2id)
    
                        t.update(p1, {
                            pending: false,
                            game: game.id,
                            whichPlayer: 'X'
                        });
    
                        t.update(p2, {
                            pending: false,
                            game: game.id,
                            whichPlayer: 'O'
                        })
    
                        t.update(game, {
                            player1: p1.id,
                            player2: p2.id
                        })
    
                    })
                    console.log("Transaction Success")
                } catch (e) {
                    console.log("Transaction failure:", e)
                }
            })
        }

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    return true;
})


exports.disconnection = functions.database.ref('/activePlayers/{pushId}')
    .onUpdate((change, context) => {

        const beforeData = change.before.val(); // data before the write
        const afterData = change.after.val(); // data after the write

        if (afterData.online === false){
            let userRef = db.collection("players").doc(afterData.uid);

            userRef.set({
                online: false
            })

        }

        return true;
})