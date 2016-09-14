/**
 * Created by Akira on 9/12/2016.
 */
var Rock = function (name, price, breakable, id, chance, walkable) {
    //Properties of rock
    this.name = name;
    this.price = price;
    this.id = id;
    this.chance = chance;
    this.walkable = true;

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
var grass = new Rock("Grass", 0, true, 7, 1);

//Air Block
var test10 = new Rock("Test10", 0, false, 10, 1);

//Rock
var borderRock = new Rock("Border Rock", 0, true, 19, 0.2);
console.log(borderRock.getWalkable());
//Ice
var ice = new Rock("Ice", 100, true, 18, 0.11);

//Green rock
var greenOre = new Rock("Green Ore", 100, true, 9, 0.1);

//Blue Rock
var blueRock = new Rock("Blue Rock", 2000, true, 36, 0.11);

var tiles = new Rock("Tiles", -1, false, -1, 0);