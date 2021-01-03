# GYST
A game somewhere between tic-tac-toe and checkers. DISCLAIMER: I did not create the concept for this game, but I am the sole programmer of this repository. A friend of mine name Walter Dintman came up with the concept and created a physical boardgame before commissioning me to create it.

# Parcel.js
To start, run the following command: `parcel index.html`. Make sure that an `index.js` is linked in the index.html and that file will be used as an entry point for all js files. Parcel allows you to use ES6 module syntax or a bunch of other stuff including SCSS, which it just accepts automatically. All you need to do is name a file SCSS and it will pase it for you.

# Firebase
Firebase is a google suite that essentially aids in fast development by bundling a bunch of (relatively) easy to use tools together, like hosting, local testing, a choice of 2 databases, storage, etc. Nice to have it all in one place. In order to use this project, you actually need to do the following:
* Have or make a project on [firebase](http://console.firebase.google.com/)
* Activate firestore on that project (just go to the firestore tab on the left sidebar)
* Press the gear next to `Project Overview` on the top left > project settings, scroll down, and copy that firebaseConfig var. Paste it into helpers/firebaseConfig.js. You're now hooked up to the firestore database on your own firebase project

# Firebase Modules
It's possible to load Firebase using script tags, and this is how I started out using it. In some ways it is easier. However, in this project, I am loading `firebase` and `firebase/firestore` using NPM modules.

* [Firebase](https://www.npmjs.com/package/firebase)
* [Firebase/Firestore](https://www.npmjs.com/package/@firebase/firestore)

# Firebase Emulators
The Firebase Commandline Tools (CLI) can be installed here: [firebase-tools](https://www.npmjs.com/package/firebase-tools). The Firebase CLI can do a bunch of different things, mostly focused on getting your project started more quickly, but for this starter kit I am only using the firestore emulator. Firestore is a database in the firebase suite, and the firebase emulator allows you to use firestore locally. However, a special snippet of code (unfortunately) must be including in your project in order for firebase to know it should be talking to the local, emulated database, and NOT the production version on the cloud. This snippet is located in `helpers/handleEmulators.js` in the form of an importable function. Basically what it does is check to see if the site is hosted locally as a test, and if so it points it to the emulators.

# User Presence System (In Development)
For an online game, it is important to monitor the state of each player's connection. I obviously can't just assume both players are online. One player's device could shut down, or their browse could be closed. They could also get up and leave, leaving the other player hanging for a while, and this is all information I can use to make the playing experience smoother. Here are the metrics I want to monitor:
1. Connection/disconnection
2. Logout
3. Inactivity timer (2 minutes)

**Bonus**
4. Internet connection reliability measurement

### 1. Connection Disconnection
I am going to be using the firebase Realtime Database (RTD). After some research, I found that RTD has a feature that firebase doesn't; it can report on the status of the connection with the database. I also found out that Socket.io is probably what I would use if I WASN'T using cloud functions for my backend, but they make it pretty impossible to use socket.io and I don't want to configure/setup a separate node instance in addition to the one I already have, so it makes sense to give RTD a shot as an alternative to running my own websocket. Don't let me down now firebase.

#### Here is the first choice:
1. Add 'online: true' to each game document by default
2. Add 'online: true' to each player document by default

#### Progress:
Whenever a player disconnects, the player object is updated with online: false. Where I go from there is yet to be determined.



# Summary
Run `npm test` and `npm run ems`, and then go to `localhost:1234` (or whatever port Parcel.js prints in the console in the event that 1234 is being used already). You should see your project there! Now go to `localhost:4000` and press on `Firestore emulator`. You should see a collection and a document in there.

I didn't install the firebase hosting functionality from the CLI, so if you want to deploy this, you will need to run `firebase init` and select the `hosting` line using spacebar. If you decide to do that and test it for production, then you can just run `firebase deploy` and it will host it live online for you to see what that looks like. You can then head to `http://console.firebase.google.com/` to check out the production database.