import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

import { firebaseConfig } from "./helpers/firebaseConfig";
import { handleEmulators } from "./helpers/handleEmulators";
import { findGame } from './helpers/findGame';
import { auth } from "./helpers/auth";

    // IMPORTED FOR TESTING
    import { showtime } from './helpers/showtime';
    import { gameplay } from './helpers/gameplay';
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

    gameplay('player1', startingBoard, callback, true, winnerCallback);

    //handleEmulators(db, firebase);
    //auth(firebase, db);
    //gameplay("player1", startingBoard);
    //showtime("player1");

    //// EVENT LISTENERS
    document.getElementById('find-game').addEventListener('click', function(){
        findGame(db, firebase);
    });

});