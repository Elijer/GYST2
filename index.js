import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

import { firebaseConfig } from "./helpers/firebaseConfig";
import { handleEmulators } from "./helpers/handleEmulators";
import { findGame } from './helpers/findGame';
import { auth } from "./helpers/auth";
import { hide, show } from "./helpers/utility";
import { gameplay } from './helpers/gameplay';

import io from 'socket.io-client';


document.addEventListener("DOMContentLoaded", event => {

    const socket = io('http://localhost:3020');

    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    handleEmulators(db, firebase);
    auth(firebase, db);

    show("welcome");

    //// EVENT LISTENERS
    document.getElementById('find-game').addEventListener('click', function(){
        console.log("boop")
        findGame(db, firebase);
    });

});