/**
 * Created by maya on 08-Apr-16.
 */

var Enemy = function(game, x, y, texture, enemy_walking_speed, enemy_walking_distance, enemy_direction, enemy_axis, enemy_previous_position) {

    Phaser.Sprite.call(this, game, x, y, texture);

    this.animations.add('left', [3, 4, 5], 10, true);
    this.animations.add('right', [6, 7, 8], 10, true);
    this.animations.add('up', [9, 10, 11], 10, true);
    this.animations.add('down', [0, 1, 2], 10, true);

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.enemy_walking_speed = enemy_walking_speed;
    this.enemy_walking_distance = enemy_walking_distance;
    this.enemy_direction = enemy_direction;
    this.enemy_axis = enemy_axis;
    this.enemy_previous_position = enemy_previous_position;

    game.add.existing(this);

    this.enemy_previous_position = (this.enemy_axis === "x") ? this.x : this.y;

    if (this.enemy_axis === "x") {
        this.body.velocity.x = this.enemy_direction  * this.enemy_walking_speed;
    } else {
        this.body.velocity.y = this.enemy_direction  * this.enemy_walking_speed;
    }

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

    var new_position;

    if (this.body.velocity.y > 0) {
        this.animations.play("down");
    } else if (this.body.velocity.y < 0) {
        this.animations.play("up");
    }

    if (this.body.velocity.x < 0) {
        this.animations.play("left");
    } else if (this.body.velocity.x > 0) {
        this.animations.play("right");
    }

    new_position = (this.enemy_axis === "x") ? this.x : this.y;
    if (Math.abs(new_position - this.enemy_previous_position) >= this.enemy_walking_distance) {
        this.switchDirection();

        //this.switch_direction_Square();
    }

    game.physics.arcade.overlap(this, bombs, collectCoin, null, this);

    game.physics.arcade.overlap(player, this, collisionPlayerEnemy, null, this);

};

Enemy.prototype.switchDirection = function() {
    if (this.enemy_axis === "x") {
        this.enemy_previous_position = this.x;
        this.body.velocity.x *= -1;
    } else {
        this.enemy_previous_position = this.y;
        this.body.velocity.y *= -1;
    }
};

Enemy.prototype.switch_direction_Square = function() {

    if (this.enemy_axis === "x") {
        this.enemy_previous_position = this.y;
        this.enemy_axis='y';
        this.body.velocity.x = 0;
        this.body.velocity.y = (this.enemy_direction  * this.enemy_walking_speed);
    } else {

        this.enemy_previous_position = this.x;
        this.enemy_axis='x';
        this.body.velocity.y  = 0;
        this.enemy_direction*=-1;
        this.body.velocity.x = (this.enemy_direction  * this.enemy_walking_speed);

    }
};