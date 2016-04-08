/**
 * Created by maya on 26-Mar-16.
 */

var game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'game-div');
//1350 x 600

game.state.add('boot', bootState);
game.state.add('load', loadState);
/*game.state.add('menu', menuState);*/
game.state.add('startScreen', startScreen);
game.state.add('firstTown', firstTown);

game.state.add('mineRoom', mineRoom);
game.state.add('underworld', underworld);
game.state.add('greenUnderworld', greenUnderworld);

/*game.state.add('play', playState);*/
game.state.add('win', winState);

game.state.start('boot');