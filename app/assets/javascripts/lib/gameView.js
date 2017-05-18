// const Ball = require('./ball.js');
// const Paddle = require('./paddle.js');

class GameView {
  constructor(game, ctx, width, height) {
    this.game = game;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    this.cWidth = width;
    this.cHeight = height;
  }

  draw() {
    this.ctx.clearRect( 0, 0, 500, 500);
    this.game.ball.drawCicle(this.ctx);
    this.game.aiPaddle.drawRectangle(this.ctx, this.cHeight);
    this.game.humanPaddle.drawRectangle(this.ctx, this.cHeight);
    this.ctx.setLineDash([5, 15]);
    this.ctx.beginPath();
    this.ctx.moveTo(250, 0);
    this.ctx.lineTo(250, 500);
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.stroke();
    this.game.ball.bounce(this.game.aiPaddle, this.game.humanPaddle);
    this.makeScoreboard();
    this.game.start();
  }

  makeScoreboard() {
    let aiScore = document.getElementById('ai');
    let huScore = document.getElementById('human');
    aiScore.innerHTML = (`Machine: ${this.game.aiPlayer.score}`);
    huScore.innerHTML = (`Player: ${this.game.humanPlayer.score}`);
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const delta = time - this.lastTime;
    this.draw();
    // We animate until the game is over. Then clear Rect to prompt next game.
    if (!this.game.gameOver) {
      this.lastTime = time;
      let frames = 120;
      setTimeout(() => {
        requestAnimationFrame(this.animate.bind(this));
      }, 10);
    } else {
      this.ctx.clearRect(0,0,500,500);
    }
  }
}

module.exports = GameView;
