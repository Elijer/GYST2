const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
const cors = require('cors')({origin: true});

const { endsWith } = require('whimsy');


//17 minutes into this https://fireship.io/lessons/the-ultimate-beginners-guide-to-firebase/

exports.findGame = functions.https.onCall (async(data, context) => {

    /* Woah it's kinda weird that I'm getting two documents. Shouldn't I be passing the current user into the https function
    and then just getting one document (the newest one)? I dont see why two docs wouldn't work, but it might be janky if a lot of people are
    doing this at once.

    Also, I'll have to add the createdAt field for this to work properly.

    While I'm at it, I should probably add the same field to the game.

    Then I can created a function that runs once a day (I think this is okay), and clears out any players or games that were created at least
    24 hours ago or something.

    I looked this up, and it looks like Firebase recommends that you 'Schedule Functions" using pubsub.

    Keep this in mind: Each scheduluer job costs 10 cents a month, although there is an allowance of three free obs per month per google account.
    */

    // New queryRef
    const queryRef = admin.firestore().collection('players').where("pending", "==", true).orderBy("createdAt", "desc").limit(2);

    // Old queryRef
    //const queryRef = admin.firestore().collection('players').where("pending", "==", true).limit(2);

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

exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun((context) => {

    console.log('This will be run every day');

    const yesterday = new Date(today)

    //yesterday.setDate(yesterday.getDate() - 1)
    //yesterday.setDate(yesterday.getDate())

    const queryRef = admin.firestore().collection('players').where("createdAt", ">", yesterday);

    queryRef
    .get()
    .then(async function(querySnapshot) {
        var batch = db.batch();

        querySnapshot.forEach(function(doc) {
            // For each doc, add a delete operation to the batch
            batch.delete(doc.ref);
        });

        batch.commit();

    }).then(function(){
        console.log("Batch delete is complete!")
    })

    return null;
});

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