import { E, X, O, N} from './startingBoard';
import { hide, show, set} from "./utility";

// Show the messages
show("message-content");
show("message");

var say = function(t){
    var target = document.getElementById("message-content");
    target.innerHTML = t;
  }

export function gameplay2(){

}