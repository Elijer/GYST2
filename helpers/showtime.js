import { gameplay } from "./gameplay";
import { startingBoard } from './startingBoard';

export function showtime(player, gameRef, firebase, userRef){

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    
    // set up listener to see updates in game
    var unsubscribe = gameRef.onSnapshot(function(doc){
        let data = doc.data();

        if (data.winner == null){ // Game is carrying on

            if (player === "player1"){

                if (data.turn === 1){
                    gameplay("player1", startingBoard, playerOne, true, winner);
                } else if (data.turn % 2 != 0){
                    var boardParsed = JSON.parse(data.board);
                    gameplay("player1", boardParsed, playerOne, true, winner);
                }


            } else if (player === "player2"){

                if (data.turn === 1){
                    gameplay("player2", startingBoard, playerTwo, false, winner);
                } else if (data.turn %2 === 0){
                    var boardParsed = JSON.parse(data.board);
                    gameplay("player2", boardParsed, playerTwo, true, winner);
                }
            }

        } else { // Somebody won

            unsubscribe();

            if (player == data.winner){
                endGame(gameRef, player, userRef, true)
                alert("You Won!!")

            } else {
                endGame(gameRef, player, userRef, false)
                alert("Sorry bruh. You lost this one.")

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

    function endGame(gameRef, playerName, userRef, won){

        let spinner = document.getElementById("matchmaking-loader");
        spinner.style.display = 'none';

        let msg = document.getElementById("message-content");
        msg.style.innerHTML = "";
        msg.style.display = "none";

        var welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.style.display = "block";

        var messageContent = document.getElementById("message-content");
        messageContent.style.display = "none";

        // hide the find-game button
        var findGameButton = document.getElementById("find-game");
        findGameButton.style.display = "block";

        // Make sure loading stuff is hidden
        var welcome = document.getElementById("welcome");
        welcome.style.display = "block";

        if (won == true){
            welcomeMessage.innerHTML = "Nice win! Think you can do it again?"
        } else {
            welcomeMessage.innerHTML = "Condolences. Press 'Find Game' to redeem yourself";
        }

        userRef.update({
            game: null,
            winner: null,
            pending: false,
            whichPlayer: null
        }, {merge: true})

        gameRef.delete().then(function(){
            console.log("Game over, document successfully deleted");
        })
        // Delete Game
        // Delete game ref from player
        // Reset Dom
        var findGameButton = document.getElementById("find-game");
        findGameButton.style.display = "block";
        document.getElementById("grid-container").innerHTML = "";
        
    }









};