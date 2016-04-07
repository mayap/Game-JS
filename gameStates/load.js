/**
 * Created by maya on 26-Mar-16.
 */


var loadState = {
    preload: function () {
        var loadingLabel = game.add.text(80, 150, 'Loading...',
            {font: '30px Courier', fill: '#ffffff'});

        //game.load.image('background', 'assets/background.jpg');
    },
    
    create: function () {
        //game.state.start('menu');
       // this.background = this.add.tileSprite(0,0, this.world.width, this.world.height, 'background');
        game.state.start('startScreen');


    }
};