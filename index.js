import firebase from 'firebase/app';
import 'firebase/firestore';

import { firebaseConfig } from "./helpers/firebaseConfig";
import { handleEmulators } from "./helpers/handleEmulators";
import { gameplay } from "./helpers/gameplay";
import { findGame } from './helpers/findGame';



document.addEventListener("DOMContentLoaded", event => {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    handleEmulators(db);
    //gameplay();

    //// EVENT LISTENERS
    document.getElementById('find-game').addEventListener('click', function(){
        findGame(db);
    });

});