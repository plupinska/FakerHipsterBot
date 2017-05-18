class Paddle {
  constructor(options, maxHeight) {
    this.pos = options.pos;
    this.width = 5;
    this.height = 55;
    this.yvel = 4.1;
    this.maxWidth = options.maxWidth;
    this.maxHeight = maxHeight;
    this.name = options.name;
  }

  drawRectangle(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.fill();
  }

  move(dir, move) {
      if (dir > 0) {
        this.pos[1] += this.yvel;
      } else if (dir < 0) {
        this.pos[1] -= this.yvel;
      }
      if (this.pos[1] < 0 ) {
        this.pos[1] = 0;
      } else if (this.pos[1] + this.height > 500) {
        this.pos[1] = 500 - 55;
      }
  }


}

module.exports = Paddle;
