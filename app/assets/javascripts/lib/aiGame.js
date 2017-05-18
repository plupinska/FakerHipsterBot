const Ball = require('./ball.js');
const Paddle = require('./paddle.js');
const humanPlayer = require('./humanplayer');
const aiPlayer = require('./aiplayer');
const GameView = require('./gameView.js');

class aiGame{
  constructor(width, height) {
    this.lives = 10;
    this.width = width;
    this.height = height;
    this.score = 0;
    this.humanPaddle = new Paddle({pos: [495, 420], maxHeight: this.height, maxWidth: this.width, name: "hu"});
    this.humanPlayer = new humanPlayer(this.lives, this.score, this.humanPaddle);
    this.aiPlayer = new aiPlayer(this.lives, this.score, this.aiPlayer, this.aiPaddle);
    this.ball = new Ball(this.width, this.height, {game: this});
    this.playRound = this.playRound.bind(this);
    this.aiPlayer = new aiPlayer(this.lives, this.score, this);
    this.aiPaddle = this.aiPlayer.aiPaddle;

    document.addEventListener("keydown", (e) => {
      let dir = null;
      if (e.keyCode === 38 ) {
        dir = -1;
        this.humanPaddle.move(dir);
      } else if (e.keyCode === 40) {
        dir = 1;
        this.humanPaddle.move(dir);
      }
    });
  }

  start() {
    this.playRound();
  }

  playRound() {
    let winner = this.winner()
    if (!winner) {   
        this.ball.bounce(this.aiPaddle, this.humanPaddle);
        this.aiPlayer.move(this.aiPaddle);
    } else {
      document.getElementById('winner').innerHTML(`${winner} is the winner!!!`)
    }
  }

  winner() {
    if (aiPlayer.score === 10) {
      return "human";
    } else if (humanPlayer.score === 10){
      return "machine";
    } else {
      return null;
    }
  }

}

module.exports = aiGame;
