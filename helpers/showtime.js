import { gameplay } from "./gameplay";
import { startingBoard } from './startingBoard';
import { hide, show, set, gg } from './utility';

export function showtime(player, gameRef, firebase, userRef){

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    
    // set up listener to see updates in game
    var unsubscribe = gameRef.onSnapshot(function(doc){
        let data = doc.data();

        if (data.winner == null){ // Game is carrying on
            console.log("nobody has won yet")

            if (player === "player1"){

                if (data.turn === 1){
                    gameplay("player1", startingBoard, winner, playerOne);
                } else if (data.turn % 2 != 0){
                    var boardParsed = JSON.parse(data.board);
                    gameplay("player1", boardParsed, winner, playerOne);
                }


            } else if (player === "player2"){

                if (data.turn === 1){
                    gameplay("player2", startingBoard, winner);
                } else if (data.turn %2 === 0){
                    var boardParsed = JSON.parse(data.board);
                    gameplay("player2", boardParsed, winner);
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

    function endGame(gameRef, playerName, userRef, won){

        hideGame();

        var welcomeMessage = gg("welcome-message");

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


    var hideGame = function(){

        hide([
            "matchmaking-loader",
            "message-content"
        ]);

        show([
            "welcome-message",
            "find-game",
            "welcome"
        ]);

        set("message-content", "");
    }






};