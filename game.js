/**
 * Created by maya on 26-Mar-16.
 */

var game = new Phaser.Game(1350, 600, Phaser.AUTO, 'game-div');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('firstTown', firstTown);
game.state.add('mineRoom', mineRoom);
game.state.add('startScreen', startScreen);
game.state.add('play', playState);
game.state.add('win', winState);

game.state.start('boot');