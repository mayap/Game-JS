var energy = 20;

var mineRoom = {
    map: '',
    mapBottomLayer: '',
    mapWallsLayer: '',
    mapCubesLayer: '',
    //bomb: '',
    bombs:'',
    droppingBomb: false,
    bombButton: '',

    //enemies:'',
    enemy: '',

    enemy_walking_speed: 120,
    enemy_walking_distance: 544,
    enemy_direction: +1,
    enemy_axis: 'x',
    enemy_previous_position: '',

    killEnemy1: false,

    bombLabel: '',
    energyLabel: '',

    preload: function() {

        game.stage.backgroundColor = '#000';

        game.load.tilemap('map', 'assets/mine2.json', null, Phaser.Tilemap.TILED_JSON);

      /*  game.load.image('tilesetImg1', 'assets/magecity1.png');
        game.load.image('tilesetImg2', 'assets/rpgtileset.png');*/

        game.load.image('tilea4', 'assets/tilea4.png');
        /*game.load.image('tilea5', 'assets/tilea5.png');
        game.load.image('coal', 'assets/coal.png');
        game.load.image('goldd', 'assets/goldd.png');
        game.load.image('copper', 'assets/copper.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('maze floor', 'assets/maze floor.png');*/
        game.load.image('mine-floor', 'assets/mine-floor.png');

        game.load.spritesheet('character', 'assets/organi11.png', 32, 32, 12);

        game.load.image('button', 'assets/go-back-button.png');

        game.load.spritesheet('bomb', 'assets/BombExploding.png', 32, 64, 13);

        game.load.spritesheet('enemy', 'assets/EnemySpriteSheet2.png', 30, 30);

        game.load.spritesheet('characterEnemy', 'assets/organi11.png', 32, 32, 12);



    },


    create: function () {
        var button = game.add.button(game.width - 200, 20, 'button', this.back);
        //680 x 20

        this.energyLabel = game.add.text(game.width - 200, 160, 'Energy: ' + energy,
            {font: '25px Arial', fill: '#fff'});

        this.bombLabel = game.add.text(game.width - 200, 230, 'Bombs: ' + maxBombs,
            {font: '25px Arial', fill: '#fff'});



        this.map = game.add.tilemap('map');
/*
        this.map.addTilesetImage('magecity1', 'tilesetImg1');
        this.map.addTilesetImage('rpgtileset', 'tilesetImg2');*/
        this.map.addTilesetImage('tilea4', 'tilea4');
    /*    this.map.addTilesetImage('tilea5', 'tilea5');
        this.map.addTilesetImage('coal', 'coal');
        this.map.addTilesetImage('goldd', 'goldd');
        this.map.addTilesetImage('copper', 'copper');
        this.map.addTilesetImage('diamond', 'diamond');
        this.map.addTilesetImage('maze floor', 'maze floor');*/
        this.map.addTilesetImage('mine-floor', 'mine-floor');

        this.mapBottomLayer = this.map.createLayer('bottom');
        this.mapWallsLayer = this.map.createLayer('walls');
 /*       this.mapCubesLayer = this.map.createLayer('cubes');*/

        this.mapBottomLayer.resizeWorld();
        this.mapWallsLayer.resizeWorld();

        player = game.add.sprite(285, 185, 'character');

        player.animations.add('left', [3, 4, 5], 10, true);
        player.animations.add('right', [6, 7, 8], 10, true);
        player.animations.add('up', [9, 10, 11], 10, true);
        player.animations.add('down', [0, 1, 2], 10, true);

        /*this.enemies = game.add.physicsGroup();


        var c = this.enemies.create(270,185, 'enemy');
        c.body.mass = 0;
        c.body.immovable = true;


        var d = this.enemies.create(260, 190, 'enemy');

        d.body.mass = 0;*/


        this.enemy = game.add.sprite(32, 32, 'characterEnemy');
        this.enemy.animations.add('left', [3, 4, 5], 10, true);
        this.enemy.animations.add('right', [6, 7, 8], 10, true);
        this.enemy.animations.add('up', [9, 10, 11], 10, true);
        this.enemy.animations.add('down', [0, 1, 2], 10, true);



        this.bombs = game.add.group();
        this.bombs.enableBody = true;



        this.enemy_previous_position = (this.enemy_axis === "x") ? this.enemy.x : this.enemy.y

        // bomb.visible = false;

        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        game.camera.follow(player);


        if (this.enemy_axis === "x") {
            this.enemy.body.velocity.x = this.enemy_direction  * this.enemy_walking_speed;
        } else {
            this.enemy.body.velocity.y = this.enemy_direction  * this.enemy_walking_speed;
        }


        cursors = game.input.keyboard.createCursorKeys();
        this.bombButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.map.setCollisionByExclusion([], true, this.mapWallsLayer);
    /*    this.map.setCollisionByExclusion([], true, this.mapCubesLayer);*/
    },

    update: function () {
        game.physics.arcade.collide(player, this.mapWallsLayer);
  /*      game.physics.arcade.collide(player, this.mapCubesLayer);*/
        game.physics.arcade.overlap(this.enemy, this.bombs, this.collectCoin, null, this);

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;




        var new_position;

        if (this.enemy.body.velocity.y > 0) {
            // walking down
            this.enemy.animations.play("down");
        } else if (this.enemy.body.velocity.y < 0) {
            // walking down
            this.enemy.animations.play("up");
        }

        if (this.enemy.body.velocity.x < 0) {
            // walking left
            // enemy.scale.setTo(-1, 1);
            this.enemy.animations.play("left");
        } else if (this.enemy.body.velocity.x > 0) {
            // walking right
            //  enemy.scale.setTo(1, 1);
            this.enemy.animations.play("right");
        }

        new_position = (this.enemy_axis === "x") ? this.enemy.x : this.enemy.y;
        if (Math.abs(new_position - this.enemy_previous_position) >= this.enemy_walking_distance) {
            //this.switch_direction();
             this.switch_direction_Square();
        }




        if (game.physics.arcade.collide(player, this.enemies, this.collisionHandler, this.processHandler, this))
        {
            console.log('boom');
        }


        var direction;

        if (cursors.up.isDown && energy>0) {
            distancePassed++;
            player.body.velocity.y = -200;
            player.animations.play('up');
            direction = 'up';

        } else if (cursors.down.isDown && energy>0) {
            distancePassed++;
            player.body.velocity.y = 200;
            player.animations.play('down');
            direction = 'down';

        } else if (cursors.left.isDown && energy>0 ) {
            distancePassed++;
            player.body.velocity.x = -200;
            player.animations.play('left');
            direction = 'left';

        } else if (cursors.right.isDown && energy>0){
            distancePassed++;
            player.body.velocity.x = 200;
            player.animations.play('right');
            direction = 'right';
        } else {
            player.animations.stop();
        }
if(distancePassed>100){
    distancePassed=0;
    if(energy>0){
        this.energyLabel.setText("Energy: "+ (--energy));
    }else{
        player.animations.stop();
    }
}
        var bomb1;

        if (this.bombButton.isDown && !this.dropping_bomb) {
            if(maxBombs>0){
            bomb1 = this.bombs.create(player.body.x, player.body.y-32, 'bomb');
          /*  this.bomb = game.add.sprite(player.body.x, player.body.y-32, 'bomb');*/
            //this.bomb = game.add.sprite(player.body.x, player.body.y, 'bomb');
            var anim = bomb1.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8], 30, true);

            maxBombs -= 1;
            this.bombLabel.setText('Bombs: ' + maxBombs);

            anim.onStart.add(this.animationStarted, this);
            anim.onLoop.add(this.animationLooped, this);
            anim.onComplete.add(this.animationStopped, this);

            anim.play(10, false);

            this.dropping_bomb = true;

            console.log(anim);
            console.log(bomb1);
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
        /*
         if (veg.frame == 17)
         {
         veg.kill();
         }*/

        return true;

    },







    collectCoin: function(player, coin) {

        var a = coin.animations.currentFrame.index;
        if (a == 8) {
            player.scale.setTo(1,1);
            playerX = player.body.x;
            playerY= player.body.y;
            bombX = coin.body.x;
            bombY = coin.body.y;
            if (playerX-bombX<=50 && playerY-bombY<=50 && playerX-bombX>=0 && playerY-bombY>=0 ){
                player.kill();
            }
            //coin.kill();

        } else {
            // coin.kill();
            // player.kill();
            this.killEnemy1 = true;
        }
    },

    switch_direction_Square: function() {

        if (this.enemy_axis === "x") {
            this.enemy_previous_position = this.enemy.y;
            this.enemy_axis='y';
            this.enemy.body.velocity.x = 0;
            this.enemy.body.velocity.y = (this.enemy_direction  * this.enemy_walking_speed);
        } else {

            this.enemy_previous_position = this.enemy.x;
            this.enemy_axis='x';
            this.enemy.body.velocity.y  = 0;
            this.enemy_direction*=-1;
            this.enemy.body.velocity.x = (this.enemy_direction  * this.enemy_walking_speed);

        }
    },

    switch_direction: function() {

        if (this.enemy_axis === "x") {
            this.enemy_previous_position = this.enemy.x;
            //enemy.body.velocity.x = 0;
            this.enemy.body.velocity.x *= -1;
        } else {
            this.enemy_previous_position = this.enemy.y;
            //enemy.body.velocity.y  = 0;
            this.enemy.body.velocity.y *= -1;
        }
    },








}
