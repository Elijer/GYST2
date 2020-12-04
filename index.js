import firebase from 'firebase/app';
import 'firebase/firestore';

import { firebaseConfig } from "./helpers/firebaseConfig";
import { handleEmulators } from "./helpers/handleEmulators";
import { gameplay } from "./helpers/gameplay";



document.addEventListener("DOMContentLoaded", event => {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    handleEmulators(db);


    // Local Emulators Test
    var citiesRef = db.collection("firestore-collection");
    citiesRef.doc("firestore-documsent").set({
        name: "Some document", state: "VA", country: "USsssZZZZsA?",
        capital: false,
        ridesBicycles: "sure",
        regions: ["west_coast", "norcal"]
    });

});