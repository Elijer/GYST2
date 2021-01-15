import { E, X, O, N} from './startingBoard';
import { hide, show, set, clear} from "./utility";

export function gameplay(currentPlayer, board, callback, movementAllowed, winnerCallback){

  console.log(board);


  var say = function(t){
    show("message");
    var target = document.getElementById("message");
    target.innerHTML = t;
  }

  // Set the player's piece
  var game = {};
  if (currentPlayer === "X"){

    game = {
      activePlayer: X,
      opponent: O
    }

  } else {

    game = {
      activePlayer: O,
      opponent: X
    }
      
  }
  
  // Selection saves the first piece that is selected
  // When I add in the possibility of multiple skips, I will probably need to also add in an additional 'destination' array
  var selection = null;
  var skips = null;
  
  var movePiece = function(pieceRow, pieceCol, destRow, destCol){

    var success = false;
  
    var position = board[pieceRow][pieceCol];
    var destination = board[destRow][destCol];
  
    if (position){
      if (position === game.activePlayer || position === N){
        console.log("this is your piece, good");
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
                //
                success = true;
  
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
                    //
                    success = true;
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

    return success;
  }
    
    
  var renderBoard = function(locked){

    clear("board");

    if (locked === false){

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
  
          document.getElementById("board").appendChild(item);
  
        }
      }
      
      say("Your Move!")

    } else {

      for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++){
    
          const item = document.createElement('div');
          item.className = "sq";
          item.id = "sq" + i + j;
          item.innerHTML = board[i][j];

          item.addEventListener("click", function(){
            say("Sorry, it's not your turn yet.")
          })
  
          document.getElementById("board").appendChild(item);
  
        }
      }
    }
    //winner();
  }
  
  var winner = function(){

    let a = straightWin(game.activePlayer, true);
    let b = straightWin(game.activePlayer, false);
    let c = descendingWin(game.activePlayer);
    let d = ascendingWin(game.activePlayer);

    let e = straightWin(game.opponent, true);
    let f = straightWin(game.opponent, false);
    let g = descendingWin(game.opponent);
    let h = ascendingWin(game.opponent);

    if (a || b || c || d){
      winnerCallback(game.activePlayer);
      return true;
    } else if (e || f || g || h){
      winnerCallback(game.opponent)
      return true;
    } else {
      return false;
    }

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
          //alert("You won!! ascending")
          return true;
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
          //alert("You won!! descending")
          return true;
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
          //alert("X's have won!!!");
          return true;
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
  
  // Renderboard for start of game
  if (movementAllowed == true){
    renderBoard(false);
  } else {
    renderBoard(true);
  }

}