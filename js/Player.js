/**
 * Created by Akira on 9/13/2016.
 */
var Player = function(name, id, posX, posY) {
    this.name = name;
    this.id = id;
    this.posX = 0;
    this.posY = 0;
};

Player.prototype.getId = function() {
    return this.id;
};

Player.prototype.getX = function() {
  return this.posX;
};

Player.prototype.setX = function (posX) {
    this.posX = posX;
};

Player.prototype.getY = function() {
    return this.posY;
};

Player.prototype.setY = function() {
    this.posY = posY;
};

var flareon = new Player("Flareon", 14);