import { showtime } from './showtime';
import { hide, show } from './utility';

export function findGame(db, firebase, database){

    let loop = waitingDisplay();

    let uid = firebase.auth().currentUser.uid;
    let userRef = db.collection("players").doc(uid);


    // Realtime database stuff
    let rtdRef = database.ref('/activePlayers/' + uid);

    rtdRef.set({
        online: true
    })

    // It's dumb, but apparently update takes keys value pairs as strings only
    rtdRef.onDisconnect().set({
        online: false
    })


    
    
    userRef.get()
    .then((doc) => {

        // Because merge is true, it will update the crucial fields of the document regardless of whether it exists or not
        userRef.set({
            game: null,
            whichPlayer: null,
            pending: true,
            online: true
        }, {merge: true}).then(function(){



            // stop loading the animateElipsis -- this should be run later, once a game is actually found.
            clearInterval(loop);

            // Run HTTPS function
            var findNewGame = firebase.functions().httpsCallable('findNewGame');
            findNewGame({whatever: "this doesn't matter"})
            .then(function(){
                console.log("Okay, ran an HTTP function I think.")

                // create listener on player to wait for a game ID
                var unsubscribe = userRef.onSnapshot(function(doc){
                    let data = doc.data();

                    if (data.game != null && data.pending == false){
                        
                        console.log("The game has been made and everything is good!!!");

                        let gameRef = db.collection("games").doc(data.game);

                        showtime(data.whichPlayer, gameRef, firebase, userRef);

                        hide("welcome");
                        show("game");
                        
                        unsubscribe();

                    }
                })
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