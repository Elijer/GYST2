import { showtime } from './showtime';

export function findGame(db, firebase){

    let loop = waitingDisplay();

    let uid = firebase.auth().currentUser.uid;
    let userRef = db.collection("players").doc(uid);
    //let pendingRef = db.collection("pending").doc(uid);
    userRef.get()
    .then((doc) => {

        // Because merge is true, it will update the crucial fields of the document regardless of whether it exists or not
        userRef.set({
            game: null,
            whichPlayer: null,
            pending: true
        }, {merge: true}).then(function(){

            // stop loading the animateElipsis -- this should be run later, once a game is actually found.
            clearInterval(loop);

            // Run HTTPS function
            var findNewGame = firebase.functions().httpsCallable('findNewGame');
            findNewGame({whatever: "this doesn't matter"})
            .then(function(){
                console.log("Okay, ran an HTTP function I think.")

                // create listener on player to wait for a game ID
/*                 var unsubscribe = userRef.onSnapshot(function(doc){
                    let data = doc.data();

                    if (data.game != null && data.pending == false){

                        let gameRef = db.collection("games").doc(data.game);

                        showtime(data.whichPlayer, gameRef, firebase, userRef);

                        hideFindGameStuff();
                        unsubscribe();

                    }
                }) */
            })
        })
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

function hideFindGameStuff(){
    
    // hide the find-game button
    var findGameButton = document.getElementById("find-game");
    findGameButton.style.display = "none";

    // Make sure loading stuff is hidden
    var welcome = document.getElementById("welcome");
    welcome.style.display = "none";

}

function waitingDisplay(){

    var findGameButton = document.getElementById("find-game");
    findGameButton.style.display = "none";

    var welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.innerHTML = "Waiting for another player";
    //welcomeMessage.style.textAlign = "center";
    var loop = animateElipsis(welcomeMessage);

    var matchmakingLoader = document.getElementById("matchmaking-loader");
    matchmakingLoader.style.display = "block";

    return loop;

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