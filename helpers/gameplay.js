import { E, X, O, N} from './startingBoard';
import { show, clear, gg } from "./utility";
import Xsrc from "../Bottlecaps/X.png";
import Osrc from "../Bottlecaps/O.png";
import Nsrc from "../Bottlecaps/N.png";

// Function that sets the game message when game events occur
var say = function(t){
  show("message");
  var target = document.getElementById("message");
  target.innerHTML = t;
}

export function gameplay(currentPlayer, board, callback, movementAllowed, winnerCallback){

  if (movementAllowed){
    say(`Your move! You are playing as ${currentPlayer}.`)
  } else {
    say(`You are playing as ${currentPlayer}. Waiting for other player to move.`)
  }

  // Specify which piece is used by the active player and which by opponent
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
  
  // Selection saves the tiles selected by player to make moves
  var selection = [];
  var selectionValue = false;
  var skipMode = false;

  var resetBoard = function(){
    renderBoard(false);
    skipMode = false;
    selectionValue = false;
    selection = [];
  }
  
  var validPiece = function(row, col){
    var pos = board[row][col];
    var valid = false;

    if (pos === game.activePlayer || pos === N){
      valid = true;
      say("You have selected a piece to move.")
    } else if (pos === E){
      say("That tile is empty.");
    } else {
      say("Hey...piece doesn't belong to you!");
    }

    return valid;
  }

  // Streamline the callback behavior
  var moved = function(board){
    //let gameOver = winner();
    // If !gameover...
    winner();
    callback(board);
  }

  var validMove = function(pieceRow, pieceCol, destRow, destCol){

    var success = false;

    if (board[destRow][destCol] != E){
      say("You can't move there.")
    } else {
      var position = board[pieceRow][pieceCol];
      var destination = board[destRow][destCol];
  
      var verticalRange = destRow - pieceRow;
      var horizontalRange = destCol - pieceCol;
  
      if (Math.abs(verticalRange) > 2 || Math.abs(horizontalRange) > 2){
    
        say("That destination is out of range");
  
      } else {
  
        if (Math.abs(horizontalRange) <= 1 && Math.abs(verticalRange) <= 1){
            say("You moved one square. Nice.");
              // board[destRow][destCol] = position
              // board[pieceRow][pieceCol] = E;
              success = true;
          //say("You may make multiple skip moves per turn, but only one normal move per turn.")
  
        } else {
  
          var h = horizontalRange / 2;
          var v = verticalRange / 2;
  
          if (h % 1 != 0 || v % 1 != 0){
            say("you can only skip other pieces on a true diagonal")
          } else {
            var intermediateSquare = board[pieceRow + v][pieceCol + h];
  
            if (intermediateSquare != E ){
                //say("You skipped over another piece.");
                say("Click again to confirm move, or continue skipping.");
                skipMode = true;
  
                // board[destRow][destCol] = position
                // board[pieceRow][pieceCol] = E;
  
                success = true;
  
            } else {
              say("That destination is too far away.")
            }
  
          }
  
        }
        
      }
    }

    return success;
  }

  // This function takes a the coords of a piece and the desired destination and:
    // 1) Determines whether it can move there
    // 2) Returns either false or true accordingly through 'success' variable
    // 3) If move is determined to be possible, changes the global board array to reflect the move.
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
                    //say("You skipped over another piece.");
                    say("You skipped over another piece! Skip again, or click again to end turn. ");

                    

                    board[destRow][destCol] = position
                    board[pieceRow][pieceCol] = E;
                    //
                    success = 'skip';
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
          const img = document.createElement('img');

          if (board[i][j] === X){
            img.src = Xsrc;
          } else if (board[i][j] === O){
            img.src = Osrc;
          } else if (board[i][j] === N){
            img.src = Nsrc;
          } else {
            // do nothing
          }
          img.classList.add("bottlecap")
          item.appendChild(img);
          //item.innerHTML = board[i][j];
    
          let row = i;
          let col = j;
  
          item.addEventListener("click", function(){
  
            //item.style.background = "pink";
            selection.push([row, col]);

    
            if (selection.length === 1){

              var valid = validPiece(row, col);

              if (valid){
                item.style.background = "pink";
                selectionValue = board[row][col];
              } else {
                selection = [];
              }

            } else if (selection.length === 2){

              // check that dest is empty
              if (board[row][col] != E){
                resetBoard();
                say("Oops! There's already a piece where you are trying to move.")

              } else {

                let valid = validMove(selection[0][0], selection[0][1], selection[1][0], selection[1][1]);
                if (valid){
                  if (skipMode === false){
                    // For moving a single tile, just go ahead and move it -- don't wait for confirmation.
                    board[  selection[0][0]]   [   selection[0][1]] = E;
                    board[  selection[1][0]]   [   selection[1][1]] = selectionValue;
                    selection = [];
                    skipMode = false;
                    // Lock board and send board back through callback
                    renderBoard(true);
                    moved(board);

                  } else {
                    // Wait for confirmation on a skip tile.
                    item.style.background = "orange";
                  }
                } else {
                  resetBoard();
                }

              }

              // was a valid destination selected? If so:
                // add to selection array
                // highlight dest with new bg color
                // tell player "Move is valid. click again to confirm."
                // was it a skip move? If so, set global "skip" variable to true
              // if not:
                // clear selection
                // clear any bg colors
                // tell player why this isn't a valid move

            } else if (selection.length > 2){
              
              // confirm move
              var current = selection[selection.length - 1];
              var last = selection[selection.length - 2]
              var initial = selection[0];
              if (current.toString() === last.toString()){
                if (initial.toString() === current.toString()){
                 say("You can't waste your turn skipping back to the same tile.")
                 resetBoard();
                 
                } else {

                  say("Cool, you moved!")
                  board[  initial[0]]  [initial[1]  ] = E;
                  board[  current[0]]  [current[1]  ] = selectionValue;
                  selection = [];
                  selectionValue = false;
                  skipMode = false;
                  // Lock board and send board back through callback
                  renderBoard(true);
                  moved(board);
                }

              } else {
                valid = validMove(last[0], last[1], current[0], current[1]);
                if (valid){
                  item.style.background = "orange";
                } else {
                  resetBoard();
                }
              }
            

              // Does selection[1] === selection[2]? If so, change board data to reflect this and re-render board
              // if selection[1] != selection[2], is global skip variable true?
                // if not, cancel selection. selection = [], get rid of any bg colors, tell player something
                // If yes, check to see if slection[1] to selection[2] is a valid skip move.
                  // if so highlight background and give user message "click last tile of selection to confirm skip move"
                  // if not, cancel selection


/*               var successfulMove = movePiece(selection[0][0], selection[0][1], row, col);
              console.log(successfulMove);
              selection = [];

              if (successfulMove === true){

                let gameOver = winner();

                if (!gameOver){
                  renderBoard(true);
                  callback(board);
                }
              } else {
                renderBoard(false);
              } */

            } /* else  if (selection > 2){
              // If skip variable is false, cancel
              // otherwise, run the basically the same as selection == 2
              // since everything is the same, there is probably a way to get rid of this conditional
            } */
          })
  
          document.getElementById("board").appendChild(item);
  
        }
      }
      
      //say("Your Move!")

    } else {

      for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++){
    
          const item = document.createElement('div');
          item.className = "sq";
          item.id = "sq" + i + j;
          item.innerHTML = board[i][j];

          const img = document.createElement('img');

          if (board[i][j] === X){
            img.src = Xsrc;
          } else if (board[i][j] === O){
            img.src = Osrc;
          } else if (board[i][j] === N){
            img.src = Nsrc;
          } else {
            // do nothing
          }
          img.classList.add("bottlecap")
          item.appendChild(img);

          item.addEventListener("click", function(){
            say("Sorry, it's not your turn yet.")
          })
  
          document.getElementById("board").appendChild(item);
  
        }
      }
    }
    winner();
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
      highlightWinner(game.activePlayer)
      winnerCallback(game.activePlayer, board);
      return true;
    } else if (e || f || g || h){
      highlightWinner(game.opponent)
      //winnerCallback(game.opponent, board)
      return true;
    } else {
      return false;
    }

  }

  var highlightWinner = function(player){
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++){

        if(board[i][j] === player){
          var item = gg(`sq${i}${j}`);
          item.style.background = "orange";
        }

      }
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