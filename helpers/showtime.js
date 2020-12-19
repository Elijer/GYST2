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
            endGame(gameRef, player, userRef)

            if (player == data.winner){
                alert("You Won!!")

            } else {
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

    function endGame(gameRef, playerName, userRef){
        userRef.update({
            game: null
        })

        gameRef.delete().then(function(){
            console.log("Game over, document successfully deleted");
        })
        // Delete Game
        // Delete game ref from player
        // Reset Dom
    }









};