($(function() {
    var tilesetImage = new Image();
    tilesetImage.src = 'img/tiles3.png';
    var TILE_SIZE = 32;
    var imageNumTiles = 6;

    var canvas = document.getElementById('main');
    var ctx = canvas.getContext('2d');

    var bufferImage = document.getElementById('render');
    var ctxBuffer = bufferImage.getContext('2d');

    var yPosition = 0;

    var map = [
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [flareon.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId()]
    ];

    function drawMap(getMapRow) {
        map.push(getMapRow);
        var rowTileCount = map.length;
        var colTileCount = map[0].length;

        //Crops the image at specific location (spritesheet)
        for (var r = 0; r < rowTileCount; r++) {
            for (var c = 0; c < colTileCount; c++) {
                var tile = map[r][c];
                var tileRow = (tile / imageNumTiles) | 0;
                var tileCol = (tile % imageNumTiles) | 0;
                ctx.drawImage(tilesetImage, (tileCol * TILE_SIZE), (tileRow * TILE_SIZE), TILE_SIZE, TILE_SIZE, (c * TILE_SIZE), (r * TILE_SIZE), TILE_SIZE, TILE_SIZE);
            }
        }
    }

    //TODO: Translation
    function translate(x, y) {
        ctxBuffer.clearRect(0, 0, bufferImage.width, bufferImage.height);
        ctxBuffer.drawImage(canvas, 0, 0);
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(bufferImage, x, y);
    }


    //Gives a probability of a chance, of a tile being placed.
    function buildTile() {
        var tileType = [borderRock, greenOre, blueRock];
        var rand = Math.random();
        if (tileType[1].getProbability() > rand) {
            return tileType[1].getId();
        }

        if (tileType[2].getProbability() > rand) {
            return tileType[2].getId();
        }

        else {
            return tileType[0].getId();
        }
    }

    //TODO: Generate 1 random row. When key is pressed
    function generateRow() {
        var tempRowMap = [];

        //Generate random tile for each column.
        for (var i = 0; i < map[0].length; i++ ) {
            tempRowMap.push(buildTile());
        }
        return tempRowMap;
    }

    //TODO: Generate new rows
    //function moveMap() {
    //    yPosition--;
    //    translate(0, yPosition);
    //    console.log(yPosition);
    //}

    function keyboard() {
        document.addEventListener('keydown', function (e) {
            //Press 'a'
            if (e.keyCode == 65) {
                console.log("a");
                console.log(map[2][0]);
            }

            //TODO: Able to move down
            //Press 's'
            if (e.keyCode == 83) {
                // shift everything to the top
                //moveMap();
                console.log("s");
            }

            //Press 'w'
            if (e.keyCode == 87) {
                console.log("w");

            }

            //Press 'd'
            if (e.keyCode == 68) {
                //FIND THE CURRENT POSITION OF THE CHARACTER
                console.log(map[2].indexOf(14));
                console.log("d");
            }
        });
    }

    //FPS
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    //Animation Handler
    (function animloop() {
        requestAnimFrame(animloop);
    })();

    keyboard();
    for (var i = 0; i < 20; i++) {
        drawMap(generateRow());
    }
}));
