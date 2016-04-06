/**
 * Created by maya on 26-Mar-16.
 */

var bootState = {
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('load');

        game.stage.backgroundColor = '#92BED8';
    }
};