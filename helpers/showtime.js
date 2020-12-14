import { gameplay } from "./gameplay";
import { startingBoard } from './startingBoard';

export function showtime(player, gameRef){
    //console.log(`It's showtime!!! You are ${player} and the game ID is ${game}`);

    if (player === "player1"){
        console.log("Playing as player 1");
        gameplay("player1", startingBoard, playerOne);
    } else if (player === "player2"){
        console.log("Playing as player 2");

    }

    function playerOne(board){

        var unsubscribe = gameRef.onSnapshot(function(doc){
            let data = doc.data();
            console.log(data);
        })


/*         gameRef.get().then(function(doc){

            let data = doc.data();

            if (!data.turn){

                gameRef

                console.log("The game hasn't started yet. Let's start it.")
                console.log(data);
            } else {
                console.log("This game is in progress")

            }
        }) */

/*         var turns;

        if (data.turns === null){
            turns = 1
        } else {
            turns = data.turns + 1;
        } */

        // console.log(game.id); // This gives us the ID, which we could use to get the game.
        // But I'm going to try to figure out the difference between these different game objects

/*         game.update({
            //board: JSON.stringify(board),
            turns: turns
        }).then(function(){
            console.log("updated history");
        }) */
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
        console.log(gameRef);
        var unsubscribe = gameRef.onSnapshot(function(doc){
            var progress = doc.data();
            console.log("changes were made to the game");
        })
    }









};