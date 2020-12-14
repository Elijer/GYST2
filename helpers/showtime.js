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
};

function playerOne(){
    console.log("Player one yadda yadda");

}