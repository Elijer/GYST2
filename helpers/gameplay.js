export function gameplay(){

    var
    E = "",
    B = "X",
    W = "O",
    N = "N"
    
    var player1 = {
        color: B
    }
    
    var board = [
    
      [ E, E, E, E, E ],
      [ E, B, W, B, E ],
      [ E, W, N, W, E ],
      [ E, B, W, B, E ],
      [ E, E, E, E, E ]
    
    ];
    
    var selection = null;
    
    var options = [];
    
    var movePiece = function(pieceRow, pieceCol, destRow, destCol){
    
        var position = board[pieceRow][pieceCol];
      var destination = board[destRow][destCol];
    
      if (position){
        if (position === player1.color || position === N){
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
      straightWin(B, true);
      straightWin(B, false);
      descendingWin(B);
      ascendingWin(B);
    }
    
    function ascendingWin(target){
    
      var starts = [
        [1, 4],
        [0, 4],
        [1, 3],
        [0, 3]
      ]
    
      var count = 0;
    
      for (var i = 0; i < starts.length; i++){
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
            alert("You won!!")
          } else {
            starts[i][0]++;
            starts[i][1]--;
          }
    
        }
      }
    
    }
    
    function descendingWin(target){
    
      var starts = [
        [1, 0],
        [0, 0],
        [1, 1],
        [0, 1]
      ];
    
      var count = 0;
    
      for (var i = 0; i < starts.length; i++){
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
            alert("You won!!")
          } else {
            starts[i][0]++;
            starts[i][1]++;
          }
    
        }
      }
    
    }
    
    function straightWin(target, horizontal){
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