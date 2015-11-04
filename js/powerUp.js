
// Power up script 


var powerUpChoice = [0,0,0];
var max = 10
var min = 1
var chance = Math.Random() * (max - min) + min


function powerUp (powerUpChoice, chance){
	this.r = 30;
	this.img = new Image();
    this.img.src = 'images/replay.png';
	 this.update {
                this.x += this.vx;
                if (this.x < (0 - this.r * 2)) {
                    this.respawn();
                }
            };
     this.respawn = function () {
                this.x = FB.WIDTH;

      };
      this.render = function () {
                FB.Draw.Sprite(this.img, 0, 0, 
	                34, 24, 70, 180, 
	                34, 24, 0);
            };


}

powerUp(powerUpChoice, chance);