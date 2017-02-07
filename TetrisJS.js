var Piece = {
    //todo: reformat style as name isn't needed.
    "square": {
        "name": "square",
        "color": "green",
        "mapping": [
            ["0", "0", "0", "0"],
            ["0", "X", "X", "0"],
            ["0", "X", "X", "0"],
            ["0", "0", "0", "0"]
        ]
    },
    "line": {
        "name": "line",
        "color": "red",
        "mapping": [
            ["X", "0", "0", "0"],
            ["X", "0", "0", "0"],
            ["X", "0", "0", "0"],
            ["X", "0", "0", "0"]
        ]
    },
    "t": {
        "name": "t",
        "color": "yellow",
        "mapping": [
            ["0", "X", "0", "0"],
            ["X", "X", "X", "0"],
            ["0", "0", "0", "0"],
            ["0", "0", "0", "0"]
        ]
    },
    "z": {
        "name": "z",
        "color": "violet",
        "mapping": [
            ["X", "X", "0", "0"],
            ["0", "X", "X", "0"],
            ["0", "0", "0", "0"],
            ["0", "0", "0", "0"]
        ]
    },
    "reverseZ": {
        "name": "reverseZ",
        "color": "indigo",
        "mapping": [
            ["0", "X", "X", "0"],
            ["X", "X", "0", "0"],
            ["0", "0", "0", "0"],
            ["0", "0", "0", "0"]
        ]
    },
    "L": {
        "name": "L",
        "color": "blue",
        "mapping": [
            ["X", "0", "0", "0"],
            ["X", "0", "0", "0"],
            ["X", "X", "0", "0"],
            ["0", "0", "0", "0"]
        ]
    },
    "reverseL": {
        "name": "reverseL",
        "color": "lightblue",
        "mapping": [
            ["0", "X", "0", "0"],
            ["0", "X", "0", "0"],
            ["X", "X", "0", "0"],
            ["0", "0", "0", "0"]
        ]
    },
    "getRandom": function(){
        var NUM_PIECES = 7;
        var rand = Math.floor( Math.random() * NUM_PIECES );
        switch( rand ) {
            case 0:
                return Piece.square;
            case 1:
                return Piece.line;
            case 2:
                return Piece.t;
            case 3:
                return Piece.z;
            case 4:
                return Piece.reverseZ;
            case 5:
                return Piece.L;
            case 6:
                return Piece.reverseL;
        }
    },

    "rotateClockwise": function() {
        //stub
        console.log("rotate clockwise");
    },
    "rotateCounterClockwise": function() {
        //stub
        console.log("rotate counter clockwise");
    },
}

class Grid {
    constructor() {
        console.log("creating Grid class");
        this.NUM_COLS = 15;
        this.NUM_ROWS = 30;
        this.map = this.makeGrid( this.NUM_ROWS, this.NUM_COLS );
        this.moveGrid = this.makeGrid( this.NUM_ROWS, this.NUM_COLS );
    }

    makeGrid( NUM_ROWS, NUM_COLS ){
        console.log("making grid");
        var grid = new Array( NUM_ROWS );
        for( var i = 0; i < NUM_ROWS; i++ ) {
            //zeroed out grid of 30y 15x
            grid[i] = new Array( NUM_COLS );
            for( var k = 0; k < NUM_COLS; k++ ) {
                grid[i][k] = "0";
            }
        }
        console.log("made grid: ", grid);
        return grid;
    }

    clearGrid( grid ) {
        for( var y = 0; y < this.NUM_COLS; y++ ) {
            for( var x = 0; x < this.NUM_ROWS; x++ ) {
                grid[y][x] = 0;
            }
        }
        return grid;
    }

    addPieceToGrid( grid, piece ) {
        this.clearMoveGrid();
        for( var i = 0; i < 4; i++ ) {
            for( var k = 0; l < 4; k++ ) {
                grid[piece.location.y+i][piece.location.x+k] = piece.block[i][k];
            }
        }
        return grid;
    }

    static updateGrid( ) {
        for( var y = 0; y < this.NUM_COLS; y++ ) {
            for( var x = 0; x < this.NUM_ROWS; x++ ) {
                this.map[y][x] = this.moveGrid[y][x];
            }
            
        }
    }
}

class Render {
    constructor() {
        console.log("creating Render class");
        this.TILE_SIZE = 20;
        console.log("drawing game window");
        this.canvas = document.getElementById("tetrisJS");
        this.canvasContext = this.canvas.getContext("2d");

        console.log("setting colors");
        this.canvasContext.lineWidth = 1;
        //this.canvasContext.fillStyle = "black";
    }

