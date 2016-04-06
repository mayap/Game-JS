var game = new Phaser.Game(1312, 1248, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

//640x640
//1312x1248

function preload() {

    game.load.tilemap('map', 'assets/town-map.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('tilesetImg', 'assets/magecity.png');
    game.load.image('additionalTiles', 'assets/magecity1.png');

    game.load.image('key1', 'assets/key1.png');
    game.load.image('scroll', 'assets/scroll.png');

    game.load.spritesheet('character', 'assets/chars2.png', 48, 48, 36);

    game.load.image('invisible', 'assets/key1.png');
}

var player;

var map;
var mapBottomLayer;
var mapStairsLayer;
var mapBuildingsLayer;
var mapTopLayer;
var mapGroundDecorations;
var mapTopDecorations;

var cursors;

var keys;
var scrolls;

var invisible;

var keyCollected = false;
var scrollCollected = false;
//var sprite;

function create() {

    map = game.add.tilemap('map');

    map.addTilesetImage('Town', 'tilesetImg');
    map.addTilesetImage('Town additional stuff', 'additionalTiles');


    mapBottomLayer = map.createLayer('bottom');
    mapStairsLayer = map.createLayer('stairs');
    mapBuildingsLayer = map.createLayer('buildings');
    mapTopLayer = map.createLayer('top');
    mapGroundDecorations = map.createLayer('ground-decorations');
    mapTopDecorations = map.createLayer('top-decorations');

    mapBottomLayer.resizeWorld();
    mapStairsLayer.resizeWorld();
    mapBuildingsLayer.resizeWorld();
    mapTopLayer.resizeWorld();
    mapGroundDecorations.resizeWorld();
    mapTopDecorations.resizeWorld();

    player = game.add.sprite(300, 200, 'character');

    player.animations.add('left', [8, 9, 10], 10, true);
    player.animations.add('right', [16, 17, 18], 10, true);
    player.animations.add('up', [24, 25, 26], 10, true);
    player.animations.add('down', [0, 1, 2], 10, true);


    game.physics.enable(player, Phaser.Physics.ARCADE);

    game.camera.follow(player);

    /*enemy = game.add.group();
    enemy.enableBody = true;
    enemy.physicsBodyType = Phaser.Physics.ARCADE;

    var firstEnemy = enemy.create();*/

    cursors = game.input.keyboard.createCursorKeys();

    map.setCollisionByExclusion([], true, mapBuildingsLayer);
    map.setCollisionByExclusion([], true, mapTopLayer);
    map.setCollisionByExclusion([], true, mapGroundDecorations);

    keys = game.add.group();

    keys.enableBody = true;
    var key = keys.create(670, 620, 'key1');

    scrolls = game.add.group();

    scrolls.enableBody = true;
    var scroll = scrolls.create(240, 950, 'scroll');


    invisible = game.add.group();
    invisible.enableBody = true;
    var invis = invisible.create(610, 120,'invisible');

}

function update() {

    game.physics.arcade.collide(player, mapBuildingsLayer);
    game.physics.arcade.collide(player, mapTopLayer);
    game.physics.arcade.collide(player, mapGroundDecorations);

    game.physics.arcade.overlap(player, keys, collectKeys, null, this);

    game.physics.arcade.overlap(player, scrolls, collectScrolls, null, this);

    game.physics.arcade.overlap(player, invisible, enterDoor, null, this);

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.up.isDown) {
        player.body.velocity.y = -200;
        player.animations.play('up');

    } else if (cursors.down.isDown) {
        player.body.velocity.y = 200;
        player.animations.play('down');

    } else if (cursors.left.isDown) {
        player.body.velocity.x = -200;
        player.animations.play('left');


    } else if (cursors.right.isDown){
        player.body.velocity.x = 200;
        player.animations.play('right');


    } else {
        player.animations.stop();
        player.frame = 1;
    }

}

function render() {

}

function collectKeys(player, key) {
    key.kill();
    keyCollected = true;
}

function collectScrolls(player, scroll) {
    scroll.kill();
    scrollCollected = true;
}

function enterDoor() {
    //game.state.start('mine');
    console.log('in');
}