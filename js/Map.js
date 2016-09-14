($(function() {

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

    //DEFAULT MAP GENERATOR
    var map = [
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [test10.getId(), test10.getId(), test10.getId(), test10.getId(), flareon.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId(), test10.getId()],
        [grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId(),grass.getId()]
    ];

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
        ctx.clearRect(0,0, canvas.width, canvas.height);
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
        for (var i = 0; i < map[0].length; i++ ) {
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
    function detectCollision(row, col) {
        //console.log("TEST ", map[row][col]);
        //IF WALKABLE
            //BREAK THE ROCK

            //ADD POINTS
            //REPLACE AIR BLOCK

        //ELSE
    }

    function clearPlayerSquare(){
        var playerPos = flareon.getPosition();
        map[playerPos.row][playerPos.col] = test10.getId();
        drawMap(map,null);
    }

    function move(){
        var playerPos = flareon.getPosition();
        var positionValue = map[playerPos.row][playerPos.col];

        //UPDATE SCORE and MONEY
        switch(positionValue) {
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
        drawMap(map,null);

    }

    function keyboard() {
        document.addEventListener('keydown', function (e) {

            var keyValue = e.keyCode;
            clearPlayerSquare();
            switch(keyValue) {
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

    keyboard();
    for (var i = 0; i < 20; i++) {
        drawMap(generateRow(),1);
    }
}));
