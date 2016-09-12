/**
 * Created by Akira on 9/12/2016.
 */
var Rock = function (name, price, breakable, posx, posy, img, sx, sy, swidth, sheight) {
    //Properties of rock
    var frames = 0;
    this.name = name;
    this.price = price;
    this.breakable = breakable;

    //Reference to spritesheet
    this.img = img;
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
};

($(function() {
    var tilesetImage = new Image();
    tilesetImage.src = 'img/tiles3.png';
    //tilesetImage.onload = init;

    var canvas = document.getElementById('main');
    var ctx = canvas.getContext('2d');
    var tileSize = 32;
    var imageNumTiles = 6;

    var ground = [
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
    ];


    function drawMap() {
        ground.push([31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31]);
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

    function keyboard() {
        document.addEventListener('keydown', function (e) {
            //Press 'a'
            if (e.keyCode == 65) {
                console.log("a");
            }

            //Press 's'
            if (e.keyCode == 83) {
                ground.push([7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]);
                drawMap();


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
                window.setTimeout(callback, 1000 / 20);
            };
    })();


    //Animation Handler
    (function animloop() {
        requestAnimFrame(animloop);
        keyboard();
        drawMap();
    })();
}));
