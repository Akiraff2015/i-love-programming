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