/**
 * Created by maya on 03-Apr-16.
 */
var coins;
var coinsText;

var firstTown = {
    //player: '',
    map: '',
    mapBottomLayer: '',
    mapStairsLayer: '',
    mapBuildingsLayer: '',
    mapTopLayer: '',
    mapGroundDecorations: '',
    mapTopDecorations: '',
    //artefacts: [],

    //fireButton: '',
    keys: '',
    scrolls: '',
    speedBoosts: '',

    speeder1:'',

    invisible: '',

    keyMineCollected: false,
    scrollCollected: false,

    speedBoosted: false,

    preload: function () {
        game.stage.backgroundColor = '#000';

        game.load.tilemap('map', 'assets/town-map.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('tilesetImg', 'assets/magecity.png');
        game.load.image('additionalTiles', 'assets/magecity1.png');

        game.load.spritesheet('character', 'assets/chars2.png', 48, 48, 36);

        //game.load.image('darkMonster', 'assets/darkMonster.png');
        //game.load.spritesheet('enemy', 'assets/EnemySpriteSheet2.png', 30, 30);

        game.load.image('key1', 'assets/key1.png');
        game.load.image('scroll', 'assets/scroll.png');

        game.load.image('invisible', 'assets/key1.png');

        game.load.image('speedBoost', 'assets/elixir.png');

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

        player = game.add.sprite(230, 600, 'character');

        //300 x 200
        //600 x 250 do glavna vrata na glavnata sgrada
        //480 x 490 za vtora sgrada - tazi po sredata
        //1000 x 1000 za nai dolnata kushta i mineRoom
        //za coins: 235 x 550

        player.animations.add('left', [8, 9, 10], 10, true);
        player.animations.add('right', [16, 17, 18], 10, true);
        player.animations.add('up', [24, 25, 26], 10, true);
        player.animations.add('down', [0, 1, 2], 10, true);

        game.physics.enable(player, Phaser.Physics.ARCADE);

        game.camera.follow(player);

        coinsText = game.add.text(1200, 45, playerCoins,
            {font: '25px Arial', fill: '#000'});

        cursors = game.input.keyboard.createCursorKeys();

        this.map.setCollisionByExclusion([], true, this.mapBuildingsLayer);
        this.map.setCollisionByExclusion([], true, this.mapTopLayer);
        this.map.setCollisionByExclusion([], true, this.mapGroundDecorations);

        this.keys = game.add.group();

        this.keys.enableBody = true;
        var key = this.keys.create(285, 630, 'key1');

        this.scrolls = game.add.group();

        this.scrolls.enableBody = true;
        var scroll = this.scrolls.create(240, 950, 'scroll');

        this.invisible = game.add.group();
        this.invisible.enableBody = true;

        var invis = this.invisible.create(610, 120,'invisible');
        //invis.visible = false;

        var invis2 = this.invisible.create(1185, 980, 'invisible');
        //invis2.visible = false;

        var invis3 = this.invisible.create(480, 440, 'invisible');
        //invis3.visible = false;

        this.speedBoosts = game.add.group();
        this.speedBoosts.enableBody = true;
        var speedBoost1 = this.speedBoosts.create(200, 300, 'speedBoost');
        var speedBoost3 = this.speedBoosts.create(600, 290, 'speedBoost');
        var speedBoost2 = this.speedBoosts.create(1150, 320, 'speedBoost');

        coins = game.add.group();
        coins.enableBody = true;

        var singleCoin = coins.create(1160, 40, 'coin');

        var coin1 = coins.create(240, 600, 'coin');
        var coin2 = coins.create(240, 640, 'coin');

        var coin3 = coins.create(240, 680, 'coin');
        var coin4 = coins.create(240, 720, 'coin');

        var coin5 = coins.create(470, 530, 'coin');
        var coin6 = coins.create(470, 570, 'coin');

        var coin7 = coins.create(360, 1070, 'coin');
        var coin8 = coins.create(400, 1070, 'coin');

        var coin9 = coins.create(700, 970, 'coin');
        var coin10 = coins.create(780, 970, 'coin');

        var coin11 = coins.create(910, 800, 'coin');
        var coin12 = coins.create(910, 880, 'coin');

        var coin12 = coins.create(400, 300, 'coin');
        var coin12 = coins.create(460, 300, 'coin');
        var coin12 = coins.create(520, 300, 'coin');

        console.log(this.invisible.getChildIndex(invis));

        coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
        coins.callAll('animations.play', 'animations', 'spin');

    },

    update: function () {

        coinsText.setText(playerCoins);

        game.physics.arcade.collide(player, this.mapBuildingsLayer);
        game.physics.arcade.collide(player, this.mapTopLayer);
        game.physics.arcade.collide(player, this.mapGroundDecorations);

        game.physics.arcade.overlap(player, this.keys, this.collectKeys, null, this);

        game.physics.arcade.overlap(player, this.scrolls, this.collectScrolls, null, this);

        game.physics.arcade.overlap(player, this.invisible.getChildAt(0), this.enterUnderwDoor, null, this);
        game.physics.arcade.overlap(player, this.invisible.getChildAt(1), this.enterMineDoor, null, this);
        game.physics.arcade.overlap(player, this.invisible.getChildAt(2), this.enterGreenUnderwDoor, null, this);

        game.physics.arcade.overlap(player, this.speedBoosts, this.tookSpeedBoost, null, this);

        game.physics.arcade.overlap(player, coins, takeCoin, null, this);


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

    },

    collectKeys: function(player, key) {
        key.kill();
        this.keyMineCollected = true;

    },

    collectScrolls: function(player, scroll) {
        scroll.kill();
        this.scrollCollected = true;
    },

    enterMineDoor: function() {

        game.state.start('mineRoom');

    },

    enterGreenUnderwDoor: function() {

        game.state.start('greenUnderworld');

    },

    enterUnderwDoor: function() {
        if (!this.keyMineCollected) {
            /*if(localStorage.getItem('speed') == '120'){

             localStorage.setItem('speed', speed);

             }

             else if(speed > localStorage.getItem('speed')){

             localStorage.setItem('speed',speed);

             }*/
            game.state.start('underworld');

        }
    },

    tookSpeedBoost: function (player, speedBoost) {
        console.log(speedBoost.body.x);
        this.speeder1 = speedBoost.body.x;

        /*if(localStorage.getItem('speedBoost') == '120'){

            localStorage.setItem('speed', speed);

        }

        else if(speed > localStorage.getItem('speed')){

            localStorage.setItem('speed',speed);

        }*/

        speedBoost.kill();
        if (speed <= maxSpeed - 20) {
            speed += 30;
        }
        this.speedBoosted++;

    },

    processHandler: function (player, veg) {
        return true;
    },

    collisionHandler: function(player, veg) {
        return true;
    },

};

function takeCoin(player, coin) {
    coin.kill();
    playerCoins += 10;
    /*localStorage.setItem('playerCoins', playerCoins);*/
};

