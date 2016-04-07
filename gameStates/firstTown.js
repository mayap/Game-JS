/**
 * Created by maya on 03-Apr-16.
 */


var firstTown = {
    //player: '',
    map: '',
    mapBottomLayer: '',
    mapStairsLayer: '',
    mapBuildingsLayer: '',
    mapTopLayer: '',
    mapGroundDecorations: '',
    mapTopDecorations: '',
    //enemies: [],
    artefacts: [],

    fireButton: '',
    keys: '',
    scrolls: '',
    speedBoosts: '',

    invisible: '',

    keyCollected: false,
    scrollCollected: false,

    coins: '',

    mouse:'',

    speedBoosted: false,
    coinsText: '',
    /*player : (function(){
        var player;
        return player;
    })(),*/

    /*map : (function(){
        var map;
        return map;
    })(),

    mapBottomLayer : (function(){
        var mapBottomLayer;
        return mapBottomLayer;
    })(),

    mapStairsLayer : (function(){
        var mapStairsLayer;
        return mapStairsLayer;
    })(),

    mapBuildingsLayer : (function(){
        var mapBuildingsLayer;
        return mapBuildingsLayer;
    })(),

    mapTopLayer : (function(){
        var mapTopLayer;
        return mapTopLayer;
    })(),

    mapGroundDecorations : (function(){
        var mapGroundDecorations;
        return mapGroundDecorations;
    })(),

    mapTopDecorations : (function(){
        var mapTopDecorations;
        return mapTopDecorations;
    })(),*/

    preload: function () {

        game.load.tilemap('map', 'assets/town-map.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('tilesetImg', 'assets/magecity.png');
        game.load.image('additionalTiles', 'assets/magecity1.png');

       // game.load.spritesheet('character', 'assets/chars2.png', 48, 48, 36);
        game.load.spritesheet('character', 'assets/chars1.png', 48, 48, 12);

        //game.load.spritesheet('enemy', 'assets/heroes.png', 34, 33, 48);
        game.load.image('darkMonster', 'assets/darkMonster.png');
        game.load.spritesheet('enemy', 'assets/EnemySpriteSheet2.png', 30, 30);

        game.load.image('key1', 'assets/key1.png');
        game.load.image('scroll', 'assets/scroll.png');

        game.load.image('invisible', 'assets/key1.png');

    /*    game.load.image('speedBoost', 'assets/speedBoost.png');*/
        game.load.image('speedBoost', 'assets/elixir.png');

        //game.load.image('coin', 'assets/coin.png');
        game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

        game.load.image('singleCoin', 'assets/singleCoin.png');


    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('Town', 'tilesetImg');
        this.map.addTilesetImage('Town additional stuff', 'additionalTiles');

        this.mapBottomLayer = this.map.createLayer('bottom');
        this.mapStairsLayer = this.map.createLayer('stairs');
        this.mapBuildingsLayer = this.map.createLayer('buildings');
        this.mapTopLayer = this.map.createLayer('top');
        this.mapGroundDecorations = this.map.createLayer('ground-decorations');
        this.mapTopDecorations = this.map.createLayer('top-decorations');

        this.mapBottomLayer.resizeWorld();
        this.mapStairsLayer.resizeWorld();
        this.mapBuildingsLayer.resizeWorld();
        this.mapTopLayer.resizeWorld();
        this.mapGroundDecorations.resizeWorld();
        this.mapTopDecorations.resizeWorld();

       // speed = 120;



        player = game.add.sprite(300, 200, 'character');
        //300 x 200
        //za coins: 235 x 550

        /*player.animations.add('left', [8, 9, 10], 10, true);
        player.animations.add('right', [16, 17, 18], 10, true);
        player.animations.add('up', [24, 25, 26], 10, true);
        player.animations.add('down', [0, 1, 2], 10, true); */

        player.animations.add('left', [3, 4, 5], 10, true);
        player.animations.add('right', [6, 7, 8], 10, true);
        player.animations.add('up', [9, 10, 11], 10, true);
        player.animations.add('down', [0, 1, 2], 10, true);

        game.physics.enable(player, Phaser.Physics.ARCADE);

        game.camera.follow(player);

        //this.enemies = game.add.group();

        //this.enemies.enableBody = true;


        this.coinsText = game.add.text(1200, 45, playerCoins,
            {font: '25px Arial', fill: '#000'});





       /* this.mouse = game.add.physicsGroup();


            var c = this.mouse.create(350,360, 'enemy');
            c.body.mass = 0;
        c.body.immovable = true;


         var d = this.mouse.create(320, 360, 'enemy');

        d.body.mass = 0;*/


        cursors = game.input.keyboard.createCursorKeys();
       // this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.map.setCollisionByExclusion([], true, this.mapBuildingsLayer);
        this.map.setCollisionByExclusion([], true, this.mapTopLayer);
        this.map.setCollisionByExclusion([], true, this.mapGroundDecorations);


        this.keys = game.add.group();

        this.keys.enableBody = true;
        var key = this.keys.create(670, 620, 'key1');

        this.scrolls = game.add.group();

        this.scrolls.enableBody = true;
        var scroll = this.scrolls.create(240, 950, 'scroll');

        this.invisible = game.add.group();
        this.invisible.enableBody = true;
        var invis = this.invisible.create(610, 120,'invisible');
        invis.visible = false;

        this.speedBoosts = game.add.group();
        this.speedBoosts.enableBody = true;
        var speedBoost1 = this.speedBoosts.create(200, 300, 'speedBoost');
        var speedBoost3 = this.speedBoosts.create(600, 290, 'speedBoost');
        var speedBoost2 = this.speedBoosts.create(1150, 320, 'speedBoost');

        this.coins = game.add.group();
        this.coins.enableBody = true;

        var singleCoin = this.coins.create(1160, 40, 'coin');



        var coin1 = this.coins.create(240, 600, 'coin');
        var coin2 = this.coins.create(240, 640, 'coin');
        var coin3 = this.coins.create(240, 680, 'coin');
        var coin4 = this.coins.create(240, 720, 'coin');

        var coin5 = this.coins.create(470, 530, 'coin');
        var coin6 = this.coins.create(470, 570, 'coin');

        var coin7 = this.coins.create(360, 1070, 'coin');
        var coin8 = this.coins.create(400, 1070, 'coin');

        var coin9 = this.coins.create(700, 970, 'coin');
        var coin10 = this.coins.create(780, 970, 'coin');

        var coin11 = this.coins.create(910, 800, 'coin');
        var coin12 = this.coins.create(910, 880, 'coin');

        var coin12 = this.coins.create(400, 300, 'coin');
        var coin12 = this.coins.create(460, 300, 'coin');
        var coin12 = this.coins.create(520, 300, 'coin');

        this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
        this.coins.callAll('animations.play', 'animations', 'spin');




















    },

    update: function () {



        if (game.physics.arcade.collide(player, this.mouse, this.collisionHandler, this.processHandler, this))
        {
            console.log('boom');
        }



        this.coinsText.setText(playerCoins);





        game.physics.arcade.collide(player, this.mapBuildingsLayer);
        game.physics.arcade.collide(player, this.mapTopLayer);
        game.physics.arcade.collide(player, this.mapGroundDecorations);
        //game.physics.arcade.collide(player, pandaCollisionGroup);


        //game.physics.arcade.collide(player, this.enemies);

        //game.physics.arcade.overlap(player, this.enemies, this.crash, null, this);

        game.physics.arcade.overlap(player, this.keys, this.collectKeys, null, this);

        game.physics.arcade.overlap(player, this.scrolls, this.collectScrolls, null, this);

        game.physics.arcade.overlap(player, this.invisible, this.enterDoor, null, this);

        game.physics.arcade.overlap(player, this.speedBoosts, this.tookSpeedBoost, null, this);

        game.physics.arcade.overlap(player, this.coins, this.takeCoin, null, this);


        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.up.isDown) {
            player.body.velocity.y = -speed;
            player.animations.play('up');
        } else if (cursors.down.isDown) {
            player.body.velocity.y = speed;
            player.animations.play('down');
        } else if (cursors.left.isDown) {
            player.body.velocity.x = -speed;
            player.animations.play('left');
        } else if (cursors.right.isDown){
            player.body.velocity.x = speed;
            player.animations.play('right');
        } else {
            player.animations.stop();
        }

        /*if (this.fireButton.isDown) {
            console.log('fireeee');
        }*/
    },

    collectKeys: function(player, key) {
        key.kill();
        this.keyCollected = true;

    },

    collectScrolls: function(player, scroll) {
        scroll.kill();
        this.scrollCollected = true;
    },

     enterDoor: function() {
         if (this.keyCollected) {
             if(localStorage.getItem('speed') == '120'){

                 localStorage.setItem('speed', speed);

             }

             else if(speed > localStorage.getItem('speed')){

                 localStorage.setItem('speed',speed);

             }

             game.state.start('mineRoom');
         }
    },
speeder1:'',
    tookSpeedBoost: function (player, speedBoost) {
        console.log(speedBoost.body.x);
        this.speeder1 = speedBoost.body.x;

        if(localStorage.getItem('speedBoost') == '120'){

            localStorage.setItem('speed', speed);

        }

        else if(speed > localStorage.getItem('speed')){

            localStorage.setItem('speed',speed);

        }

        speedBoost.kill();
        if (speed <= maxSpeed - 20) {
            speed += 30;
        }
        this.speedBoosted++;

    },

    takeCoin: function (player, coin) {
        coin.kill();
        playerCoins += 10;
        localStorage.setItem('playerCoins', playerCoins);
    },

    processHandler: function (player, veg) {

    return true;

},

 collisionHandler: function(player, veg) {
/*
    if (veg.frame == 17)
    {
        veg.kill();
    }*/

     return true;

},

};


