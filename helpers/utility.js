export function hide(t){
    if (typeof t === 'string'){
        document.getElementById(t).style.display = "none";
    } else if (Array.isArray(t)){
        for (var i = 0; i < t.length; i++){
            document.getElementById(t[i]).style.display = "none";
        }
    }
}

export function clear(t){
    if (typeof t === 'string'){
        document.getElementById(t).innerHTML = "";
    } else if (Array.isArray(t)){
        for (var i = 0; i < t.length; i++){
            document.getElementById(t[i]).style.display = "";
        }
    }
}

export function show(t, displayType){

    if (!displayType){
        displayType = "block";
    }

    if (typeof t === 'string'){
        document.getElementById(t).style.display = displayType;
    } else if (Array.isArray(t)){
        for (var i = 0; i < t.length; i++){
            document.getElementById(t[i]).style.display = displayType;
        }
    }
}

export function set(t, html){
    document.getElementById(t).innerHTML = html;
}

export function gg(d){
    return document.getElementById(d);
}

export var immutableArray = function(arr){
    var returnedArray = [];

    for (var i = 0; i < arr.length ; i++){
        returnedArray[i] = arr[i];
    }

    return returnedArray;

}