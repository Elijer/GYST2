const functions = require('firebase-functions');

const admin = require('firebase-admin');
const { endsWith } = require('whimsy/lib/filters');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

//17 minutes into this https://fireship.io/lessons/the-ultimate-beginners-guide-to-firebase/

/* exports.newPendingPlayer = functions.firestore
    .document('players/{playerId}')
    .onCreate(event => {
        matchmaker();
        return true;
    }) */

exports.findNewGame = functions.https.onCall (async(data, context) => {
    console.log("attempted HTTPS function")
    return true;
})


function matchmaker(){

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

                    // Immediately Remove description of player as pending
                    // so that it doesn't come up in future queries
                    playerRef.update({
                        pending: false
                    })

                    gameRef.set({
                        turn: 1
                    }, {merge: true})

                    // Check to see if this is the first doc in the querySnapshot or the second
                    if (count === 0){

                        // Add player one to the gameRef
                        gameRef.set({
                            player1: doc.id,
                        }, {merge: true})

                        playerRef.set({
                            game: gameRef.id,
                            whichPlayer: 'player1'
                        }, {merge: true})

                        count++;

                    } else {

                        // Add player two to the gameRef
                        gameRef.set({
                            player2: doc.id,
                        }, {merge: true})

                        playerRef.set({
                            game: gameRef.id,
                            whichPlayer: 'player2'
                        }, {merge: true})

                    }

                });


            } else {
                console.log("we cannot yet make a game: only one player is pending.")
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

