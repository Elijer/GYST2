import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

import { firebaseConfig } from "./helpers/firebaseConfig";
import { handleEmulators } from "./helpers/handleEmulators";
import { findGame } from './helpers/findGame';
import { auth } from "./helpers/auth";
import { hide, show } from "./helpers/utility";

    // IMPORTED FOR TESTING
    import { showtime } from './helpers/showtime';
    import { gameplay } from './helpers/gameplay';
    import { gameplay2 } from './helpers/gameplay2';
    import { startingBoard, E, X, O, N } from './helpers/startingBoard';


document.addEventListener("DOMContentLoaded", event => {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    var callback = function(){
        console.log("This is a callback");
    }

    var winnerCallback = function(name){
        console.log("This is the winner callback, printing the name of the winner: " + name);
    }
    
    hide("loader");
    hide("welcome-message");
    gameplay2(startingBoard);

    handleEmulators(db, firebase);
    auth(firebase, db);
    //gameplay("player1", startingBoard);
    //showtime("player1");

    //// EVENT LISTENERS
/*     document.getElementById('find-game').addEventListener('click', function(){
        findGame(db, firebase);
    }); */

});