export function findGame(db, firebase){

    var matches = db.collection("pending");

    var query = matches.where("player2", "==", null).limit(1);

    query.get()
    .then(function(querySnapshot){

        if (querySnapshot.empty){

            // CREATE NEW PENDING GAME //////////////
            console.log("No games found");
            var newGame = createGame(db, firebase);

            var unsubscribe = newGame.onSnapshot(function(doc){
                var progress = doc.data();

                if (progress.game != null){
                    // This is prevent new games from being created forever
                    console.log(progress.game);
                    unsubscribe();
                }

            })

        } else {

            // JOIN NEW PENDING GAME ///////////////
            console.log("A game was found! Joining it presently.");

            querySnapshot.forEach(function(doc) {

                let uid = firebase.auth().currentUser.uid;

                // CREATE A GAME DOC
                const game = db.collection("games").doc();
                game.set({
                    player1: doc.data().player1,
                    player2: uid
                })

                const gameID = game.id;

                doc.ref.update({
                    // I don't even think I need to put in player2 but whatevs
                  player2: uid,
                  game: gameID
                })


/* 
                var unsubscribe = doc.ref.onSnapshot(function(doc){
                    var pend = doc.data();

                    if (pend.game != null){
                        console.log(pend.game);
                        unsubscribe();
                    }
                }) */

            })

        }
    })
}

function createGame(db, firebase){
    
    let uid = firebase.auth().currentUser.uid;
    const gamesRef = db.collection("pending").doc();
    
    gamesRef.set({
      player1: uid,
      player2: null
    })

    return gamesRef;
}