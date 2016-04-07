/**
 * Created by maya on 26-Mar-16.
 */

var playState = {
    create: function () {
      this.keyboard = game.input.keyboard;
    
      //this.player = game.add.sprite(16, 16, 'player');
      //game.physics.enable(this.player, Phaser.Physics.ARCADE);
    
      //this.win = game.add.sprite(256, 256, 'win');
      //game.physics.enable(this.win, Phaser.Physics.ARCADE);
        var nameLabel = game.add.text(80, 80, 'Playing.....',
            {font: '50px Arial', fill: '#fff'});
    },
    
    update: function () {
       // game.physics.arcade.overlap(this.player, this.win,this.Win, null, this);

        //some other code here
        //for the playing of the game
    },

    Win: function () {
        game.state.start('win');
    }
};