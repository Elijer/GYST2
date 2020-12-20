const functions = require('firebase-functions');

const admin = require('firebase-admin');
const { endsWith } = require('whimsy/lib/filters');
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
                            whichPlayer: 'player1'
                        });
    
                        t.update(p2, {
                            pending: false,
                            game: game.id,
                            whichPlayer: 'player2'
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





// Graveyard:

/* 
            var player1ID = querySnapshot.docs[0].id;
            var player2ID = querySnapshot.docs[1].id;

            var player1 = db.collection("players").doc(player1ID);
            var player2 = db.collection("players").doc(player2ID);

            console.log(player1.data()); */



            // serverside transactions: cloud functions
            // Two big differences:
            // 1. Document locking instead of optimistic concurrency (perfect!)
            // 2. Full-blown queries can be done during the read part of a transaction! Yay!

            // Read before writes (no queries...?)
            // No side-effects halfway through. Put that on the completion block
            // Transactions will fail if you are offline
            // Limit of writing to 500 documents at a time

            // creating game
            // updating player1's doc as pending: false, with game: n
            // updated player2's doc as pending: false with game: n

            // It sounds like a transaction is good here, because it will check that the pending state isn't being changed by another transaction

  /*           if (querySnapshot.size === 2){

                var player1 = querySnapshot.docs[0].id;
                var player2 = querySnapshot.docs[1].id;
                
                var gameRef = admin.firestore().collection('games').doc()
                
                gameRef.set({
                    turn: 1,
                    winner: null,
                    player1: player1,
                    player2: player2
                })

                console.log(gameRef.id); */
/*                 console.log("we can make a game")

                // Get player IDs
                var player1 = querySnapshot.docs[0].id;
                var player2 = querySnapshot.docs[1].id;

                // Create new Game doc using player IDs
                var gameRef = admin.firestore().collection('games').doc().set({
                    turn: 1,
                    winner: null,
                    player1: player1,
                    player2: player2
                }).then(function(){

                    // Now update each player to set pending to false and add the new game ID
                    // If pending doesn't get set to false, they will keep getting paired!!
                    var count = 1;
                    querySnapshot.forEach(function(doc){

                        let playerRef = admin.firestore().collection('players').doc(doc.id);

                        playerRef.set({
                            pending: false,
                            game: gameRef.id,
                            whichPlayer: "player" + count
                        }), {merge:true}

                        count++;

                    })

                }) */
