/**
 * Created by maya on 26-Mar-16.
 */

var menuState = {

    yCircle: '',
    bCircle: '',
    rCircle: '',
    islandLabel: '',

      preload: function () {
          game.load.image('yCircle', 'assets/circle.png');
          game.load.image('bCircle', 'assets/isle2.png');
          game.load.image('rCircle', 'assets/redCircle.png');

          this.load.image('button', 'assets/go-back-button.png');
      },

      create: function () {
          var nameLabel = game.add.text(80, 80, 'My first game',
              {font: '50px Arial', fill: '#fff'});

          var startLabel = game.add.text(80,game.world.height - 80, 'press w to start',
              {font: '25px Arial', fill: '#fff'});

          var button = game.add.button(200, 200, 'button', this.back);

          //var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

          game.input.mouse.capture = true;

/*

circles to become buttons !!!!!!!!!!!!!!!!!!!!!!!!!!!


 */



           yCircle = game.add.sprite(600, 340, 'yCircle');
           bCircle = game.add.sprite(700, 170, 'bCircle');
           rCircle = game.add.sprite(1100, 150, 'rCircle');

           islandLabel = game.add.text(bCircle.position.x, bCircle.position.y-100, 'first island',
              {font: '25px Arial', fill: '#fff'});


          //  Moves the image anchor to the middle, so it centers inside the game properly
         // image.anchor.set(0.5);
          yCircle.anchor.set(0.5);
          bCircle.anchor.set(0.5);
          rCircle.anchor.set(0.5);
          //  Enables all kind of input actions on this image (click, etc)
         // image.inputEnabled = true;

          yCircle.inputEnabled = true;
          bCircle.inputEnabled = true;
          rCircle.inputEnabled = true;

         // text = game.add.text(250, 16, '', { fill: '#ffffff' });

          //image.events.onInputDown.add(listener, this);





          //wKey.onDown.addOnce(this.start, this);
      },

    update: function () {
        yCircle.events.onInputOver.add(function (yCircle) {
            yCircle.input.useHandCursor = true;

            console.log('yes');

        }, this);


        bCircle.events.onInputOver.add(function (bCircle) {
            islandLabel.visible = true;
        }, this);


        yCircle.events.onInputDown.add(this.yCircleListener, this);
        bCircle.events.onInputDown.add(this.bCircleListener, this);
        rCircle.events.onInputDown.add(this.rCircleListener, this);
    },


    yCircleListener: function () {
        console.log('yellow clicked');
        game.state.start('firstTown');
    },
    bCircleListener: function () {
        console.log('blue clicked');
    },
    rCircleListener: function () {
        console.log('red clicked');
    },

      /*start: function () {
          game.state.start('play');
      },*/
/*
    update: function () {
        if (yCircle.input.pointerOver()) {

        }
    },*/

    back: function () {
        game.state.start('startScreen');
    },

};