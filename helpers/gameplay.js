import { E, X, O, N} from './startingBoard';

export function gameplay(currentPlayer, board){

  var target = document.getElementById("message");
  target.style.display = "block";

  // Set the player's piece
  if (currentPlayer === "player1"){
    var currentPlayer = {
      color: X
    }
  } else {
    var currentPlayer = {
      color: O
    }
  }
    
  var selection = null;
  
  var movePiece = function(pieceRow, pieceCol, destRow, destCol){
  
      var position = board[pieceRow][pieceCol];
    var destination = board[destRow][destCol];
  
    if (position){
      if (position === currentPlayer.color || position === N){
          if (destination === E){
        
          var verticalRange = destRow - pieceRow;
          var horizontalRange = destCol - pieceCol;
  
          if (Math.abs(verticalRange) > 2 || Math.abs(horizontalRange) > 2){
  
            say("That destination is out of range");
  
          } else {
  
            if (Math.abs(horizontalRange) <= 1 && Math.abs(verticalRange) <= 1){
              say("You moved one square. Nice!");
                board[destRow][destCol] = position
                board[pieceRow][pieceCol] = E;
  
            } else {
  
              var h = horizontalRange / 2;
              var v = verticalRange / 2;
  
              if (h % 1 != 0 || v % 1 != 0){
                say("you can only skip other pieces on a true diagonal")
              } else {
                var intermediateSquare = board[pieceRow + v][pieceCol + h];
  
                if (intermediateSquare != E ){
                    say("You skipped over another piece.");
                    board[destRow][destCol] = position
                    board[pieceRow][pieceCol] = E;
                } else {
                  say("That destination is too far away.")
                }
  
              }
  
            }
            
          }
          
              } else {
            say("Oops! A piece is already there.")
        }
      } else {
          say("Hey...piece doesn't belong to you!");
      }
    } else {
      say("piece is not defined at " + pieceRow + " " + pieceCol);
    }
  }
    
    //movePiece(2, 2, 0, 0);
    
    
  var renderBoard = function(){
  
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++){
  
        const item = document.createElement('div');
        item.className = "sq";
        item.id = "sq" + i + j;
        item.innerHTML = board[i][j];
  
        let row = i;
        let col = j;
  
        item.addEventListener("click", function(){
  
          item.style.background = "orange";
  
          if (!selection){
            console.log(board);
            selection = [row, col];
          } else {
  
            movePiece(selection[0], selection[1], row, col);
            selection = null;
            document.getElementById("grid-container").innerHTML = "";
            renderBoard();
  
          }
  
        })
  
        document.getElementById("grid-container").appendChild(item);
      }
    }
    winner();
  }
    
  var winner = function(){
    straightWin(X, true);
    straightWin(X, false);
    descendingWin(X);
    ascendingWin(X);
  }
    
  function ascendingWin(target){
    // When the X's ascend 4 in a row from around the bottom left to the top right
    // I've put comments into this one to explain it since it's kind bonkers.
    // descending win is a mirror-image of this function.
  
    var starts = [
      [1, 4],
      [0, 4],
      [1, 3],
      [0, 3]
    ]
  
    var count = 0;
  
    for (var i = 0; i < starts.length; i++){ //iterate through possible starting coords
      count = 0; // Count has to be reset every time a new starting point is considered
      for (var j = 0; j < 4; j++){ //probe for 4 consecutive positions with the player's piece
        if (board
  
          [starts[i][0]] // first position in a start coord
          [starts[i][1]] // second position in a start coord
  
            === target){
  
          count++;
          
        } else {
          count = 0; // if that coord doesn't have the player's type (x or o), then start the count over.
          // (a count of 4 validates in a row)
        }
  
        if (count === 4){
          alert("You won!! ascending")
        } else {
          // if this coord is of the player's type, then keep moving up and left until i is 3 (must be <4 in loop definition)
          starts[i][0]++;
          starts[i][1]--;
        }
  
      }
    }
  
  }
    
  function descendingWin(target){
    // When the X's descend 4 in a row from around the top right towards the bottom left
  
    var starts = [
      [1, 0],
      [0, 0],
      [1, 1],
      [0, 1]
    ];
  
    var count = 0;
  
    for (var i = 0; i < starts.length; i++){
      count = 0; // Count has to be reset every time a new starting point is considered
      for (var j = 0; j < 4; j++){
        if (board
  
          [starts[i][0]]
          [starts[i][1]]
  
            === target){
  
          count++;
          
        } else {
          count = 0;
        }
  
        if (count === 4){
          alert("You won!! descending")
        } else {
          starts[i][0]++;
          starts[i][1]++;
        }
  
      }
    }
  
  }
    
  function straightWin(target, horizontal){
    // Describes a win that is either horizontal or vertical
    var count = 0;
  
    for (var i = 0; i < 5; i++){
      for (var j = 0; j < 5; j++){
  
        if (horizontal === true){
          if (board[j][i] === target){
            count++;
          } else {
            count = 0;
          }
        } else {
          if (board[i][j] === target){
            count++;
          } else {
            count = 0;
          }
        }
  
        if (count === 4){
          alert("X's have won!!!");
        }
  
      }
  
    }
  }
    
  var dir = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];
    
  renderBoard();
    
  var say = function(t){
    var target = document.getElementById("message-content");
    target.innerHTML = t;
  }

}