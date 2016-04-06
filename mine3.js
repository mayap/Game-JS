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
    game.load.spritesheet('character', 'assets/organi11.png', 32, 32, 12);
    game.load.spritesheet('characterEnemy', 'assets/organi11.png', 32, 32, 12);
    game.load.image('button', 'assets/go-back-button.png');

    //game.load.spritesheet('bomb', 'assets/BombExploding.png', 32, 64,13);
    game.load.spritesheet('bomb', 'assets/BombExploding.png', 32, 64,13);


}

var player;
var enemy;

var enemy_walking_speed = 120;
var   enemy_walking_distance = 544;
var   enemy_direction = +1;
var   enemy_axis = 'x';
var enemy_previous_position;

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

var bombs = [1];
var bomb;
var bomb1;
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
   // mapCubesLayer.resizeWorld();
    //mapCollisonLayer.resizeWorld();

    player = game.add.sprite(285, 185, 'character');

    player.animations.add('left', [3, 4, 5], 10, true);
    player.animations.add('right', [6, 7, 8], 10, true);
    player.animations.add('up', [9, 10, 11], 10, true);
    player.animations.add('down', [0, 1, 2], 10, true);

   // enemy = game.add.sprite(32, 32, 'characterEnemy');
   enemy = game.add.sprite(32, 32, 'characterEnemy');
    enemy.animations.add('left', [3, 4, 5], 10, true);
    enemy.animations.add('right', [6, 7, 8], 10, true);
    enemy.animations.add('up', [9, 10, 11], 10, true);
    enemy.animations.add('down', [0, 1, 2], 10, true);


   // map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);
   // map.createFromObjects('collision', 'collision', collision);

    bombs = game.add.group();
    bombs.enableBody = true;

    //bomb = game.add.sprite(0, 0, 'bomb');

 // var anim=  bomb.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8], 30, true);
 // anim.onComplete.add(functionToCall, this);
 // anim.killOnComplete=true;
	//bomb.animations.play('explode');
	

 enemy_previous_position = (enemy_axis === "x") ? enemy.x : enemy.y

   // bomb.visible = false;

    game.physics.enable(player, Phaser.Physics.ARCADE);
   game.physics.enable(enemy, Phaser.Physics.ARCADE);
    game.camera.follow(player);
	
	
	if (enemy_axis === "x") {
        enemy.body.velocity.x = enemy_direction  * enemy_walking_speed;
    } else {
        enemy.body.velocity.y = enemy_direction  * enemy_walking_speed;
    }

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
function collectCoin(player, coin) {

var a=coin.animations.currentFrame.index;
if(a==8){
	player.scale.setTo(1,1);
	playerX = player.body.x;
	playerY= player.body.y;
	bombX = coin.body.x;
	bombY = coin.body.y;
	if(playerX-bombX<=50 && playerY-bombY<=50 && playerX-bombX>=0 && playerY-bombY>=0 ){
		    player.kill();
	}
	 //coin.kill();

}else{
   // coin.kill();
   // player.kill();
   killEnemy1 = true;
   }
}
var killEnemy1 =false;
function switch_direction_Square() {
    "use strict";
    if (enemy_axis === "x") {
        enemy_previous_position = enemy.y;
		enemy_axis='y';
		enemy.body.velocity.x = 0;
        enemy.body.velocity.y = (enemy_direction  * enemy_walking_speed);
    } else {
		
        enemy_previous_position = enemy.x;
		enemy_axis='x';
		enemy.body.velocity.y  = 0;
		enemy_direction*=-1;
          enemy.body.velocity.x = (enemy_direction  * enemy_walking_speed);
		
		
    }
};
function switch_direction() {
    "use strict";
    if (enemy_axis === "x") {
        enemy_previous_position = enemy.x;
		//enemy.body.velocity.x = 0;
        enemy.body.velocity.x *= -1;
    } else {
        enemy_previous_position = enemy.y;
		//enemy.body.velocity.y  = 0;
        enemy.body.velocity.y *= -1;
    }
};
function update() {

    game.physics.arcade.collide(player, mapWallsLayer);
    game.physics.arcade.collide(player, mapCubesLayer);
	//game.physics.arcade.collide(enemy, mapWallsLayer);
   // game.physics.arcade.collide(enemy, mapCubesLayer);
	game.physics.arcade.overlap(enemy, bombs, collectCoin, null, this);
	
/*    game.physics.arcade.collide(player, collision);*/
var new_position;

   if (enemy.body.velocity.y > 0) {
        // walking down
        enemy.animations.play("down");
    } else if (enemy.body.velocity.y < 0) {
        // walking down
        enemy.animations.play("up");
    }
	
    if (enemy.body.velocity.x < 0) {
        // walking left
       // enemy.scale.setTo(-1, 1);
        enemy.animations.play("left");
    } else if (enemy.body.velocity.x > 0) {
        // walking right
      //  enemy.scale.setTo(1, 1);
        enemy.animations.play("right");
    }
	
	
	 new_position = (enemy_axis === "x") ? enemy.x : enemy.y;
    if (Math.abs(new_position - enemy_previous_position) >= enemy_walking_distance) {
     //  switch_direction();
	  switch_direction_Square();
    }
  // enemy.body.velocity.x = enemy_walking_speed;
  // enemy.body.velocity.y = 0;
    player.body.velocity.x = 0;
    //player.body.x = 0;
    player.body.velocity.y = 0;
    //player.body.y = 0;

    var direction;

    if (cursors.up.isDown) {
        player.body.velocity.y = -200;
		//player.scale.setTo(1, 1);
       //player.body.y += -32;
        player.animations.play('up');
        direction = 'up';

    } else if (cursors.down.isDown) {
        player.body.velocity.y = 200;
		
        //player.body.y += 32;
        player.animations.play('down');
        direction = 'down';

    } else if (cursors.left.isDown) {
        player.body.velocity.x = -200;
        //player.body.x += -32;
        player.animations.play('left');
        direction = 'left';

    } else if (cursors.right.isDown){
       player.body.velocity.x = 200;
       //player.body.x += 32;
        player.animations.play('right');
        direction = 'right';

    } 

	else {
        player.animations.stop();
        //console.log(player.body.x);
        //player.frame = 1;
    }

    if (bombButton.isDown && !this.dropping_bomb) {
        /*var bomb = new bombs;*/
         //var bomb = bombs.create(player.body.x, player.body.y, 'bomb');
        //bombs.visible = true;
       // bomb1 = bombs.create(player.body.x, player.body.y-32, 'bomb');
     //var bomb1  = game.add.sprite(player.body.x, player.body.y-32, 'bomb')
	
 bomb1 = bombs.create(player.body.x, player.body.y-32, 'bomb');
 
 //bomb1=game.add.sprite(player.body.x, player.body.y-32, 'bomb');
 //game.physics.arcade.overlap(enemy, bomb1, collectCoin, null, this);
  var anim =  bomb1.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8,9], 30, true);
 
 
   anim.onStart.add(animationStarted, this);
    anim.onLoop.add(animationLooped, this);
    anim.onComplete.add(animationStopped, this);
	

   
	//bomb1.animations.play('explode');
	anim.play(2, false);

		this.dropping_bomb = true;
		
		
		
        //var bomb = game.add.sprite(player.body.x, player.body.y, 'bomb');
       //bomb.animations.play('explode');
	   console.log(anim);
         console.log(bomb1);
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
        this.dropping_bomb = false;
		//bomb1.kill();
    }

}
/*
function back() {

   // game.state.start('menu');

}*/
function animationStarted(sprite, animation) {

   

}

function animationLooped(sprite, animation) {

animation.loop = false;
    if (animation.loopCount === 2)
    {
        animation.loop = false;
    }
    else
    {
        
        animation.loop = false;
    }

}

function animationStopped(sprite, animation) {

   
   console.log(sprite.x);
    console.log(sprite.y);
	//if(killEnemy1){
	//	enemy.kill();
	//}
	sprite.kill();
  // map.removeTile(x, y, layer)
 // map.removeAllLayers();

}
function render() {

}

function dropbomb() {

}
function functionToCall() {    bomb.animations.stop();}
function checkForTiles() {
    console.log('in');
    if(map.hasTile(player.body.x - 32, player.body.y, mapCubesLayer)) {
        console.log('left');
    } else {
        console.log('none on left side');
    }

}