const Ball = require('./ball.js');
const Paddle = require('./paddle.js');
const humanPlayer = require('./humanplayer');
const aiPlayer = require('./aiplayer');
const GameView = require('./gameView.js');

class Game {

  constructor(width, height, ctx) {
    this.lives = 10;
    this.width = width;
    this.height = height;
    this.score = 0;
    this.gameOver = false;
    this.ctx = ctx;
    this.humanPaddle = new Paddle({pos: [490, 420], maxHeight: this.height, maxWidth: this.width, name: "hu"});
    this.humanPlayer = new humanPlayer(this.lives, this.score, this.humanPaddle);
    this.aiPlayer = new aiPlayer(this.lives, this.score, this.aiPlayer, this.aiPaddle);
    this.ball = new Ball(this.width, this.height, {game: this});
    this.playRound = this.playRound.bind(this);
    this.aiPlayer = new aiPlayer(this.lives, this.score, this);
    this.aiPaddle = this.aiPlayer.aiPaddle;
    let dir = null;
    let humanMove = false;

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 38 ) {
        this.dir = -1;
        this.humanMove = true;
      } else if (e.keyCode === 40) {
        this.dir = 1;
        this.humanMove = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 38 || e.keyCode === 40) {
        this.humanMove = false;
        this.dir = null;
      }
    });
  }

  start() {
    this.playRound();
  }

  playRound() {
    let winner = this.winner();

    if (!winner) {
        this.ball.bounce(this.aiPaddle, this.humanPaddle);
        this.aiPlayer.move(this.aiPaddle);
        this.humanPaddle.move(this.dir, this.humanMove);
    } else {
      let snd = new Audio('audio/humanwon.wav'); // buffers automatically when created
      snd.play();
      document.getElementById('winner').innerHTML = (`The ${winner} wins...`);
      document.getElementById('winner').append(` Press Enter to play again!`);
      let time = this.time;
      this.gameOver = true;
      this.ctx.clearRect( 0, 0, 500, 500);
    }
  }

  winner() {
    if (this.aiPlayer.score === 5) {
      return "AI";
    } else if (this.humanPlayer.score === 5){
      return "Human";
    } else {
      return null;
    }
  }

}

module.exports = Game;
