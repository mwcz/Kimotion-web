define(['exports', 'module', 'threejs', 'mod', 'mods/fish/Sprite', 'mods/fish/FishSprite', 'mods/fish/BlueFishSprite', 'mods/fish/RedFishSprite', 'mods/fish/GoldFishSprite', 'mods/fish/PurpleFishSprite', 'mods/fish/SharkFishSprite', 'mods/fish/HandSprite', 'mods/fish/CoinParticle', 'mods/fish/ChestSprite', 'mods/fish/consts.js'], function (exports, module, _threejs, _mod2, _modsFishSprite, _modsFishFishSprite, _modsFishBlueFishSprite, _modsFishRedFishSprite, _modsFishGoldFishSprite, _modsFishPurpleFishSprite, _modsFishSharkFishSprite, _modsFishHandSprite, _modsFishCoinParticle, _modsFishChestSprite, _modsFishConstsJs) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var _Sprite = _interopRequireDefault(_modsFishSprite);

    var _FishSprite = _interopRequireDefault(_modsFishFishSprite);

    var _BlueFishSprite = _interopRequireDefault(_modsFishBlueFishSprite);

    var _RedFishSprite = _interopRequireDefault(_modsFishRedFishSprite);

    var _GoldFishSprite = _interopRequireDefault(_modsFishGoldFishSprite);

    var _PurpleFishSprite = _interopRequireDefault(_modsFishPurpleFishSprite);

    var _SharkFishSprite = _interopRequireDefault(_modsFishSharkFishSprite);

    var _HandSprite = _interopRequireDefault(_modsFishHandSprite);

    var _CoinParticle = _interopRequireDefault(_modsFishCoinParticle);

    var _ChestSprite = _interopRequireDefault(_modsFishChestSprite);

    var fishes = [];
    var score = 0;

    var params = {
        enableApi: true,
        apiHost: "localhost",
        numSharks: 2,
        numGolden: 2,
        numBlue: 3,
        numPurple: 2,
        numRed: 1,
        fishSpeed: 1
    };

    // Sounds stored
    var sound_underwater;
    var sound_bite;
    var sound_scream;
    var sound_coin;
    var sound_1up;
    var sound_over9000;
    var sound_cheer;

    var waitForSoundLoad = _modsFishConstsJs.WAIT_SOUND_LOAD_FRAMES;
    var ambientSoundPlaying = false;

    var fishMod = (function (_mod) {
        _inherits(fishMod, _mod);

        function fishMod(gfx) {
            _classCallCheck(this, fishMod);

            _mod.call(this, gfx);

            // enable 2D mode (see http://p5js.org/ for tutorials and such!)
            gfx.set(this, '2d');

            // setup config GUI
            gfx.conf.gui.add(params, "enableApi").name('Use API');
            gfx.conf.gui.add(params, "apiHost").name('API Host');
            this.addFishSliderGUI(gfx, 'numSharks', 'Num Sharks', _modsFishConstsJs.SHARK, _SharkFishSprite['default']);
            this.addFishSliderGUI(gfx, 'numGolden', 'Num Golden', _modsFishConstsJs.GOLD, _GoldFishSprite['default']);
            this.addFishSliderGUI(gfx, 'numBlue', 'Num Blue', _modsFishConstsJs.BLUE, _BlueFishSprite['default']);
            this.addFishSliderGUI(gfx, 'numPurple', 'Num Purple', _modsFishConstsJs.PURPLE, _PurpleFishSprite['default']);
            this.addFishSliderGUI(gfx, 'numRed', 'Num Red', _modsFishConstsJs.RED, _RedFishSprite['default']);
            gfx.conf.gui.add(params, 'fishSpeed', 0, 10).step(0.1).name('Fish Speed');

            // enable hand/object tracking
            this.add_effect('handtracking2d');

            // set your name and title for your mod so we can display it
            this.author = 'Jared Sprague';
            this.title = 'Fish';

            // init game vars
            ambientSoundPlaying = false;
            waitForSoundLoad = _modsFishConstsJs.WAIT_SOUND_LOAD_FRAMES;
            this.resetGameVars();

            // Create objects
            this.hand = new _HandSprite['default']();
            this.chest = new _ChestSprite['default']();

            // populate fish from initial params
            changeFishes(_modsFishConstsJs.SHARK, params.numSharks, _SharkFishSprite['default']);
            changeFishes(_modsFishConstsJs.GOLD, params.numGolden, _GoldFishSprite['default']);
            changeFishes(_modsFishConstsJs.BLUE, params.numBlue, _BlueFishSprite['default']);
            changeFishes(_modsFishConstsJs.PURPLE, params.numPurple, _PurpleFishSprite['default']);
            changeFishes(_modsFishConstsJs.RED, params.numRed, _RedFishSprite['default']);

            // initialize all the fishes initial positions, direction, speed
            this.initFish();

            // load images
            this.water_img = loadImage("mods/fish/assets/underwater1.jpg");
            this.hand.img = loadImage(this.hand.img_path);
            this.hand.img_red = loadImage(this.hand.img_red_path);
            this.hand.resetState();
            this.coin_img = loadImage("mods/fish/assets/coin.png");
            this.chest.img = loadImage(this.chest.img_path);
            this.chest.x = width / 2 - 150;
            this.chest.y = 5;

            // load sounds
            sound_underwater = loadSound('mods/fish/assets/sounds/underwater_amp.ogg');
            sound_bite = loadSound('mods/fish/assets/sounds/bite.ogg');
            sound_scream = loadSound('mods/fish/assets/sounds/whscream.ogg');
            sound_coin = loadSound('mods/fish/assets/sounds/coin.ogg');
            sound_1up = loadSound('mods/fish/assets/sounds/level_up.ogg');
            sound_over9000 = loadSound('mods/fish/assets/sounds/over9000.ogg');
            sound_cheer = loadSound('mods/fish/assets/sounds/cheer.ogg');

            // start up log
            console.log("Catch Some Fish!");
            console.log("height: " + height);
            console.log("width: " + width);

            this.drawStaticElements();
        }

        /**
         * Event handler for gui param slider to change fish counts
         */

        fishMod.prototype.update = function update(gfx) {
            _mod.prototype.update.call(this, gfx);
            this.totalFrames++;

            this.remaining = this.getTimeRemaining(gfx);

            clear(); // clear the screen to draw the new frame
            this.drawStaticElements();

            // give sounds a chance to load since we have no preload() function
            if (waitForSoundLoad > 0) {
                waitForSoundLoad--;
                return;
            } else {
                if (!ambientSoundPlaying) {
                    sound_underwater.loop();
                    ambientSoundPlaying = true;
                }
            }

            // check the time remaining
            if (this.remaining - _modsFishConstsJs.HIGHSCORE_TIME <= 30 && this.gameEndingWarning == 'none') {
                this.gameEndingWarning = 'display';
            } else if (this.remaining <= _modsFishConstsJs.HIGHSCORE_TIME && this.showHighScoreTable == 'none' && params.enableApi) {
                sound_underwater.stop();
                sound_cheer.play();
                this.postScore();
                this.getHighScores();
                this.showHighScoreTable = 'display';
                this.displayMessages();
                return;
            } else if (this.showHighScoreTable == 'display') {
                this.displayMessages();

                if (!gfx.conf.timer.enabled && this.remaining <= 0) {
                    // if not cycling mods, reset to start a new game
                    this.resetGameState();
                }

                return; // wait for game to end
            }

            // update all fish positions
            this.updateFish();

            // update any particles
            this.updateCoins(this.coins, function (coin) {
                return coin.y > 0 - coin.img_height;
            }, this.updateScore);
            this.updateCoins(this.negativeCoins, function (coin) {
                return coin.y < height;
            }, function () {});

            this.updateHand(gfx);

            for (var i = 0; i < fishes.length; ++i) {
                var fish = fishes[i];

                if (this.detectIntersect(fish)) {
                    if (fish.type == _modsFishConstsJs.SHARK) {
                        this.handleSharkBite(fish);
                    } else {
                        if (fish.type == _modsFishConstsJs.GOLD) {
                            sound_1up.play();
                        } else {
                            sound_coin.play();
                        }

                        for (var j = 0; j < fish.coin_num; j++) {
                            // create a new coin particle
                            var coin = this.createCoinParticle(fish.x, fish.y, 0, -0.2, random(-5, 5), random(-0.5, 3.5));
                            this.coins.push(coin);
                        }

                        // reset the fish position off screen
                        this.resetFish(fish);
                    }
                }
            }

            // Update the players score
            this.drawScore();

            this.displayMessages();
        };

        fishMod.prototype.resetGameVars = function resetGameVars() {
            score = 0;
            this.coins = [];
            this.negativeCoins = [];
            this.over9000AchievedState = 'none';
            this.gameEndingWarning = 'none';
            this.showHighScoreTable = 'none';
            this.displayMessageFrames = 0;
            this.highScores = null;
            this.totalFrames = 0;
            this.remaining = _modsFishConstsJs.TIME_LIMIT;
        };

        fishMod.prototype.resetGameState = function resetGameState() {
            this.resetGameVars();
            sound_underwater.loop();
            this.hand.resetState();
            this.initFish();
        };

        fishMod.prototype.getTimeRemaining = function getTimeRemaining(gfx) {
            var remaining_time = undefined;
            if (gfx.conf.timer.enabled) {
                // use the mod cycling timer
                remaining_time = floor(gfx.conf.timer.remaining * 60);
            } else {
                // use internal timer
                remaining_time = floor((_modsFishConstsJs.TIME_LIMIT * 60 - this.totalFrames) / 60);
            }

            if (remaining_time < 0) {
                remaining_time = 0;
            }

            return remaining_time;
        };

        fishMod.prototype.updateHand = function updateHand(gfx) {
            this.hand.x = gfx.hand.x;
            this.hand.y = gfx.hand.y;
            if (this.hand.toggle_frames > 0) {
                if (this.hand.img_swap_count > 0) {
                    this.hand.img_swap_count--;
                } else {
                    this.hand.img_swap_count = _modsFishConstsJs.HAND_IMG_SWAP_DELAY;
                    this.hand.toggleRedAnimatedImg();
                }
                this.hand.toggle_frames--;
            } else if (this.hand.recentSharkBite) {
                this.hand.resetState();
            }
            image(this.hand.img_red_animated, this.hand.x, this.hand.y);
        };

        fishMod.prototype.detectIntersect = function detectIntersect(fish) {
            return Math.abs(this.hand.centerX() - fish.centerX()) <= 100 && Math.abs(this.hand.centerY() - fish.centerY()) <= 100;
        };

        fishMod.prototype.initFish = function initFish() {
            for (var i = 0; i < fishes.length; ++i) {
                var fish = fishes[i];
                this.resetFish(fish);
            }
        };

        fishMod.prototype.drawStaticElements = function drawStaticElements() {
            background(this.water_img);
            // draw the treasure chest icon at the top
            image(this.chest.img, this.chest.x, this.chest.y);
            this.drawScore();
            this.drawTimeRemaining();
        };

        fishMod.prototype.updateFish = function updateFish() {
            for (var i = 0; i < fishes.length; ++i) {
                var fish = fishes[i];

                // draw and move the fish
                image(fish.img, fish.x -= fish.speed * params.fishSpeed, fish.y);

                // if off screen reset
                if (fish.direction == _modsFishConstsJs.LEFT && fish.x + fish.img_width <= 0) {
                    this.resetFish(fish);
                } else if (fish.direction == _modsFishConstsJs.RIGHT && fish.x > width + 10) {
                    this.resetFish(fish);
                }
            }
        };

        fishMod.prototype.createCoinParticle = function createCoinParticle(x, y, accel_x, accel_y, vel_x, vel_y) {
            var position = createVector(x, y);
            var acceleration = createVector(accel_x, accel_y);
            var velocity = createVector(vel_x, vel_y);
            return new _CoinParticle['default'](position, acceleration, velocity);
        };

        fishMod.prototype.resetFish = function resetFish(fish) {
            fish.resetOffScreen(width, height);
            fish.img = loadImage(fish.img_path);
        };

        fishMod.prototype.updateScore = function updateScore(coin) {
            score += coin.value;
        };

        fishMod.prototype.displayMessages = function displayMessages() {
            var text_x = width / 2 - 300;
            textSize(70);
            fill(255); // text color white

            if (text_x <= 0) {
                text_x = 10;
            }

            // IT'S OVER 9000!!!
            if (score > 9000 && this.over9000AchievedState == 'none') {
                this.over9000AchievedState = 'display';
                sound_over9000.play();
            }
            if (this.over9000AchievedState == 'display') {
                text("IT'S OVER 9000!!!!", text_x, height / 2);
                this.over9000AchievedState = this.updateMessageFrames();
            }
            // Game ending warning
            else if (this.gameEndingWarning == 'display') {
                    text("30 SECONDS LEFT!", text_x, height / 2);
                    this.gameEndingWarning = this.updateMessageFrames();
                }
                // Show high scores
                else if (this.highScoresReady()) {
                        this.drawHighScores();
                    }
        };

        fishMod.prototype.setTextSize = function setTextSize(text_size) {
            this.text_height = text_size;
            textSize(text_size);
        };

        fishMod.prototype.drawHighScores = function drawHighScores() {
            var text_x = width / 2 - 300;
            var text_y = 100;
            var len = this.highScores.length > 10 ? 10 : this.highScores.length;
            this.setTextSize(70);
            text("  WHO'S NEXT?", text_x, text_y += this.text_height);
            this.setTextSize(20);
            text(" ", text_x, text_y += this.text_height); // vertical spacer
            this.setTextSize(60); // make scores smaller
            text("HIGH SCORES", text_x, text_y += this.text_height);
            this.setTextSize(55); // make scores smaller
            var currentScoreShown = false;
            for (var i = 0; i < len; i++) {
                var obj = this.highScores[i];
                var h_score = obj.score;
                //TODO: handle the case when the current score is equal to a high-score
                if (!currentScoreShown && score >= h_score) {
                    // change text color to yellow to highlight users score
                    fill(255, 204, 0);
                    text(score + '  <-- YOUR SCORE!', text_x, text_y += this.text_height);
                    currentScoreShown = true;
                    fill(255); // text color white
                    if (score == h_score) {
                        continue; // don't double show, sometimes the api is really fast and the current score is included
                    }
                }
                text(h_score, text_x, text_y += this.text_height);
            }
        };

        fishMod.prototype.highScoresReady = function highScoresReady() {
            return this.showHighScoreTable == 'display' && this.highScores && this.highScores.constructor === Array && this.highScores.length > 0;
        };

        fishMod.prototype.updateMessageFrames = function updateMessageFrames() {
            this.displayMessageFrames++;
            if (this.displayMessageFrames >= _modsFishConstsJs.MESSAGE_FRAMES) {
                this.displayMessageFrames = 0;
                return 'done';
            } else {
                return 'display';
            }
        };

        fishMod.prototype.drawScore = function drawScore() {
            this.setTextSize(55);
            fill(255); // text color white

            // Draw to the right of the chest
            text(score, this.chest.x + this.chest.img_width + 10, this.text_height + 5);
        };

        fishMod.prototype.drawTimeRemaining = function drawTimeRemaining() {
            this.setTextSize(55);
            fill(255); // text color white

            // Draw to the right of the chest
            var time = this.remaining - _modsFishConstsJs.HIGHSCORE_TIME;
            if (time < 0) {
                time = 0;
            }
            text("TIME: " + time, this.chest.x + 400, this.text_height + 5);
        };

        fishMod.prototype.handleSharkBite = function handleSharkBite(shark) {
            if (this.hand.recentSharkBite || score <= 0) {
                return; // do nothing if we recently were bitten by shark
            }

            // Flash hand red
            this.hand.recentSharkBite = true;
            this.hand.toggle_frames = 100;
            this.hand.setRed();

            // play sounds
            sound_bite.play();
            sound_scream.play(0.5);

            // Remove coins
            for (var i = 0; i < shark.coin_penalty; i++) {
                var coin = this.createCoinParticle(this.chest.x, this.chest.y, 0, 0.1, random(-2, 2), random(-0.1, 11));
                score -= coin.value;
                this.negativeCoins.push(coin);
            }
            if (score < 0) {
                score = 0; // don't let score go negative
            }
        };

        fishMod.prototype.updateCoins = function updateCoins(coinArray, isVisibleCallback, offScreenCallback) {
            for (var i = coinArray.length - 1; i >= 0; i--) {
                var coin = coinArray[i];
                if (isVisibleCallback(coin)) {
                    coin.update();
                    image(this.coin_img, coin.x, coin.y);
                } else {
                    // coin is off screen, remove it from active array and add execute off screen callback
                    offScreenCallback(coin);
                    coinArray.splice(i, 1); //remove from array
                }
            }
        };

        fishMod.prototype.addFishSliderGUI = function addFishSliderGUI(gfx, paramName, label, fishType, fishSpriteClass) {
            gfx.conf.gui.add(params, paramName, 0, 5).step(1).name(label).onChange(function (value) {
                changeFishes(fishType, value, fishSpriteClass);
            });
        };

        fishMod.prototype.postScore = function postScore() {
            httpPost('http://' + params.apiHost + '/fishapi/highscores/', { "score": score }, "json");
        };

        fishMod.prototype.getHighScores = function getHighScores() {
            this.highScores = loadJSON('http://' + params.apiHost + '/fishapi/highscores/');
        };

        fishMod.prototype.destroy = function destroy(gfx) {
            _mod.prototype.destroy.call(this, gfx);
            sound_underwater.stop();

            //
            // clear any references to all objects, probably don't have to do this, just being paranoid
            //
            for (var i = 0; i < fishes.length; i++) {
                fishes[i] = null;
            }
            fishes = [];
            for (var i = 0; i < this.coins.length; i++) {
                this.coins[i] = null;
            }
            this.coins = null;

            for (var i = 0; i < this.negativeCoins.length; i++) {
                this.negativeCoins[i] = null;
            }
            this.negativeCoins = null;
        };

        return fishMod;
    })(_mod3['default']);

    module.exports = fishMod;
    function changeFishes(type, value, spriteClass) {
        console.log('changeFishes type: ' + type + ' ' + value);
        // clear current fish of type
        for (var i = fishes.length - 1; i >= 0; i--) {
            var fish = fishes[i];
            if (fish.type == type) {
                fishes.splice(i, 1);
            }
        }

        // add new number of fish
        for (var i = 0; i < value; i++) {
            var fishSprite = new spriteClass();

            fishSprite.resetOffScreen(width, height);
            fishSprite.img = loadImage(fishSprite.img_path);
            fishSprite.logInfo();
            fishes.push(fishSprite);
        }
    }
});
