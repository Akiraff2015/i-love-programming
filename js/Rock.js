/**
 * Created by Akira on 9/12/2016.
 */
    //Added score and price
var Rock = function (name, price, breakable, id, chance, walkable, score) {
    //Properties of rock
    this.name = name;
    this.price = price;
    this.score = score;
    this.id = id;
    this.chance = chance;
    this.walkable = false;

    this.position = {
        "row": 0,
        "col": 0
    };
};

//TODO: find the probability being spawned on a different spawn
//Rock.prototype.getChance = function (rows, currentRow) {
//    var chance = (currentRow/rows) * this.chance;
//    return chance;
//};

Rock.prototype.getScore = function() {
    return this.score;
};

Rock.prototype.getPrice = function() {
    return this.price;
};

Rock.prototype.getId = function() {
    return this.id;
};

Rock.prototype.getWalkable = function() {
    return this.walkable;
};

Rock.prototype.getProbability = function () {
    return this.chance;
};

//Grass
var grass = new Rock("Grass", 0, true, 7, 1, null, 20);

//Air Block
var test10 = new Rock("Test10", 0, false, 10, 1, null, 0);

//Rock
var borderRock = new Rock("Border Rock", 0, true, 19, 0.2, null, 20);

//Ice
var ice = new Rock("Ice", 100, true, 18, 0.11, null, 100);

//Green rock
var greenOre = new Rock("Green Ore", 1500, true, 9, 0.1, null, 750);

//Blue Rock
var blueRock = new Rock("Blue Rock", 1000, true, 36, 0.11, 1500, 500);