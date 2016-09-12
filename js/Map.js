($(function() {
    var tilesetImage = new Image();
    tilesetImage.src = 'img/tiles3.png';
    //tilesetImage.onload = init;

    var canvas = document.getElementById('main');
    var ctx = canvas.getContext('2d');
    var tileSize = 32;
    var imageNumTiles = 6;

    var map = [
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId()]
    ];

    function drawMap(getMapRow) {
        map.push(getMapRow);
        var rowTileCount = map.length;
        var colTileCount = map[0].length;

        for (var r = 0; r < rowTileCount; r++) {
            for (var c = 0; c < colTileCount; c++) {
                var tile = map[r][c];
                var tileRow = (tile / imageNumTiles) | 0;
                var tileCol = (tile % imageNumTiles) | 0;
                ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
            }
        }
    }
    //Gives a probability of a chance, of a tile being placed.
    function buildTile() {
        var tileType = [borderRock, greenOre, blueRock];
        var rand = Math.random();
        if (tileType[1].getProbability() > rand) {
            console.log(rand);
            return tileType[1].getId();
        }

        if (tileType[2].getProbability() > rand) {
            console.log(rand);
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

    function keyboard() {
        document.addEventListener('keydown', function (e) {
            //Press 'a'
            if (e.keyCode == 65) {
                console.log("a");
            }

            //Press 's'
            if (e.keyCode == 83) {
                var imageData = ctx.getImageData(1, 0, ctx.canvas.width - 1, ctx.canvas.height);
                ctx.putImageData(imageData, 0, 0);
                ctx.clearRect(ctx.canvas.width-1, 0, 1, ctx.canvas.height);
                console.log("s");
            }

            //Press 'w'
            if (e.keyCode == 87) {
                console.log("w");

            }

            if (e.keyCode == 68) {
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
        keyboard();
    })();

    for (var i = 0; i < 20; i++) {
        drawMap(generateRow());
    }
}));
