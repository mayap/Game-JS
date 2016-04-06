/**
 * Created by maya on 26-Mar-16.
 */

var loadState = {
    preload: function () {
        var loadingLabel = game.add.text(80, 150, 'Loading...',
            {font: '30px Courier', fill: '#ffffff'});
    },
    
    create: function () {
        //game.state.start('menu');
        game.state.start('startScreen');
    }
};