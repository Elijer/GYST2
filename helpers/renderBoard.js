export var renderBoard = function(board){

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
        tile.addEventListener("click", callback);
        
        // add this tile to the board
        document.getElementById("grid-container").appendChild(tile);

        }
    }
}