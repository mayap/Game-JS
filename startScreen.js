/**
 * Created by maya on 26-Mar-16.
 */

var startScreen = {

    preload: function () {
        this.load.image('button', 'assets/play_button.png');
    },

    create: function () {
        var nameLabel = game.add.text(490, 180, 'Awesome game',
            {font: '50px Arial', fill: '#fff'});

        var button = this.game.add.button(500, 250, 'button', this.start);
    },

    start: function () {
        game.state.start('menu');
    },

};