const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//17 minutes into this https://fireship.io/lessons/the-ultimate-beginners-guide-to-firebase/

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

                    // Immediately Remove description of player as pending
                    // so that it doesn't come up in future queries
                    playerRef.update({
                        pending: false
                    })

                    // Check to see if this is the first doc in the querySnapshot or the second
                    if (count === 0){

                        // Add player one to the gameRef
                        gameRef.set({
                            player1: doc.id
                        }, {merge: true})
                        count++;

                    } else {

                        // Add player two to the gameRef
                        gameRef.set({
                            player2: doc.id
                        }, {merge: true})

                    }

                    // Finally, add a reference to the game in the playerRef
                    playerRef.set({
                        game: gameRef.id
                    }, {merge: true})

                });


            } else {
                console.log("we cannot yet make a game: only one player is pending.")
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        
        // If I don't do this I get an error
        return true;
    })

