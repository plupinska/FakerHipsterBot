class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.hasCollidedWith = this.hasCollidedWith.bind(this);
  }

  hasCollidedWith(paddle) {
    if (((paddle.pos[0]) <= (this.pos[0] + this.radius-2)) && ((this.pos[0] + this.radius) <= (paddle.pos[0] + paddle.width))) {
      if (((paddle.pos[1]) <= (this.pos[1] + this.radius-2)) && ((this.pos[1] + this.radius) <= (paddle.pos[1] + paddle.height))) {
        return true;
      }
    } else if (((paddle.pos[0]) <= (this.pos[0] - this.radius-2)) &&  ((this.pos[0] - this.radius) <= (paddle.pos[0] + paddle.width))) {
      if (((paddle.pos[1]) <= (this.pos[1] - this.radius-2)) && ((this.pos[1] - this.radius) <= (paddle.pos[1] + paddle.height))) {
        return true;
      }
    }

    return false;
  }

}

module.exports = MovingObject;
