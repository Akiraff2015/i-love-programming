($(function() {
    var tilesetImage = new Image();
    tilesetImage.src = 'img/tiles3.png';
    //tilesetImage.onload = init;

    var canvas = document.getElementById('main');
    var ctx = canvas.getContext('2d');
    var tileSize = 32;
    var imageNumTiles = 6;

    var ground = [
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId()]
    ];

    console.log();


    function drawMap(getMapRow) {
        ground.push(getMapRow);
        var rowTileCount = ground.length;
        var colTileCount = ground[0].length;

        for (var r = 0; r < rowTileCount; r++) {
            for (var c = 0; c < colTileCount; c++) {
                var tile = ground[r][c];
                var tileRow = (tile / imageNumTiles) | 0;
                var tileCol = (tile % imageNumTiles) | 0;
                ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
            }
        }
    }

    //TODO: Generate 1 random row.
    function generateRow() {
        var tempRowMap = [];

        //Generate 28 new columns.
        for (var i = 0; i < 28; i++) {
            var rand = Math.round(Math.random()*5);
            if (rand >= 1) {
                tempRowMap.push(greenOre.getId());
            }

            else{
                tempRowMap.push(borderRock.getId());
            }
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
                //drawMap();
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
