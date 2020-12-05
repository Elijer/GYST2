export function findGame(db){
    var matches = db.collection("pending");
    var query = matches.where("player2", "!=", null).limit(1);

    query.get()
    .then(function(querySnapshot){
        console.log(querySnapshot);
        if (querySnapshot.empty){
            console.log("No games found");
        } else {
            console.log("NOt empty");
            querySnapshot.forEach(function(doc) {
                console.log(doc.data());
            })
        }
    })
}