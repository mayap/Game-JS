/**
 * Created by maya on 26-Mar-16.
 */

var winState = {
    create: function () {
        var winLabel = game.add.text(80, 80, 'You won!!!',
            {font: '50px Arial', fill: '#fff'});

        var startLabel = game.add.text(80,game.world.height - 80, 'press w to start',
            {font: '25px Arial', fill: '#fff'});

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wKey.onDown.addOnce(this.restart, this);
    },

    restart: function () {
        game.state.start('menu');
    },
};
