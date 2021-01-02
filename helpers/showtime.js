import { gameplay } from "./gameplay";
import { startingBoard } from './startingBoard';
import { gg, hide, set, show, clear} from "./utility";

export function showtime(player, gameRef, firebase, userRef){

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    
    // set up listener to see updates in game
    var unsubscribe = gameRef.onSnapshot(function(doc){
        let data = doc.data();

        if (data.winner == null){ // Game is carrying on
            console.log("nobody has won yet")

            if (player === "X"){

                if (data.turn === 1){
                    var newBored = JSON.stringify(startingBoard);
                    var newNewBored = JSON.parse(newBored);
                    gameplay("X", newNewBored, playerOne, true, winner);

                } else if (data.turn % 2 != 0){

                    var boardParsed = JSON.parse(data.board);
                    gameplay("X", boardParsed, playerOne, true, winner);
                    
                }


            } else if (player === "O"){

                if (data.turn === 1){

                    gameplay("O", startingBoard, playerTwo, false, winner);

                } else if (data.turn %2 === 0){

                    var boardParsed = JSON.parse(data.board);
                    gameplay("O", boardParsed, playerTwo, true, winner);

                }
            }

        } else { // Somebody won

            console.log("somebody won")
            unsubscribe();
            console.log("does this run?")

            if (player == data.winner){

                endGame(gameRef, player, userRef, true)

            } else {
                endGame(gameRef, player, userRef, false)
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

        var json = JSON.stringify(board);

        gameRef.update({
            turn: increment,
            board: json
        })


    }
    

    function winner(winner){

        gameRef.update({
            winner: winner
        })

    }


    function endGame(gameRef, playerName, userRef, won){

        endGameDisplay(won);

        userRef.set({
            game: null,
            pending: false,
            whichPlayer: null
        }, {merge: true})
        
        .then(function(){

            gameRef.delete().then(function(){
                console.log("Game over, document successfully deleted");
            })

        })
        
    }


    // This is a temporary function I am writing just to clean up endGame more easily
    function endGameDisplay(won){

        hide("game");
        clear("board");

        show("welcome");
        show("find-game") // Have to include this, as it's hidden by default
        hide("matchmaking-loader");

        if (won === true){
            set("welcome-message", "YOU WON!!! NICE! ...Think you can do it again?")
        } else {
            set("welcome-message", "Sorry, you lost. Press 'Find Game' to redeem yourself")
        }
    }









};