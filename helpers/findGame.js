export function findGame(db, firebase){

    var matches = db.collection("pending");

    var query = matches.where("player2", "==", null).limit(1);

    query.get()
    .then(function(querySnapshot){

        if (querySnapshot.empty){

            // CREATE NEW GAME //////////////
            console.log("No games found");
            var newGame = createGame(db, firebase);
            newGame.onSnapshot(function(doc){
                console.log(doc.data());
            })

        } else {

            // JOIN NEW GAME ///////////////
            console.log("A game was found! Joining it presently.");

            querySnapshot.forEach(function(doc) {
                let uid = firebase.auth().currentUser.uid;
                doc.ref.update({
                  player2: uid
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