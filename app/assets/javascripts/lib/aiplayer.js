const Paddle = require('./paddle');

class aiPlayer {
  constructor(lives, score, game) {

    this.lives = lives;
    this.score = score;
    this.dy = 5.2;
    this.cWidth = 500;
    this.cHeight = 500;
    this.game = game;
    this.aiPaddle = new Paddle({pos: [5,20], name: "ai"});
  }

  move(paddle) {
    let ballYtop = this.game.ball.pos[1] - this.game.ball.radius;
    let ballYbottom = this.game.ball.pos[1] + this.game.ball.radius;

    if (!(ballYtop <= (paddle.pos[1] + 25) &&  (paddle.pos[1] + 25) <= ballYbottom)) {

      if ((paddle.pos[1] + 25) < ballYtop) {
        this.aiPaddle.pos[1] += this.dy;
      } else if ((paddle.pos[1] + 25) > ballYbottom) {
       this.aiPaddle.pos[1] -= this.dy;
      }
    }

    if (this.aiPaddle.pos[1] <= 0) {
      this.aiPaddle.pos[1] = 0;
    } else if (this.aiPaddle.pos[1] + 55 >= 500) {
      this.aiPaddle.pos[1] = 500-55;
    }

  }


}

module.exports = aiPlayer;
