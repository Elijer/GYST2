export function hide(t){
    if (typeof t === 'string'){
        document.getElementById(t).style.display = "none";
    } else if (Array.isArray(t)){
        for (var i = 0; i < t.length; i++){
            document.getElementById(t[i]).style.display = "none";
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