    //draw tile at x and y
    drawTile( x, y, color ) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect( x * this.TILE_SIZE, y * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE );
    }

    clearTile( x, y ) {
        //stroke rect adds a 2px border to the rect, need to increase tile size by 2, and reduce tile coord by 1 to account
        //todo: find non hacky way to clear
        this.canvasContext.clearRect( x * this.TILE_SIZE - 1, y * this.TILE_SIZE - 1, this.TILE_SIZE + 2, this.TILE_SIZE + 2 );
    }

    clearPiece( piece ) {
        for( var i = 0; i < piece.block.mapping.length; i++ ) {
            for( var k = 0; k < piece.block.mapping.length; k++ ) {
                this.clearTile( piece.location.x, pice.location.y );
            }
        }
    }

    clearRow( row ) {
        for( var y = 0; y < grid.NUM_COLS; y++ ) {
            if( row == y ) {
                for( var x = 0; x < grid.NUM_ROWS; x++ ) {
                    this.clearTile( x, y );
                }
            }
        }
    }

    clearAllTiles( grid ) {
        for( var y = 0; y < grid.NUM_COLS; y++ ) {
            for( var x = 0; x < grid.NUM_ROWS; x++ ) {
                this.clearTile( y, x );
            }
        }
    }

    drawGrid( grid, piece ) {
        for( var y = 0; y < grid.NUM_COLS; y++ ) {
            for( var x = 0; x < grid.NUM_ROWS; x++ ) {
                if( grid.map[y][x] === "X" ) {
                    this.drawTile( x, y, piece.block.color );
                }
                if( grid.map[y][x] === 1 ) {
                    this.drawTile( x, y, piece.block.color );
                }
            }
        }
    }

    //draws shape at x,y offset by y+i,x+k of shape
    drawShape( shape, x, y ) {
        for( var i = 0; i < shape.mapping.length; i++ ) {
            for( var k = 0; k < shape.mapping.length; k++ ) {
                if( shape.mapping[i][k] === "X" ) {
                    this.drawTile( x + k, y + i, shape.color );
                }
            }
        }
    }

    //randomly fill screen with shapes to see them -- testing function
    drawAllShapes( ) {
        for( var i = 0; i < 6; i++ ){ 
            for(var k = 0; k < 3; k++ ) {
                this.drawShape( Piece.getRandom(), k*5, i*5 );
            }
        }
    }
}

class Points {


}

class TetrisJS {
    constructor() {
        console.log("creating new tetris game");
        this.PLACED_TILE = 2;
        this.FRAMES_PER_SECOND = 1;
        this.UPDATE_FREQUENCY = 1000; //milliseconds
        this.START_LOCATION = {
            "x": 7,
            "y": 0
        }

        this.grid = new Grid();
        this.render = new Render();
        
        this.piece = {
            "location": this.START_LOCATION,
            "block": Piece.getRandom()
        }
        window.addEventListener( "keypress", this.handleKeypress );
        //setInterval( this.updateLoop, this.UPDATE_FREQUENCY / this.FRAMES_PER_SECOND );
    }

    updateLoop(){
        //move piece down 1 unit
        //this.dropPiece();
        //check move
            //check hit detection, if( [i++][k] == 1 ), stop piece, else continue
            //check for valid move/game over
        //update screen
        //this.render.drawGrid( this.grid, this.piece );
        //update score
        //if piece can't drop vertically, get new piece
        //this.getNewPiece();
    }

    

    createNewPiece() {
        this.piece.location = this.START_LOCATION;
        this.piece.block = Piece.getRandom();
    }

    dropPiece() {
        this.piece.location.y++;
    }

    // updateGrid( grid, piece ) {
    //     for( i = 0; i < grid.NUM_COLS; i++ ) {
    //         for( k = 0; k < grid.NUM_ROWS; k++ ) {

    //             //not sure how to do this
    //             // grid[piece.y][piece.x] = 1
    //         }
    //     }
    // }

    checkRow( grid ) {
        for( var y = 0; y < grid.NUM_COLS; y++ ) {
            var total = 0;
            for( var x = 0; x < grid.NUM_ROWS; x++ ) {
                total += grid.mapping[y][x];
            }
            if( total >= grid.NUM_ROWS ) {
                //add Points
                //clear row
            }
        }
    }

    handleKeypress( event ) {
        switch( event.key ) {
            case "s":
                this.dropPiece();
                console.log("down");
                break;
            case "a":
                console.log("left");
                break;
            case "d":
                console.log("right");
                break;   
        }
    }
}