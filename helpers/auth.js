import whimsy from 'whimsy';

export function auth(firebase, db){

  // RELEVANT DOM ELEMENTS
  var login = document.getElementById("login");
  var loginState = document.getElementById("login-state");
  var username = document.getElementById("username");

  var logout = document.getElementById("logout");
  var loader = document.getElementById("loader")

  // FIND GAME BUTTON
  const findGameButton = document.getElementById("find-game");

  // CHANGE USERNAME
  username.addEventListener('keydown', limitUsernameInput);
  username.addEventListener('focus', changeUsername(firebase, db), true);

  // SET USER PERSISTENCE SETTING
    // LOCAL:   Persists in browser unless signed out.
    // SESSION: Auth state ends when tab or window is closed.
    // NONE:    Not saved in browser. Cleared on page refresh.
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  var signedInOnce = false;

  // LISTEN FOR CHANGES IN AUTH (login, logout, etc)
  firebase.auth().onAuthStateChanged(function(user) {
    disp("loading");
    if (user) {

      const userRef = db.collection("players").doc(user.uid);

      userRef.get().then(function(doc) {
        let name = doc.data().name;
        disp("in", name);
      })

      signedInOnce = true;

      // If user is signed in, then the find game button can be displayed.
      findGameButton.style.display = "inline";
      // This is for testing only, and allows the findGameButton to be clicked as soon as it is available.
      //findGameButton.click();
      //

    } else {
      disp("out");
      findGameButton.style.display = "none";

      // This checks to see if user has logged out and then in again. If not,
      // It can be assumed that they are getting to the page for the first time.
      // I want the user to be logged in by default so that they don't need to do so manually,
      // Unless they CHOSE to log out to begin with. For some reason.
      // It might very well make sense to just get rid of the login button completely
      // And make the whole process more automatic.
        if (signedInOnce === false){
            anonLogin(firebase, db);
        }

    }
  });

  // LOGIN
  loginState.addEventListener('click', function(){
    anonLogin(firebase, db);
  });

  // LOGOUT
  logout.addEventListener('click', function(){
    signOut(firebase);
  });

  // DISPLAY
  var disp = function(i, user){
    switch(i){
      case "loading":
        loader.style.display = "block";
        login.style.display = "none";
        logout.style.display = "none";
        break;

      case "in":
        loader.style.display = "none";
        logout.style.display = "inline";
        login.style.display = "inline";
        // login-inviz and the timeout is to animate a fade
        login.classList.add("login-inviz");
        setTimeout(() => {
          loginState.innerHTML = 'logged in as '
          username.innerHTML = user;
          loginState.classList.remove("login-go");
          //login.innerHTML = `logged in as ${user}`;
          login.classList.remove("login-inviz");
        }, 220);
        
        break;

      case "out":
        // login-inviz and the timeout is to animate a fade
        login.classList.add("login-inviz");
        setTimeout(() => {
          login.classList.remove("login-inviz");
          loginState.innerHTML = "login";
          username.innerHTML = "";
          loginState.classList.add("login-go");
        }, 220);
        loader.style.display = "none";
        login.style.display = "inline";
        logout.style.display = "none";
        break;
    }
  }

}

// LOG IN AS ANONYMOUS USER WITH FIREBASE AUTH
function anonLogin(firebase, db){

  firebase.auth().signInAnonymously()
  .then(result => {
    const user = result.user;
    name(user.uid, db)
    //console.log(user.uid + "signed in");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  })
  
}

// LOG OUT WITH FIREBASE AUTH
function signOut(firebase){

  firebase.auth().signOut()
  .then(result => {
    console.log("signed out");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  })
  
}

function name(uid, db){
  let name =  whimsy('{{adjective}} {{noun}}');

  const userRef = db.collection("players").doc(uid);
  userRef.set({
    uid: uid,
    name: name,
    pending: false,
    game: null,
    whichPlayer: null
  }, {merge:true})
}


function limitUsernameInput(e){

  let leng = username.innerHTML.length;
  let charLimit = 20;

  if (leng > charLimit && e.keyCode != 8 || e.key === "Enter"){
    e.preventDefault();
  }

}


function changeUsername(firebase, db){

  let original = username.innerHTML;

  // When user clicks away from the username, THEN whatever changes they made are saved to DB
  username.addEventListener('blur', (event) => {

    let newOne = username.innerHTML;

    if (newOne.length < 3){s
      alert("Username has to be at least 3 characters");
      username.innerHTML = original;
    }

    let uid = firebase.auth().currentUser.uid;
    const userRef = db.collection("players").doc(uid);
    
    userRef.set({
      name: newOne
    }, {merge: true})
  })
}

// HERE is a function that is not yet used. The idea is, if a user logs off or something,
// Any pending games they have need to be cleared. So does their user object, because that's
// How anonymous auth works; you cannot log back in.
function clearGamesWithUid(firebase, db){

    let uid = firebase.auth().currentUser.uid;
    var query = matches.where("player1", "===", uid).limit(1);

    query.get()
    .then(function(querySnapshot){
        console.log(querySnapshot);
        if (querySnapshot.empty){
            console.log("No games to delete");
        } else {

            console.log("Games found to delete");

            var batch = db.batch();

            querySnapshot.forEach(function(doc) {
                doc.delete().then(function(){
                    console.log("document successfully deleted");
                })
            })
        }
    })

}