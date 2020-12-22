import { E, X, O, N} from './startingBoard';
import { hide, show, set} from "./utility";

// Show the messages
show("message-content");
show("message");

export function gameplay2(board){

    console.log(board);

    // Helper function that writes user message according to gameplay
    var say = function(t){
        var target = document.getElementById("message-content");
        target.innerHTML = t;
    }

}