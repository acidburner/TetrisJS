var Piece = {
    "square": {
        "name": "square",
        "mapping": [
            ["0", "0", "0", "0"],
            ["0", "1", "1", "0"],
            ["0", "1", "1", "0"],
            ["0", "0", "0", "0"]
        ]
    },
    "line": {
        "name": "line",
        "mapping": [
            ["1", "0", "0", "0"],
            ["1", "0", "0", "0"],
            ["1", "0", "0", "0"],
            ["1", "0", "0", "0"]
        ]
    },
    "t": {
        "name": "t",
        "mapping": [
            ["0", "0", "0"],
            ["0", "1", "0"],
            ["1", "1", "1"]
        ]
    },
    "z": {
        "name": "z",
        "mapping": [
            ["0", "0", "0"],
            ["1", "1", "0"],
            ["0", "1", "1"]
        ]
    },
    "reverseZ": {
        "name": "reverseZ",
        "mapping": [
            ["0", "0", "0"],
            ["0", "1", "1"],
            ["1", "1", "0"]
        ]
    },
    "getRandom": function(){
        var rand = Math.floor( Math.random() * 5 );
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
        }
    },

    "rotateClockwise": function() {

    },
    "rotateCounterClockwise": function() {

    },
}

class Grid {
    constructor() {
        console.log("creating Grid class");
        this.NUM_COLS = 15;
        this.NUM_ROWS = 30;
        this.map = this.makeGrid( this.NUM_ROWS, this.NUM_COLS );
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
        this.canvasContext.strokeStyle = "black";
        //this.canvasContext.fillStyle = "black";
    }

    //draw tile at x and y
    drawTile( x, y ) {
        this.canvasContext.strokeRect( x * this.TILE_SIZE, y * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE );
    }

    clearTile( x, y ) {
        //stroke rect adds a 2px border to the rect, need to increase tile size by 2, and reduce tile coord by 1 to account
        //todo: find non hacky way to clear
        this.canvasContext.clearRect( x * this.TILE_SIZE - 1, y * this.TILE_SIZE - 1, this.TILE_SIZE + 2, this.TILE_SIZE + 2 );
    }

    drawGrid( grid ) {
        for( var y = 0; y < grid.NUM_COLS; y++ ) {
            for( var x = 0; x < grid.NUM_ROWS; x++ ) {
                if( grid[y][x] === 1 ) {
                    this.drawTile( x, y );
                }
            }
        }
    }

    //draws shape at x,y offset by yi,xk of shape
    // drawShape( shape, x, y ) {
    //     for( var i = 0; i < shape.mapping.length; i++ ) {
    //         for( var k = 0; k < shape.mapping.length; k++ ) {
    //             if( shape.mapping[i][k] === "1" ) {
    //                 this.drawTile( x + k, y + i );
    //             }
    //         }
    //     }
    // }
}

class TetrisJS {
    constructor() {
        console.log("creating new tetris game");
        this.FRAMES_PER_SECOND = 5;
        this.UPDATE_FREQUENCY = 1000;
        
        this.grid = new Grid();
        this.render = new Render();
        
        //setInterval( this.updateLoop, this.UPDATE_FREQUENCY / this.FRAMES_PER_SECOND );
    }

    updateLoop(){
        //check move
        //check hit detection
        //update screen
        this.render.drawGrid( this.grid );
        //check full row
        //update score
    }
}