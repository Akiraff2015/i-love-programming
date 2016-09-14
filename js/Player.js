/**
 * Created by Akira on 9/13/2016.
 */
var Player = function (name, id, posX, posY) {
    this.name = name;
    this.id = id;
    this.position = {
        "row": 2,
        "col": 4
    };
};

Player.prototype.getId = function () {
    return this.id;
};

Player.prototype.down = function () {
    this.position.row++;
    console.log("Player x: " + this.position.col + " y: " + this.position.row);

};

Player.prototype.up = function () {
    this.position.row--;
    console.log("Player x: " + this.position.col + " y: " + this.position.row);
};

Player.prototype.left = function () {
    this.position.col--;
    console.log(" Player x: " + this.position.col + " y: " + this.position.row);
};

Player.prototype.right = function () {
    this.position.col++;
    console.log(" Player x: " + this.position.col + " y: " + this.position.row);
};

Player.prototype.getPosition = function(){
  return this.position;
};

var flareon = new Player("Flareon", 14);