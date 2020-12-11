export function findGame(db, firebase){

    var matches = db.collection("pending");

    var query = matches.where("player2", "!=", null).limit(1);

    query.get()
    .then(function(querySnapshot){
        console.log(querySnapshot);
        if (querySnapshot.empty){
            console.log("No games found");

            createGame(db, firebase);

        } else {
            console.log("NOt empty");
            querySnapshot.forEach(function(doc) {
                console.log(doc.data());
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

}