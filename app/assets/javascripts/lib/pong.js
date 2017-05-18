const Game = require('./game.js');
const GameView = require('./gameView.js');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById('game');
  let width = canvas.width;
  let height = canvas.height;
  let ctx = canvas.getContext('2d');
  let disable = false;
  document.addEventListener("keydown", (e) => {
      if (e.keyCode === 13 && !disable) {
          disable = true;
          document.getElementById("winner").innerHTML = "";
          document.getElementById("ai").innerHTML = "";
          document.getElementById("human").innerHTML = "";
          const game = new Game(width, height, ctx);
          new GameView(game, ctx, width, height).start();

      } else if (e.keyCode === 13 && document.getElementById("winner").innerHTML.length > 0) {
        disable = true;
        document.getElementById("winner").innerHTML = "";
        document.getElementById("ai").innerHTML = "";
        document.getElementById("human").innerHTML = "";
        const game = new Game(width, height, ctx);
        new GameView(game, ctx, width, height).start();
      }
  });
});
