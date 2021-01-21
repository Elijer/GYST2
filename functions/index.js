const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

const { endsWith } = require('whimsy/lib/filters');


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

        var key = change.after.key;

        const beforeData = change.before.val(); // data before the write
        const afterData = change.after.val(); // data after the write

        if (afterData.online === false){
            let userRef = db.collection("players").doc(key);

            // Delete the game
            userRef.get().then(function(doc){
                data = doc.data();
                if (data.game){
                    let gameRef = db.collection("games").doc(data.game);
                    gameRef.delete();
                }
            }).then(function(){
                userRef.delete();
            })

        }

        return true;
})

/* exports.onUpdateTrigger = functions.firestore
  .document('players/{playerId}')
  .onUpdate((change, eventContext) => {

    // Document id of the updated document
    const documentId = eventContext.params.docId
    
    //const previousValue = change.before.data();
    const data = change.after.data();

    console.log(data);

    if (data.online === false){
        const gameRef = db.collection('games').doc(data.game);
        const playerRef = db.collection('players').doc(documentId);
        gameRef.delete();
        playerRef.delete();
    }
  
    return 0

}); */


/* exports.offline = functions.firestore
    .document('players/{playerID}')
    .onUpdate((snap, context) => {

        console.log("this is a test")

        data = snap.data();

        if (data.online === false){
            
            if (data.game){
                // If there is a game, delete it
                const gameRef = db.collection('games').doc(data.game);
                gameRef.delete().then(function(){
                    snap.delete();
                });
            }
        }

    }); */