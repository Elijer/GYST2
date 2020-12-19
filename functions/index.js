const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.newPendingPlayer = functions.firestore
    .document('players/{playerId}')
    .onCreate(event => {

        //const docId = event.params.productId;
        //const pendingRef = admin.firestore().collection('pending').doc(docId);
        const queryRef = admin.firestore().collection('players').where("pending", "==", true).limit(2);

        queryRef
        .get()
        .then(function(querySnapshot) {

            if (querySnapshot.size === 2){
                console.log("we can make a game")
            } else {
                console.log("we cannot yet make a game")
            }

/*             querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            }); */
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        
        // If I don't do this I get an error
        return true;
    })

/* exports.createGame = functions.firestore
    .document('pending/{pendingId}')
    .onCreate(event => {

        const docId = event.params.productId;

        // name being an example of a field of the newly created document
        const name = event.data.data().name;

        const productRef = admin.firestore().collection('products').doc(docId);

        return productRef.update({ message: 'Nice ${name}! - Love Cloud Functions'});

    }); */

//17 minutes into this https://fireship.io/lessons/the-ultimate-beginners-guide-to-firebase/

