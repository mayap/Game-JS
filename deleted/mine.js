var game = new Phaser.Game(880, 688, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
//640x640
//1312x1248
function preload() {

    game.load.tilemap('map', 'assets/mine.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('tilesetImg1', 'assets/magecity1.png');
    game.load.image('tilesetImg2', 'assets/rpgtileset.png');

    game.load.image('tilea4', 'assets/tilea4.png');
    game.load.image('tilea5', 'assets/tilea5.png');
    game.load.image('coal', 'assets/coal.png');
    game.load.image('goldd', 'assets/goldd.png');
    game.load.image('copper', 'assets/copper.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('maze floor', 'assets/maze floor.png');
    game.load.image('mine-floor', 'assets/mine-floor.png');
    //game.load.image('rsquare', 'assets/rsquare.png');

    //game.load.spritesheet('character', 'assets/chars2.png', 48, 48, 36);
    game.load.spritesheet('character', 'assets/organi11.png', 30, 32, 36);

    game.load.image('button', 'assets/go-back-button.png');

    game.load.spritesheet('bomb', 'assets/BombExploding.png', 32, 64, 13);


}

var player;

var map;
//var map2;
var mapBottomLayer;
var mapWallsLayer;
var mapCubesLayer;
//var mapCollisonLayer;
/*var mapBuildingsLayer;
var mapTopLayer;
var mapGroundDecorations;
var mapTopDecorations;*/

var bombs;
var droppingBomb = false;

var cursors;
var bombButton;

var energy = 20;
//var collision;
//var sprite;

function create() {

    var button = game.add.button(game.width - 200, 20, 'button', back());
    //680 x 20

    function back() {
        console.log('got back');
    };

    var energyLabel = game.add.text(game.width - 200, 160, 'Energy: ' + energy,
        {font: '25px Arial', fill: '#fff'});


    map = game.add.tilemap('map');

    map.addTilesetImage('magecity1', 'tilesetImg1');
    map.addTilesetImage('rpgtileset', 'tilesetImg2');
    map.addTilesetImage('tilea4', 'tilea4');
    map.addTilesetImage('tilea5', 'tilea5');
    map.addTilesetImage('coal', 'coal');
    map.addTilesetImage('goldd', 'goldd');
    map.addTilesetImage('copper', 'copper');
    map.addTilesetImage('diamond', 'diamond');
    map.addTilesetImage('maze floor', 'maze floor');
    map.addTilesetImage('mine-floor', 'mine-floor');
   // map.addTilesetImage('rsquare', 'rsquare');

    mapBottomLayer = map.createLayer('bottom');
    mapWallsLayer = map.createLayer('walls');
    mapCubesLayer = map.createLayer('cubes');
    //mapCollisonLayer = map.createLayer('collision');

    mapBottomLayer.resizeWorld();
    mapWallsLayer.resizeWorld();
    mapCubesLayer.resizeWorld();
    //mapCollisonLayer.resizeWorld();

    player = game.add.sprite(285, 185, 'character');

    player.animations.add('left', [8, 9, 10], 10, true);
    player.animations.add('right', [16, 17, 18], 10, true);
    player.animations.add('up', [24, 25, 26], 10, true);
    player.animations.add('down', [0, 1, 2], 10, true);





   // map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);
   // map.createFromObjects('collision', 'collision', collision);

    bombs = game.add.group();
    bombs.enableBody = true;

    //bombs = game.add.sprite(0, 0, 'bomb');

    //bombs.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8], 30, true);
    //bombs.visible = false;

    game.physics.enable(player, Phaser.Physics.ARCADE);

    game.camera.follow(player);

    /*enemy = game.add.group();
     enemy.enableBody = true;
     enemy.physicsBodyType = Phaser.Physics.ARCADE;

     var firstEnemy = enemy.create();*/

    cursors = game.input.keyboard.createCursorKeys();
    bombButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    map.setCollisionByExclusion([], true, mapWallsLayer);
    map.setCollisionByExclusion([], true, mapCubesLayer);
    /*map.setCollisionByExclusion([], true, collision);*/


}

function update() {

    game.physics.arcade.collide(player, mapWallsLayer);
    game.physics.arcade.collide(player, mapCubesLayer);
/*    game.physics.arcade.collide(player, collision);*/

    player.body.velocity.x = 0;
    //player.body.x = 0;
    player.body.velocity.y = 0;
    //player.body.y = 0;

    var direction;

    if (cursors.up.isDown) {
        player.body.velocity.y = -200;
        /*player.body.y += -32;*/
        player.animations.play('up');
        direction = 'up';

    } else if (cursors.down.isDown) {
        player.body.velocity.y = 200;
     //   player.body.y += 32;
        player.animations.play('down');
        direction = 'down';

    } else if (cursors.left.isDown) {
        player.body.velocity.x = -200;
      //  player.body.x += -32;
        player.animations.play('left');
        direction = 'left';

    } else if (cursors.right.isDown){
        player.body.velocity.x = 200;
      //  player.body.x += 32;
        player.animations.play('right');
        direction = 'right';

    } else {
        player.animations.stop();
        //console.log(player.body.x);
        //player.frame = 1;
    }

    if (bombButton.isDown && !this.dropping_bomb) {
        /*var bomb = new bombs;*/
         //var bomb = bombs.create(player.body.x, player.body.y, 'bomb');
        //bombs.visible = true;
        var bomb = bombs.create(player.body.x, player.body.y, 'bomb');
        // var bomb = game.add.sprite(player.body.x, player.body.y, 'bomb');
        bomb.animations.play('explode');
         console.log(bombs);
        map.removeTile(player.body.x, player.body.y + 32, mapCubesLayer);


         /* bomb = game.add.sprite(285);*/
        /*console.log(player.body.x);
         console.log(player.body.y);
        console.log();
        dropbomb();
        dropping_bomb = true;*/
        //bombs = game.add.sprite(player., ,'bomb');

        //bombs.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8], 30, true);


        //checkForTiles();

    }

    if (!bombButton.isDown && this.dropping_bomb) {
        dropping_bomb = false;
    }

}
/*
function back() {

   // game.state.start('menu');

}*/

function render() {

}

function dropbomb() {

}

function checkForTiles() {
    console.log('in');
    if(map.hasTile(player.body.x - 32, player.body.y, mapCubesLayer)) {
        console.log('left');
    } else {
        console.log('none on left side');
    }

}