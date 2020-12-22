#Gameplay Refactor Notes

I am refactoring all of gameplay. Essentially I had a lot of callbacks and booleans as arguments, and the winner calculation took place in side of the gameplay() function, which isn't good, and so did a good deal of DOM manipulation. I'm going to go back through it and move stuff out that doesn't need to be there, like certain DOM manipulation, and I have figured out a way to write it so that there only needs to be a single callback, which has a "endgame" argument. It goes like this:

```if (callback){
    
    // the current player is the active player
    // Click listeners are loaded, and will run a callback that changes the board and initiates the next turn.

    if (endgame){
        // The current player won
        callback(true)
    } else {
        // the current player made a valid move
        callback(false)
    }
} else {

    // The current player is NOT the active player. Render the board, but the click listeners will only say("It's not your turn.")
    // They can only wait until the listener in showtime() returns their opponents move.
}```

Also, I would like to refactor the whole 'player1' 'player2', 'X', 'O' nonsense. We're just doing this everywhere: X: 'X', O: 'O'. At some point, I will phase out the actual text and it will link to bottlecap PNGs instead.

I also think that `winner()` should be a separate function from gameplay(), and it gets passed a board and recieves its own callbacks.

Which actually could change everything.

I guess the purest functional programming would dictate that gameplay() simply recieves the board, but with the piece movement this is kind of tricky.