import { showtime } from './showtime';

export function findGame(db, firebase){

    var matches = db.collection("pending");

    var query = matches.where("player2", "==", null).limit(1);

    query.get()
    .then(function(querySnapshot){

        if (querySnapshot.empty){

            // CREATE NEW PENDING GAME //////////////
            console.log("No games found");
            var newGame = createGame(db, firebase);

            var findGameButton = document.getElementById("find-game");
            findGameButton.style.display = "none";

            var welcomeMessage = document.getElementById("welcome-message");
            welcomeMessage.innerHTML = "Waiting for another player";
            //welcomeMessage.style.textAlign = "center";
            animateElipsis(welcomeMessage);

            var matchmakingLoader = document.getElementById("matchmaking-loader");
            matchmakingLoader.style.display = "block";


            var unsubscribe = newGame.onSnapshot(function(doc){
                var gameFound = doc.data();

                if (gameFound.game != null){

                    // This is the game that's been created by player2!
                    var game = gameFound.game;

                    showtime("player1", game);

                    // So we'll delete the "pending" document
                    doc.ref.delete();

                    // And shut down this listener.
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
                }).then(function(){

                    const gameID = game.id;

                    doc.ref.update({
                      game: gameID
                    }).then(function(){
                        showtime("player2", game);
                    })

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

function animateElipsis(target){

    var counter = 0;
    const interval = 650;

    setInterval(function(){
        target.innerHTML = target.innerHTML + ".";
        counter++;
        if (counter > 3){
            counter = 0;
            target.innerHTML = "Waiting for another player"
        }
    }, interval);




}