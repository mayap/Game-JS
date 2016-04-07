/**
 * Created by maya on 26-Mar-16.
 */
var logo;
var startScreen = {

    preload: function () {
        this.load.image('button', 'assets/play_button.png');

     //   game.load.image('background', 'assets/background.jpg');
        game.load.image('logo', 'assets/logo3.png');

        game.load.image('island', 'assets/isle2.png');
        game.load.image('castle', 'assets/castle.png');
    },

    create: function () {
       // background = this.add.tileSprite(0,0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, 'background');
        /*var nameLabel = game.add.text(490, 180, 'Awesome game',
            {font: '50px Arial', fill: '#fff'});*/
        logo = this.add.image(450, 180, 'logo');

        var button = this.game.add.button(530, 280, 'button', this.start);

        island = game.add.sprite(850, 270, 'island');
        castle = game.add.sprite(0, 60, 'castle');
    },

    start: function () {
        //game.state.start('menu');
        game.state.start('firstTown');
    },

};