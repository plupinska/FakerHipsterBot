/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Ball = __webpack_require__(4);
const Paddle = __webpack_require__(1);
const humanPlayer = __webpack_require__(5);
const aiPlayer = __webpack_require__(3);
const GameView = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(1);

class aiPlayer {
  constructor(lives, score, game) {

    this.lives = lives;
    this.score = score;
    this.dy = 3.65;
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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Ball {
  constructor(width, height, game) {
    this.pos = [270,270];
    this.vel = 3;
    this.xvel = 3;
    this.yvel = 2;
    this.radius = 10;
    this.color = "#5A879A";
    this.cwidth = width;
    this.cheight = height;
    this.drawCicle = this.drawCircle.bind(this);
    this.game = game.game;
    this.getCollisionPoints = this.getCollisionPoints.bind(this);
    this.angleToRadian = this.angleToRadian.bind(this);
    this.calcPointFromCenter = this.calcPointFromCenter.bind(this);
  }

  drawCircle(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360, false);
    ctx.fill();
  }

  getCollisionPoints(ball) {
    let angles = [60, 150, 240, 330, 0, 90, 180, 270];
    let collisionCoordinates = [];

    angles.forEach((angle) => {
      let rad = this.angleToRadian(angle);
      collisionCoordinates.push(this.calcPointFromCenter(this.pos, rad));
    });

    return collisionCoordinates;
  }

  calcPointFromCenter(point, radian) {
    let x = point[0] + (this.radius * Math.cos(radian));
    let y = point[1] + (this.radius * Math.sin(radian));

    return [x,y];
  }

  angleToRadian(angle) {
    return Math.floor((angle* (Math.PI / 180)));
  }


  bounce(paddle1, paddle2) {
    const ballCollisionPts = this.getCollisionPoints(this);
    // Paddle Dimension
    const paddle1y = paddle1.pos[1];
    const paddle1x = paddle1.pos[0];
    const paddle2y = paddle2.pos[1];
    const paddle2x = paddle2.pos[0];
    let hitPaddle = false;

    if (this.hitTop()) {
      this.pos[1] = this.radius;
      this.yvel = -1 * this.yvel;
      let snd = new Audio("audio/bouncelost.wav");
      snd.play();
    } else if (this.hitBottom()) {
      this.pos[1] = this.pos[1] - this.radius * 2;
      this.yvel = -1 * this.yvel;
      let snd = new Audio("audio/bouncelost.wav");
      snd.play();
    } else if (this.haveCollided(paddle1, ballCollisionPts)){
    //  
     let snd = new Audio("audio/bouncelost.wav");
     snd.play();
    let relativeIntersectY = (paddle1x + (paddle1.height/2)) - this.cheight;
    let normalizedRelativeIntersectionY = (relativeIntersectY/(paddle1.height/2));
    let bounceAngle = normalizedRelativeIntersectionY * 10*Math.PI/10;
    this.pos[0] +=1;
    this.yvel = this.yvel;
    this.xvel = -1 * this.xvel;
    // this.xvel = -10*Math.cos(bounceAngle);
    // this.yvel = 10*-Math.sin(bounceAngle);

    hitPaddle = true;
  } else if (this.haveCollided(paddle2, ballCollisionPts)){
    let snd = new Audio("audio/bouncelost.wav");
    snd.play();
    let relativeIntersectY = (paddle2y + (paddle2.height/2)) - this.cheight;
    let normalizedRelativeIntersectionY = (relativeIntersectY/(paddle2.height/2));
    let bounceAngle = normalizedRelativeIntersectionY * 10*Math.PI/10;
    this.pos[0] -= 1;
    this.yvel = this.yvel;
    this.xvel = -1 * this.xvel;
    // this.xvel = 10*Math.cos(bounceAngle);
    // this.yvel = 10*-Math.sin(bounceAngle);
    hitPaddle = true;
  } else if (this.hitLeftOrRight()) {
    let snd = new Audio("audio/bounce.wav");
    snd.play();
    this.yvel = this.yvel;
    this.xvel = -1 * this.xvel;
    if (this.pos[0] < 0  && !hitPaddle) {
      this.game.humanPlayer.score += 1;
      this.game.aiPlayer.lives -=1;
      this.pos[0] = 5;
    }
     else if (!hitPaddle) {
      this.pos[0] = 500;
      this.game.humanPlayer.lives -=1;
      this.game.aiPlayer.score +=1;
    }
  }

    this.move();
  }

  haveCollided(paddle, ballCollisionPts) {
    let collision = false;
    for (let i = 0; i < ballCollisionPts.length; i++) {
      let ballPt = ballCollisionPts[i];
      if ((ballPt[1] > paddle.pos[1]) && (ballPt[1] < paddle.pos[1] + paddle.height)) {
          if ((ballPt[0] > paddle.pos[0]) && (ballPt[0] < paddle.pos[0] + paddle.width)) {
            collision = true;
          }
        }
    }

    return collision;
  }

  hitLeftOrRight() {
    return this.pos[0] < 0 || this.pos[0] > 500;
  }

  hitBottom() {
  return this.pos[1] + this.radius > 500;
  }

  hitTop() {
    return this.pos[1] - this.radius < 0;
  }

  move() {
    this.pos[0] += this.xvel;
    this.pos[1] += this.yvel;
  }

}

module.exports = Ball;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class humanPlayer {
  constructor(lives, score) {
    this.lives = lives;
    this.score = score;
  }

}

module.exports = humanPlayer;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const GameView = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById('game');
  let width = canvas.width;
  let height = canvas.height;
  let ctx = canvas.getContext('2d');
  
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 13:
          document.getElementById("winner").innerHTML = "";
          document.getElementById("ai").innerHTML = "";
          document.getElementById("human").innerHTML = "";
          const game = new Game(width, height, ctx);
          new GameView(game, ctx, width, height).start();
    }
  });
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map