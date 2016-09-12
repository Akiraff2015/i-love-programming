/**
 * Created by Akira on 9/12/2016.
 */
var Rock = function (name, price, breakable, id) {
    //Properties of rock
    this.name = name;
    this.price = price;
    this.id = id;
};

Rock.prototype.getId = function() {
    return this.id;
};

var grass = new Rock("Grass", 0, true, 7);
var test10 = new Rock("Test10", 0, false, 10);

var borderRock = new Rock("Border Rock", 0, true, 9);
var greenOre = new Rock("Green Ore", 100, true, 19);