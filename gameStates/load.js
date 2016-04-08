/**
 * Created by maya on 26-Mar-16.
 */


var loadState = {
    preload: function () {
        var loadingLabel = game.add.text(80, 150, 'Loading...',
            {font: '30px Courier', fill: '#ffffff'});

        //game.load.image('background', 'assets/background.jpg');

        // from mineRoom

        game.stage.backgroundColor = '#000';

        game.load.tilemap('mapMine', 'assets/mine2.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('tilea4', 'assets/tilea4.png');
        game.load.image('mine-floor', 'assets/mine-floor.png');

        game.load.spritesheet('character2', 'assets/organi11.png', 32, 32, 12);

        game.load.image('button', 'assets/go-back-button.png');

        game.load.spritesheet('bomb', 'assets/BombExploding.png', 32, 64, 13);

        game.load.spritesheet('enemy', 'assets/EnemySpriteSheet2.png', 30, 30);

        game.load.spritesheet('characterEnemy', 'assets/organi11.png', 32, 32, 12);

        game.load.image('scroll2', 'assets/scroll2.png');

        // from underworld

        /*game.stage.backgroundColor = '#000';*/

        game.load.tilemap('mapUnderworld', 'assets/underworld.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('rpgtileset', 'assets/rpgtileset.png');

        game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

      /*  game.load.spritesheet('character', 'assets/organi11.png', 32, 32, 12);*/

     /*   game.load.image('button', 'assets/go-back-button.png');*/

   /*     game.load.spritesheet('bomb', 'assets/BombExploding.png', 32, 64, 13);*/

        //game.load.spritesheet('enemy', 'assets/EnemySpriteSheet2.png', 30, 30);

      /*  game.load.spritesheet('characterEnemy', 'assets/organi11.png', 32, 32, 12);*/

        game.load.image('smallMap', 'assets/smallMap.png');


        // from underworld
    },
    
    create: function () {
        //game.state.start('menu');
       // this.background = this.add.tileSprite(0,0, this.world.width, this.world.height, 'background');
        game.state.start('startScreen');


    }
};