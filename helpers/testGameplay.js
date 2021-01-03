import { gameplay } from "./gameplay";
import { startingBoard } from './startingBoard';

export function testGameplay(){

    function moveSuccess(){
        console.log('moveSuccess');
    }

    function winner(){
        console.log('winner');
    }

    gameplay("X", startingBoard, moveSuccess, false, winner);
}