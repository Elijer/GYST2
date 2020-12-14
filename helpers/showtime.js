import { gameplay } from "./gameplay";
import { startingBoard } from './startingBoard';

export function showtime(player, game){
    //console.log(`It's showtime!!! You are ${player} and the game ID is ${game}`);

    if (player === "player1"){
        console.log("Playing as player 1");
        gameplay("player1", startingBoard, playerOne);
    } else if (player === "player2"){
        console.log("Playing as player 2");

    }

    function playerOne(board){
        console.log(game);
/*         var lastHistory = game.data().history;
        var newHistory;

        if (lastHistory === null){
            newHistory = [board];
        } else {
            newHistory = lastHistory.push(board);
        }

        game.update({
            history: newHistory
        })

        var unsubscribe = game.onSnapshot(function(doc){
            var progress = doc.data();
            console.log(progress);
        }) */
    }

    function playerTwo(board){
        console.log(game);
        var unsubscribe = game.onSnapshot(function(doc){
            var progress = doc.data();
            console.log("changes were made to the game");
        })
    }









};