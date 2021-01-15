import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/auth';

import { firebaseConfig } from "./helpers/firebaseConfig";
import { handleEmulators } from "./helpers/handleEmulators";
import { findGame } from './helpers/findGame';
import { auth } from "./helpers/auth";
import { hide, show } from "./helpers/utility";

import { testGameplay } from "./helpers/testGameplay"


document.addEventListener("DOMContentLoaded", event => {

    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    var database = firebase.database();

    handleEmulators(db, firebase, database);
    auth(firebase, db);
    

    //// TESTING///
    hide("welcome");
    testGameplay();
    ////////////////



    //// Uncomment the following: 
    /*     show("welcome");
    //// EVENT LISTENERS
    document.getElementById('find-game').addEventListener('click', function(){
        console.log("boop")
        findGame(db, firebase, database);
    }); */



    

});