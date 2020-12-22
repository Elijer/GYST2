import { write } from "firebase-functions/lib/logger";

export function hide(t){
    document.getElementById(t).style.display = "none";
}

export function show(t, inline){
    if (inline === true){
        document.getElementById(t).style.display = "inline";
    } else {
        document.getElementById(t).style.display = "block";
    }
}

export function set(t){
    document.getElementById(t).innerHTML = t;
}