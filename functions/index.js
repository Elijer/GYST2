const functions = require('firebase-functions');

const admin = require('firebase-admin');
const { endsWith } = require('whimsy/lib/filters');
admin.initializeApp(functions.config().firebase);

//17 minutes into this https://fireship.io/lessons/the-ultimate-beginners-guide-to-firebase/


exports.findNewGame = functions.https.onCall (async(data, context) => {
    matchMaker();
    return true;
})


function matchMaker(){

        const queryRef = admin.firestore().collection('players').where("pending", "==", true).limit(2);

        queryRef
        .get()
        .then(function(querySnapshot) {

            if (querySnapshot.size === 2){
                console.log("we can make a game")

                // First we have to create a game ref to call later.
                var gameRef = admin.firestore().collection('games').doc()

                // Then we make sure the player docs are set to 'pending:false' to make sure no other games are created
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

                // We can now asynchronously create the game
                var player1 = querySnapshot.docs[0];
                var player2 = querySnapshot.docs[1];

                gameRef.set({
                    turn: 1,
                    winner: null,
                    player1: player1.id,
                    player2: player2.id
                }, {merge: true});





/* 
                var player1 = querySnapshot.docs[0];
                var player2 = querySnapshot.docs[1]; */

/*                 var count = 1;
                querySnapshot.forEach(function(doc){
                    console.log(doc.id);
                }) */

/*                 var gameRef = admin.firestore().collection('games').doc().set({
                    turn: 1,
                    winner: null,
                    player1: player1.id,
                    player2: player2.id
                }, {merge: true}) */
                
/*                 .then(() => {
                    console.log("yo")

                var count = 1;
                    querySnapshot.forEach(function(doc){
                        console.log("snapshot");
                        let playerRef = admin.firestore().collection('players').doc(doc.id);
                        playerRef.set({
                            pending: false,
                            game: gameRef.id
                        }), {merge:true}
                    })
                }) */


                //////////


                // create game docRef
/*                 let gameRef = admin.firestore().collection('games').doc().set({
                    turn: 1,
                    winner: null,
                    player1: player1.id,
                    player2: player2.id
                }, {merge:true}).then(function(){

                    let count = 1;

                    querySnapshot.forEach(function(doc){
                        let playerRef = admin.firestore().collection('players').doc(doc.id);
    
                        playerRef.set({
                            pending: false,
                            game: gameRef.id,
                            whichPlayer: 'player' + count,
                        }, {merge: true})
    
                        count++;
                    })

                }) */

            } else {
                console.log("we cannot yet make a game: only one player is pending.")
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

