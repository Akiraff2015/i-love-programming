/**
 * Created by Akira on 9/12/2016.
 */
($(function () {

    var shopBox = {
        bombButton: '#bombSquare',
        moneyButton: '#moneySquare',
        exitButton: '#exitButton'
    };

    _.each(shopBox, (obj) => $(obj).css({'display':'none'}));

    var imageSetting = {
        TILE_SIZE: 32,
        imageNumTiles: 6
    };

    var gameSetting = {
        score: 0,
        money: 0,
        bomb: 10
    };

    //IMAGE PROPERTIES
    var tilesetImage = new Image();
    tilesetImage.src = 'img/tiles3.png';

    //CANVAS - RENDER
    var canvas = document.getElementById('main');
    var ctx = canvas.getContext('2d');

    //CANVAS - BUFFER
    var bufferImage = document.getElementById('render');
    var ctxBuffer = bufferImage.getContext('2d');

    //Canvas - Shop
    var canvasShop = document.getElementById('shop');
    var ctxShop = canvasShop.getContext('2d');

    var playerPos = flareon.getPosition();
    var tileType = [borderRock, greenOre, blueRock];

    //DEFAULT MAP GENERATOR

    var map = [];

    for (var i = 0; i < 3; i++) {
        map.push([]);
    }
    for (var col= 0; col < 28; col++) {
        map[0].push(test10.getId());
        map[1].push(test10.getId());
        map[2].push(grass.getId());
    }
    console.log(map);

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
                    var tileRow = (tile / imageSetting.imageNumTiles) | 0;
                    var tileCol = (tile % imageSetting.imageNumTiles) | 0;
                    ctx.drawImage(tilesetImage, (tileCol * imageSetting.TILE_SIZE),
                        (tileRow * imageSetting.TILE_SIZE), imageSetting.TILE_SIZE,
                        imageSetting.TILE_SIZE, (c * imageSetting.TILE_SIZE), (r * imageSetting.TILE_SIZE),
                        imageSetting.TILE_SIZE, imageSetting.TILE_SIZE);
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
                    var tileRow = (tile / imageSetting.imageNumTiles) | 0;
                    var tileCol = (tile % imageSetting.imageNumTiles) | 0;
                    ctx.drawImage(tilesetImage, (tileCol * imageSetting.TILE_SIZE), (tileRow * imageSetting.TILE_SIZE),
                        imageSetting.TILE_SIZE, imageSetting.TILE_SIZE, (c * imageSetting.TILE_SIZE),
                        (r * imageSetting.TILE_SIZE), imageSetting.TILE_SIZE, imageSetting.TILE_SIZE);
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

        else if (playerPos.row >= 19) {
            playerPos.row = 19;
        }
    }

    function clearPlayerSquare() {
        playerPos = flareon.getPosition();
        map[playerPos.row][playerPos.col] = test10.getId();
        drawMap(map, null);
    }

    function explosion() {
        playerPos = flareon.getPosition();
        map[playerPos.row][playerPos.col] = test10.getId();
        map[playerPos.row+1][playerPos.col] = test10.getId();
        map[playerPos.row-1][playerPos.col] = test10.getId();
        map[playerPos.row][playerPos.col-1] = test10.getId();
        map[playerPos.row][playerPos.col+1] = test10.getId();
        drawMap(map, null);

    }

    function move() {
        playerPos = flareon.getPosition();
        var positionValue = map[playerPos.row][playerPos.col];

        detectCollision();

        switch (positionValue) {
            case blueRock.getId():
                gameSetting.money += blueRock.getPrice();
                gameSetting.score += blueRock.getScore();
                break;

            case greenOre.getId():
                gameSetting.money += greenOre.getPrice();
                gameSetting.score += greenOre.getScore();
                break;

            case grass.getId():
                gameSetting.score += grass.getScore();
                break;

            case borderRock.getId():
                gameSetting.score += borderRock.getScore();
                break;

            default:
                console.log("Score: ", gameSetting.score);
                console.log("Money: ", gameSetting.money);
        }
        map[playerPos.row][playerPos.col] = flareon.getId();
        drawMap(map, null);
    }

    function drawScore() {
        var getPos = flareon.getPosition();
        ctx.font = "12px Arial";
        ctx.fillText("Score: " + gameSetting.score, 0, 20);
        ctx.fillText("Money: $" + gameSetting.money, 400, 20);

        ctx.fillText("x: " + getPos.col, 810, 20);
        ctx.fillText("y: " + getPos.row, 850, 20);

        var bombImg = new Image();
        bombImg.src = "img/bomb.png";
        ctx.drawImage(bombImg, 200, 0);

        ctx.font = "24px Arial";
        ctx.fillText(gameSetting.bomb, 240, 25);
    }

    function keyboard() {
        document.addEventListener('keydown', function (e) {

            var keyValue = e.keyCode;
            clearPlayerSquare();
            switch (keyValue) {
                //t
                case 84:
                    if (gameSetting.bomb > 0) {
                        tnt();
                        explosion();
                        gameSetting.bomb--;
                    }
                    else {
                        gameSetting.bomb = 0;
                    }
                    break;
                //a
                case 65:
                    flareon.left();
                    break;
                //b
                case 66:
                    if (gameSetting.money >= 1000) {
                        gameSetting.bomb += 1;
                        gameSetting.money -= 1000;
                    }
                    break;
                //s
                case 83:
                    flareon.down();
                    break;
                //w
                case 87:
                    flareon.up();
                    break;
                //d
                case 68:
                    flareon.right();
                    break;

                case 88:
                    console.log("This is the shop!");
                    drawMenu();
                    break;

                default:
                    console.log(keyValue);
            }
            move();
        });
    }

    //Shop Menu
    function drawMenu() {
        ctxShop.fillRect(96,120,800,400);
        ctxShop.font="30px Georgia";
        ctxShop.fillStyle="#ffffff";
        ctxShop.fillText("Shop", 98, 150);
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
        gameSetting.money = 999999999;
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

    //commands
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
            gameSetting.score = 999999999;
        }

        else if (getText.localeCompare("mute") == 0) {
            stopMainSong();
        }

        else if (getText.localeCompare("playsong") == 0) {
            playMainSong();
        }

        else if (getText.localeCompare("bomberman") == 0) {
            gameSetting.bomb = 999;
        }

        else if (getText.localeCompare("givemeeverything") == 0) {
            gameSetting.bomb = 999;
            gameSetting.score = 999999999;
            gameSetting.money = 999999999;
        }

        e.preventDefault();
    });

    init();
}));