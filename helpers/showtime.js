import { gameplay } from "./gameplay";
import { startingBoard } from './startingBoard';

export function showtime(player, gameRef, firebase){

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    
    // set up listener to see updates in game
    var unsubscribe = gameRef.onSnapshot(function(doc){
        let data = doc.data();

        if (player === "player1"){
        
            if (data.turn === 1){
                gameplay("player1", startingBoard, playerOne, data.turn);
            } else if (data.turn % 2 != 0){


                // get the current board
                // run gameplay with current board
            } else if (data.turn %2 === 0){
                // lock the board: You can't move right now!
            }

        } else if (player === "player2"){

            if (data.turn %2 === 0){
                // get current board
                // run gameplay with current board
            } else {
                // lock the board! You can't move right now
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
        console.log(gameRef);
        var unsubscribe = gameRef.onSnapshot(function(doc){
            var progress = doc.data();
            console.log("changes were made to the game");
        })
    }









};