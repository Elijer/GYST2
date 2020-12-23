import { E, X, O, N} from './startingBoard';
import { hide, show, set} from "./utility";
import { renderBoard } from "./renderboard";

// Show the messages
show("message");
/* hide("welcome"); */

export function gameplay2(board){

    // Helper function that writes user message according to gameplay
    var say = function(t){
        var target = document.getElementById("message");
        target.innerHTML = t;
    }

    var renderBoard = function(callback){

        // delete previous board to make room for new one
        document.getElementById("board").innerHTML = "";
    
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++){
        
                const item = document.createElement('div');
                item.className = "sq";
                item.id = "sq" + i + j;
                item.innerHTML = `<div class = "inner-sq">${board[i][j]}</div>`
        
                let row = i;
                let col = j;
        
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

    renderBoard();

}