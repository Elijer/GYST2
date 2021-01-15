export var
E = " ",
X = "X",
O = "O",
N = "N";

export var startingBoard = [
    
    [ E, E, E, E, E ],
    [ E, X, O, X, E ],
    [ E, O, E, O, E ],
    [ E, X, O, X, E ],
    [ X, E, E, X, E ]
  
];

// For testing
/* export var startingBoard = [
    
    [ X, E, E, E, E ],
    [ E, X, O, E, E ],
    [ E, O, X, O, E ],
    [ E, E, O, E, E ],
    [ E, E, E, X, E ]
  
]; */

var r = "#d3919a",
  b = "#7faccb",
  y = "#ffeb74",
  w = "#e0deda";

export var boardColors = [
  [ b, y, b, y, b ],
  [ y, r, w, r, y ],
  [ b, w, y, w, b ],
  [ y, r, w, r, y ],
  [ b, y, b, y, b ]
]



  /*
  
var
E = " ",
X = "X",
O = "O",
N = "N";

var startingBoard = [
    
    [ E, E, E, E, E ],
    [ E, X, O, X, E ],
    [ E, O, N, O, E ],
    [ E, X, O, X, E ],
    [ E, E, E, E, E ]
  
  ];

  var json = JSON.stringify(startingBoard);

  console.log(JSON.parse(json));

  */