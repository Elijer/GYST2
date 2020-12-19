import { showtime } from './showtime';

export function findGame(db, firebase){

    let uid = firebase.auth().currentUser.uid;
    let userRef = db.collection("players").doc(uid);
    //let pendingRef = db.collection("pending").doc(uid);
    userRef.get()
    .then((doc) => {

        if (doc.exists){

            console.log("document already exists");

        } else {

            console.log("document don't exist. Gon make it and set the game field as null. The cloud will do the rest.");
            userRef.set({
                game: null,
                pending: true
            }).then(function(){
                // create listener on player to wait for a game ID
                var unsubscribe = userRef.onSnapshot(function(doc){
                    let data = doc.data();
                    if (data.game != null){

                        console.log("a game exists now!!")

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

function animateElipsis(target){

    var counter = 0;
    const interval = 650;

    var loop = setInterval(function(){
        target.innerHTML = target.innerHTML + ".";
        counter++;
        if (counter > 3){
            counter = 0;
            target.innerHTML = "Waiting for another player"
        }
    }, interval);

    return loop;

}

function hideFindGameStuff(){
    
    // hide the find-game button
    var findGameButton = document.getElementById("find-game");
    findGameButton.style.display = "none";

    // Make sure loading stuff is hidden
    var welcome = document.getElementById("welcome");
    welcome.style.display = "none";

}

/*     query.get()
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
            var loop = animateElipsis(welcomeMessage);

            var matchmakingLoader = document.getElementById("matchmaking-loader");
            matchmakingLoader.style.display = "block";


            var unsubscribe = newGame.onSnapshot(function(doc){
                var gameFound = doc.data();

                if (gameFound.game != null){

                    // This is the game that's been created by player2!
                    var game = gameFound.game;
                    var gameRef = db.collection("games").doc(game);

                    showtime("player1", gameRef, firebase);

                    // So we'll delete the "pending" document
                    
                    newGame.delete(); // But this is deleting the game, and that's no good.

                    // And cancel the ellipses loop used while looking for a game
                    clearInterval(loop);

                    // And make the loading stuff is hidden in general
                    var welcome = document.getElementById("welcome");
                    welcome.style.display = "none";

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
                    player2: uid,
                    turn: 1
                }).then(function(){

                    const gameID = game.id;

                    doc.ref.update({
                      game: gameID
                    }).then(function(){

                        hideFindGameStuff();

                        showtime("player2", game, firebase);
                    })

                })
            })
        }
    }) */