import { E, X, O, N, boardColors} from './startingBoard';
import { hide, show, set} from "./utility";

// Show the messages
show("message");
/* hide("welcome"); */

export function gameplay2(board, callback){

    // Helper function that writes user message according to gameplay
    var say = function(t){
        var target = document.getElementById("message");
        target.innerHTML = t;
    }

        // Set the player's piece
    if (currentPlayer === "player1"){
        var currentPlayer = {
        color: X,
        name: 'player1'
        }

        var opponent = {
        color: O,
        name: 'player2'
        }

    } else {

        var currentPlayer = {
        color: O,
        name: 'player2'
        }

        var opponent = {
        color: X,
        name: 'player2'
        }

    }



    var renderBoard = function(){

        // delete previous board to make room for new one
        document.getElementById("board").innerHTML = "";
    
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++){
        
                const item = document.createElement('div');
                item.className = "sq";
                item.id = "sq" + i + j;
                //item.style.background = boardColors[i][j];
                item.innerHTML = board[i][j];
        
                let row = i;
                let col = j;
                
                // Add click behavior
                item.addEventListener("click", function(){

                    if (callback){

                        callback();
                    } else {
                        console.log("board is locked");
                    }

                })
        
                document.getElementById("board").appendChild(item);
        
            }
        }
        
        say("Your Move!")

    }

    renderBoard(board);

}