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
                let gameRef = admin.firestore().collection('games').doc();
                var count = 0;

                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    let playerRef = admin.firestore().collection('players').doc(doc.id);

                    playerRef.update({
                        pending: false
                    })

                    if (count === 0){

                        gameRef.set({
                            player1: doc.id
                        }, {merge: true})
                        count++;

                    } else {

                        gameRef.set({
                            player2: doc.id
                        }, {merge: true})

                    }

                    playerRef.set({
                        game: gameRef.id
                    }, {merge: true})

                });


            } else {
                console.log("we cannot yet make a game")
            }
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

