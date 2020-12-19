import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from "./helpers/firebaseConfig";
import { handleEmulators } from "./helpers/handleEmulators";
import { findGame } from './helpers/findGame';
import { auth } from "./helpers/auth";

    // IMPORTED FOR TESTING
    import { showtime } from './helpers/showtime';
    //import { gameplay } from "./helpers/gameplay";
    //import { startingBoard } from './helpers/startingBoard';


document.addEventListener("DOMContentLoaded", event => {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    handleEmulators(db);
    auth(firebase, db);
    //gameplay("player1", startingBoard);
    //showtime("player1");

    //// EVENT LISTENERS
    document.getElementById('find-game').addEventListener('click', function(){
        findGame(db, firebase);
    });

});