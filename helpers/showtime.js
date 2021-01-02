import { gameplay } from "./gameplay";
import { startingBoard } from './startingBoard';
import { gg, hide, set, show } from "./utility";

export function showtime(player, gameRef, firebase, userRef){

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    
    // set up listener to see updates in game
    var unsubscribe = gameRef.onSnapshot(function(doc){
        let data = doc.data();

        if (data.winner == null){ // Game is carrying on
            console.log("nobody has won yet")

            if (player === "X"){

                if (data.turn === 1){

                    gameplay("X", startingBoard, playerOne, true, winner);
                    endGameDisplay(true)

                } else if (data.turn % 2 != 0){
                    var boardParsed = JSON.parse(data.board);
                    gameplay("X", boardParsed, playerOne, true, winner);
                }


            } else if (player === "O"){

                if (data.turn === 1){
                    gameplay("O", startingBoard, playerTwo, false, winner);
                } else if (data.turn %2 === 0){
                    var boardParsed = JSON.parse(data.board);
                    gameplay("O", boardParsed, playerTwo, true, winner);
                }
            }

        } else { // Somebody won

            console.log("somebody won")
            unsubscribe();
            console.log("does this run?")

            if (player == data.winner){

                endGame(gameRef, player, userRef, true)

            } else {
                endGame(gameRef, player, userRef, false)
            }
        }

    });

    function playerOne(board){
        
        var json = JSON.stringify(board);

        gameRef.update({
            turn: increment,
            board: json
        })
        
    }

    function playerTwo(board){

        var json = JSON.stringify(board);

        gameRef.update({
            turn: increment,
            board: json
        })


    }
    

    function winner(winner){

        gameRef.update({
            winner: winner
        })

    }



    // This is a temporary function I am writing just to clean up endGame more easily
    function endGameDisplay(won){

        hide("game");
        show("welcome");
        show("find-game");
        hide("matchmaking-loader");

        if (won === true){
            set("welcome-message", "Nice win! Think you can do it again?")
        } else {
            set("welcome-message", "Condolences. Press 'Find Game' to redeem yourself")
        }
/*         let spinner = document.getElementById("matchmaking-loader");
        spinner.style.display = 'none';
        let msg = gg("message");
        hide("message");
        msg.innerHTML = "";
        var welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.style.display = "block";

        var messageContent = document.getElementById("message");
        messageContent.style.display = "none";

        // hide the find-game button
        var findGameButton = document.getElementById("find-game");
        findGameButton.style.display = "block";

        // Make sure loading stuff is hidden
        var welcome = document.getElementById("welcome");
        welcome.style.display = "block";

        if (won === true){
            welcomeMessage.innerHTML = "Nice win! Think you can do it again?"
        } else {
            welcomeMessage.innerHTML = "Condolences. Press 'Find Game' to redeem yourself";
        }

        console.log('endgame display'); */
    }




    function endGame(gameRef, playerName, userRef, won){

        let spinner = document.getElementById("matchmaking-loader");
        spinner.style.display = 'none';
        

        let msg = gg("message");
        hide("message");
        msg.innerHTML = ""

        var welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.style.display = "block";

        var messageContent = document.getElementById("message");
        messageContent.style.display = "none";

        // hide the find-game button
        var findGameButton = document.getElementById("find-game");
        findGameButton.style.display = "block";

        // Make sure loading stuff is hidden
        var welcome = document.getElementById("welcome");
        welcome.style.display = "block";

        if (won === true){
            alert("You won!")
            welcomeMessage.innerHTML = "Nice win! Think you can do it again?"
        } else {
            alert("Sorry bruh, you lost.")
            welcomeMessage.innerHTML = "Condolences. Press 'Find Game' to redeem yourself";
        }

        var findGameButton = document.getElementById("find-game");
        findGameButton.style.display = "block";
        var gameBoard = document.getElementById("grid-container").innerHTML = "";      

        userRef.set({
            game: null,
            pending: false,
            whichPlayer: null
        }, {merge: true}).then(function(){

            gameRef.delete().then(function(){
                console.log("Game over, document successfully deleted");
            })

        })
        
    }









};