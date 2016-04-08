/**
 * Created by maya on 09-Apr-16.
 */

var greenUnderworld = {
    map: '',
    mapBottomLayer: '',
    mapWallsLayer: '',
    bomb1: '',

    droppingBomb: false,
    bombButton: '',

    enemy1:'',
    enemy2:'',

    killEnemy1: false,

    bombLabel: '',
    energyLabel: '',

    smallMaps:'',

    preload: function() {

        game.stage.backgroundColor = '#000';

        game.load.tilemap('map', 'assets/greenUnderworld.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('tilea4', 'assets/tilea4.png');
        game.load.image('tilea5', 'assets/tilea5.png');

        game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

        game.load.spritesheet('character', 'assets/organi11.png', 32, 32, 12);

        game.load.image('button', 'assets/go-back-button.png');

        game.load.spritesheet('bomb', 'assets/BombExploding.png', 32, 64, 13);
/*
        game.load.spritesheet('enemy', 'assets/EnemySpriteSheet2.png', 30, 30);*/

        game.load.spritesheet('characterEnemy', 'assets/organi11.png', 32, 32, 12);
/*
        game.load.image('smallMap', 'assets/smallMap.png');*/

        game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

    },


    create: function () {
        var button = game.add.button(game.width - 200, 20, 'button', this.back);
        //680 x 20

        this.energyLabel = game.add.text(game.width - 200, 160, 'Energy: ' + energy,
            {font: '25px Arial', fill: '#fff'});

        this.bombLabel = game.add.text(game.width - 200, 230, 'Bombs: ' + maxBombs,
            {font: '25px Arial', fill: '#fff'});

        coinsText = game.add.text(game.width - 200, 300, 'Coins: ' + playerCoins,
            {font: '25px Arial', fill: '#fff'});

        this.map = game.add.tilemap('map');

        this.map.addTilesetImage('tilea4', 'tilea4');
        this.map.addTilesetImage('tilea5', 'tilea5');

        this.mapBottomLayer = this.map.createLayer('bottom');
        this.mapWallsLayer = this.map.createLayer('walls');

        this.mapBottomLayer.resizeWorld();
        this.mapWallsLayer.resizeWorld();

        player = game.add.sprite(285, 230, 'character2');

        player.animations.add('left', [3, 4, 5], 10, true);
        player.animations.add('right', [6, 7, 8], 10, true);
        player.animations.add('up', [9, 10, 11], 10, true);
        player.animations.add('down', [0, 1, 2], 10, true);

        this.enemy1 = new Enemy(game, 32, 32, 'characterEnemy', 120, 544, +1, 'x', '');
        game.add.existing(this.enemy1);

        this.enemy2 = new Enemy(game, 32, 32, 'characterEnemy', 140, 544, +1, 'x', '');
        game.add.existing(this.enemy2);

      /*  this.smallMaps = game.add.group();
        this.smallMaps.enableBody = true;*/

        bombs = game.add.group();
        bombs.enableBody = true;

        coins = game.add.group();
        coins.enableBody = true;

       /* coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);*/

        game.physics.enable(player, Phaser.Physics.ARCADE);

        game.camera.follow(player);

        cursors = game.input.keyboard.createCursorKeys();
        this.bombButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.map.setCollisionByExclusion([], true, this.mapWallsLayer);
    },

    update: function () {
        game.physics.arcade.collide(player, this.mapWallsLayer);

       /* game.physics.arcade.overlap(player, this.smallMaps, this.collectScroll, null, this);*/

        game.physics.arcade.overlap(player, coins, takeCoin, null, this);

        coinsText.setText('Coins: ' + playerCoins);

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

/*
        if (game.physics.arcade.overlap(player, this.smallMaps, this.collectScroll, this))
        {
            this.smallMaps.kill();
        }*/

        if (cursors.up.isDown && energy>0) {
            distancePassed++;
            player.body.velocity.y = -200;
            player.animations.play('up');

        } else if (cursors.down.isDown && energy>0) {
            distancePassed++;
            player.body.velocity.y = 200;
            player.animations.play('down');

        } else if (cursors.left.isDown && energy>0 ) {
            distancePassed++;
            player.body.velocity.x = -200;
            player.animations.play('left');

        } else if (cursors.right.isDown && energy>0){
            distancePassed++;
            player.body.velocity.x = 200;
            player.animations.play('right');
        } else {
            player.animations.stop();
        }


        if (distancePassed > 100){
            distancePassed = 0;
            if (energy > 0) {
                this.energyLabel.setText("Energy: "+ (--energy));
            } else {
                player.animations.stop();
            }
        }

        if (this.bombButton.isDown && !this.dropping_bomb) {
            if(maxBombs > 0){
                this.bomb1 = bombs.create(player.body.x, player.body.y-32, 'bomb');
                /*  this.bomb = game.add.sprite(player.body.x, player.body.y-32, 'bomb');*/
                //this.bomb = game.add.sprite(player.body.x, player.body.y, 'bomb');
                var anim = this.bomb1.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8], 30, true);

                maxBombs -= 1;
                this.bombLabel.setText('Bombs: ' + maxBombs);

                anim.onStart.add(this.animationStarted, this);
                anim.onLoop.add(this.animationLooped, this);
                anim.onComplete.add(this.animationStopped, this);

                anim.play(10, false);

                this.dropping_bomb = true;

                console.log(anim);
            }
        }

        if (!this.bombButton.isDown && this.dropping_bomb) {
            this.dropping_bomb = false;
        }
    },

    animationStarted: function () {
        /*anim.play(10, false);*/
    },

    animationLooped: function(sprite, animation) {

        animation.loop = false;
        if (animation.loopCount === 2)
        {
            animation.loop = false;
        }
        else
        {
            animation.loop = false;
        }

    },

    animationStopped: function(sprite, animation) {
        sprite.kill();
    },

    render: function () {

    },

    functionToCall: function () {
        //bomb.animations.stop();
    },

    back: function() {
        game.state.start('firstTown');
        console.log('got back');
    },

    processHandler: function (player, veg) {

        return true;

    },

    collisionHandler: function(player, veg) {

        return true;

    },

    /*collectScroll: function (player, scroll) {
        scroll.kill();
    },*/
}

