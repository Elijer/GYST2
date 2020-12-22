import { E, X, O, N} from './startingBoard';
import { hide, show, set} from "./utility";

// Show the messages
show("message-content");
show("message");

export function gameplay2(board){

    var renderBoard = function(){

        // clear previous board
        document.getElementById("grid-container").innerHTML = "";
        
        // Iterate through positions in board[][] array.
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++){
            
            // create a tile
            const tile = document.createElement('div');
            
            // make tile referenceable
            tile.className = "sq";
            tile.id = "sq" + i + j;
            tile.innerHTML = board[i][j];
            
            let row = i;
            let col = j;
            
            // add a click listener to each tile
            tile.addEventListener("click", function(){
    
                tile.style.background = "orange";
        
                if (!selection){
                selection = [row, col];
                } else {
                var successfulMove = movePiece(selection[0], selection[1], row, col);
                console.log(successfulMove);
                //
    
                if (successfulMove === true){
    
                    let gameOver = winner();
    
                    if (!gameOver){
                    renderBoard(true);
                    callback(board);
                    }
                } else {
                    selection = null;
                    renderBoard(false);
                }
                }
            })
            
            // add this tile to the board
            document.getElementById("grid-container").appendChild(tile);
    
            }
        }
    }

    // Helper function that writes user message according to gameplay
    var say = function(t){
        var target = document.getElementById("message-content");
        target.innerHTML = t;
    }

    renderBoard();

}