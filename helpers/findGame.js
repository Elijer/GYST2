export function findGame(db, firebase){

    var matches = db.collection("pending");

    var query = matches.where("player2", "==", null).limit(1);

    query.get()
    .then(function(querySnapshot){

        if (querySnapshot.empty){

            // CREATE NEW GAME //////////////
            console.log("No games found");
            var newGame = createGame(db, firebase);

            var unsubscribe = newGame.onSnapshot(function(doc){
                var progress = doc.data();

                if (progress.game != null){
                    // This is prevent new games from being created forever
                    unsubscribe();
                } else if (progress.player2 != null){

                    const game = db.collection("games").doc();

                    game.set({
                        player1: doc.data().player1,
                        player2: doc.data().player2
                    })

                    const gameID = game.id;

                    doc.ref.update({
                        game: gameID,
                    })

                }

            })

        } else {

            // JOIN NEW GAME ///////////////
            console.log("A game was found! Joining it presently.");

            querySnapshot.forEach(function(doc) {
                let uid = firebase.auth().currentUser.uid;
                doc.ref.update({
                  player2: uid
                })

                var unsubscribe = doc.ref.onSnapshot(function(doc){
                    var pend = doc.data();

                    if (pend.game != null){
                        console.log(pend.game);
                        unsubscribe();
                    }
                })

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