/**
 * Created by Akira on 9/12/2016.
 */
($(function () {

    //IMAGE PROPERTIES
    var tilesetImage = new Image();
    tilesetImage.src = 'img/tiles3.png';
    var TILE_SIZE = 32;
    var imageNumTiles = 6;

    //CANVAS - RENDER
    var canvas = document.getElementById('main');
    var ctx = canvas.getContext('2d');

    //CANVAS - BUFFER
    var bufferImage = document.getElementById('render');
    var ctxBuffer = bufferImage.getContext('2d');

    //GLOBAL GAME PROPERTIES
    var score = 0;
    var money = 0;
    var playerPos = flareon.getPosition();

    //DEFAULT MAP GENERATOR
    var map = [
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), flareon.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId(), grass.getId()]
    ];
    var mainSong = new Audio("sound/8bit-adventure.mp3");
    function playMainSong() {
        mainSong.play();
        mainSong.loop = true;
    }

    function stopMainSong() {
        mainSong.pause();
        mainSong.currentTime = 0;
    }

    //GAME INITIALIZER
    function init() {
        playMainSong();
        keyboard();

        for (var i = 0; i < 20; i++) {
            drawMap(generateRow(), 1);
        }
    }

    function drawMap(getMapRow, condition) {
        if (condition == 1) {
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

        else {
            var row = map.length;
            var col = map[0].length;

            //Crops the image at specific location (spritesheet)
            for (var r = 0; r < row; r++) {
                for (var c = 0; c < col; c++) {
                    var tile = map[r][c];
                    var tileRow = (tile / imageNumTiles) | 0;
                    var tileCol = (tile % imageNumTiles) | 0;
                    ctx.drawImage(tilesetImage, (tileCol * TILE_SIZE), (tileRow * TILE_SIZE), TILE_SIZE, TILE_SIZE, (c * TILE_SIZE), (r * TILE_SIZE), TILE_SIZE, TILE_SIZE);
                }
            }
        }
    }

    //TODO: Translation
    function translate(x, y) {
        ctxBuffer.clearRect(0, 0, bufferImage.width, bufferImage.height);
        ctxBuffer.drawImage(canvas, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bufferImage, x, y);
    }

    //Gives a probability of a chance, of a tile being placed.
    function buildTile() {
        var tileType = [borderRock, greenOre, blueRock];
        var rand = Math.random();
        if (tileType[1].getProbability() > rand) {
            return tileType[1];
        }

        if (tileType[2].getProbability() > rand) {
            return tileType[2];
        }

        else {
            return tileType[0];
        }
    }

    //TODO: Generate 1 random row. When key is pressed
    function generateRow() {
        var tempRowMap = [];

        //Generate random tile for each column.
        for (var i = 0; i < map[0].length; i++) {
            tempRowMap.push(buildTile().getId());
        }
        return tempRowMap;
    }

    //TODO: Generate new rows
    //function moveMap() {
    //    yPosition--;
    //    translate(0, yPosition);
    //    console.log(yPosition);
    //}

    //TODO: Detect collision between the rocks.
    function detectCollision() {
        if (playerPos.col < 0) {
            playerPos.col = 0;
        }

        else if (playerPos.col > 27) {
            playerPos.col = 27;
        }

        else if (playerPos.row <= 0) {
            playerPos.row = 1;
        }

        else  if (playerPos.row >= 19) {
            playerPos.row = 19;
        }
    }

    function clearPlayerSquare() {
        playerPos = flareon.getPosition();
        map[playerPos.row][playerPos.col] = test10.getId();
        drawMap(map, null);
    }

    function move() {
        playerPos = flareon.getPosition();
        var positionValue = map[playerPos.row][playerPos.col];

        detectCollision();

        switch (positionValue) {
            case blueRock.getId():
                money += blueRock.getPrice();
                score += blueRock.getScore();
                break;

            case greenOre.getId():
                money += greenOre.getPrice();
                score += greenOre.getScore();
                break;

            case grass.getId():
                score += grass.getScore();
                break;

            case borderRock.getId():
                score += borderRock.getScore();
                break;

            default:
                console.log("Score: ", score);
                console.log("Money: ", money);
        }
        map[playerPos.row][playerPos.col] = flareon.getId();
        drawMap(map, null);
    }

    function drawScore() {
        var getPos = flareon.getPosition();
        ctx.font = "12px Arial";
        ctx.fillText("Score: " + score, 0, 20);
        ctx.fillText("Money: $" + money, 400, 20);
        ctx.fillText("x: " + getPos.col, 810, 20);
        ctx.fillText("y: " + getPos.row, 850, 20);
    }

    function keyboard() {
        document.addEventListener('keydown', function (e) {

            var keyValue = e.keyCode;
            clearPlayerSquare();
            switch (keyValue) {
                case 65:
                    flareon.left();
                    break;
                case 83:
                    flareon.down();
                    break;
                case 87:
                    flareon.up();
                    break;
                case 68:
                    flareon.right();
                    break;
                default:
                    console.log(keyValue);
                //console.log("Hey! Wrong keyboard");
            }
            move();
        });
    }

    function tnt() {
        var tntSFX = new Audio("sound/explosion.wav");
        tntSFX.play();

    }

    var justDoIt = new Audio("sound/justdoit.mp3");
    var moneySound = new Audio("sound/money.mp3");

    function justdoit() {
        justDoIt.play();
    }

    function stop() {
        justDoIt.pause();
        justDoIt.currentTime = 0;
    }

    function moneyFunction() {
        money = 999999999;
        moneySound.play();
    }

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    (function animloop() {
        requestAnimFrame(animloop);
        drawScore();
    })();

    $("#commandForm").submit(function (e) {
        var getText = $("#getText").val();

        if (getText.localeCompare("tnt") == 0) {
            tnt();

        }

        else if (getText.localeCompare("justdoit") == 0) {
            justdoit();
        }

        else if (getText.localeCompare("stop") == 0) {
            stop();
        } else if (getText.localeCompare("ineedsomemoney") == 0) {
            moneyFunction();
        }

        else if (getText.localeCompare("givemepoints") == 0) {
            score = 999999999;
        }

        else if (getText.localeCompare("mute") == 0) {
            stopMainSong();
        }

        else if (getText.localeCompare("playsong") == 0) {
            playMainSong();
        }

        e.preventDefault();
    });

    init();
}));