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
                gameplay("player1", startingBoard, playerOne);
            } else if (data.turn % 2 != 0){
                var boardParsed = JSON.parse(data.board);
                gameplay("player1", boardParsed, playerOne);
                //

                // get the current board
                // run gameplay with current board
            }

        } else if (player === "player2"){

            if (data.turn %2 === 0){
                var boardParsed = JSON.parse(data.board);
                gameplay("player2", boardParsed, playerTwo);
                //gameplay("player2", data.board, playerTwo);
                // get current board
                // run gameplay with current board
            }
        }
    });

    function playerOne(board){
        
        var json = JSON.stringify(board);

        gameRef.update({
            turn: increment,
            board: json
        })

        //showtime("player2", gameRef, firebase);
        //
        
    }

    function playerTwo(board){

        var json = JSON.stringify(board);

        gameRef.update({
            turn: increment,
            board: json
        })


    }









};