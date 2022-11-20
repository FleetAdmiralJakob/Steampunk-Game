import {InputHandler} from './components/inputhandler.js';
import {SoundController} from './components/soundcontroller.js';
import {Shield} from './components/shield.js';
import {Player} from './components/player.js';
import {Background} from './components/background.js';
import {UI} from './components/ui.js';
import {Particle} from './components/particle.js';
import {Drone} from "./components/extended components/enemies/drone.js";
import {Angler1} from "./components/extended components/enemies/angler1.js";
import {Angler2} from "./components/extended components/enemies/angler2.js";
import {HiveWhale} from "./components/extended components/enemies/hivewhale.js";
import {BulbWhale} from "./components/extended components/enemies/bulbwhale.js";
import {MoonFish} from "./components/extended components/enemies/moonfish.js";
import {LuckyFish} from "./components/extended components/enemies/luckyfish.js";
import {FireExplosion} from "./components/extended components/explosions/fireexplosion.js";
import {SmokeExplosion} from "./components/extended components/explosions/smokeexplosion.js";

class Game {
    constructor (width, height) {
        this.width = width
        this.height = height

        this.background = new Background(this)
        this.player = new Player(this)
        this.input = new InputHandler(this)
        this.ui = new UI(this)
        this.sound = new SoundController()
        this.shield = new Shield(this)

        this.keys = []
        this.enemies = []
        this.particles = []
        this.explosions = []

        this.enemyTimer = 0
        this.enemyInterval = 2000

        this.ammo = 20
        this.maxAmmo = 50
        this.ammoTimer = 0
        this.ammoInterval = 350

        this.gameOver = false

        this.score = 0
        this.winningScore = 100

        this.gameTime = 0
        this.timeLimit = 30000

        this.speed = 1
        this.debug = false

        // Music Stuff
        this.battle_music = new Audio('assets/music/battle.mp3')
        this.battle_music.loop = true
        this.battle_music.volume = 0.6
        this.musicIsPlaying = false
    }

    update (deltaTime) {
        // Play and Pause music
        this.musicIsPlaying = false
        if (!this.gameOver && !this.musicIsPlaying) {
            this.battle_music.play()
            this.musicIsPlaying = true
        }

        if (this.gameOver) this.battle_music.pause()

        if (!this.gameOver) this.gameTime += deltaTime
        if (this.gameTime > this.timeLimit) this.gameOver = true

        this.background.update()
        this.background.layer4.update()
        this.player.update(deltaTime)

        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) this.ammo++
            this.ammoTimer = 0
        } else {
            this.ammoTimer += deltaTime
        }

        this.shield.update(deltaTime)
        this.particles.forEach(particle => particle.update())
        this.particles = this.particles.filter(particle => !particle.markedForDeletion)

        this.explosions.forEach(explosion => explosion.update(deltaTime))
        this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion)

        this.enemies.forEach(enemy => {
            enemy.update()

            if (this.checkCollision(this.player, enemy)) {
                enemy.markedForDeletion = true
                this.addExplosion(enemy)
                this.sound.hit()
                this.shield.reset()

                for (let i = 0; i < 4; i++) {
                    this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
                }

                if (enemy.type === 'lucky-fish') this.player.enterPowerUp()
                else if (!this.gameOver) this.score--
            }
            this.player.projectiles.forEach(projectile => {
                if (this.checkCollision(projectile, enemy)) {
                    enemy.lives--
                    projectile.markedForDeletion = true

                    this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))

                    if (enemy.lives <= 0) {
                        for (let i = 0; i < 4; i++) {
                            this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
                        }

                        enemy.markedForDeletion = true
                        this.addExplosion(enemy)
                        this.sound.explosion()

                        if (enemy.type === 'moon') this.player.enterPowerUp()

                        if (enemy.type === 'hive-whale') {
                            for (let i = 0; i < 5; i++) {
                                this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height * 0.5))
                            }
                        }

                        if (!this.gameOver) this.score += enemy.score
                        // if (this.score > this.winningScore) this.gameOver = true;
                    }
                }
            })
        })
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy()
            this.enemyTimer = 0
        } else {
            this.enemyTimer += deltaTime
        }
    }

    draw (context) {
        this.background.draw(context)
        this.ui.draw(context)
        this.player.draw(context)
        this.shield.draw(context)
        this.particles.forEach(particle => particle.draw(context))
        this.enemies.forEach(enemy => {
            enemy.draw(context)
        })

        this.explosions.forEach(explosion => {
            explosion.draw(context)
        })

        this.background.layer4.draw(context)
    }

    /**
     * Adds a new enemy to the enemies array.
     * The enemy that is added is chosen randomly from the
     * five enemy types.
     */
    addEnemy () {
        const randomize = Math.random()
        // 0 - 0.3
        if (randomize < 0.3) this.enemies.push(new Angler1(this))
        // 0.3 - 0.6
        else if (randomize < 0.6) this.enemies.push(new Angler2(this))
        // 0.6 - 0.7
        else if (randomize < 0.7) this.enemies.push(new HiveWhale(this))
        // 0.7 - 0.8
        else if (randomize < 0.8) this.enemies.push(new BulbWhale(this))
        // 0.8 - 0.9
        else if (randomize < 0.9) this.enemies.push(new MoonFish(this))
        // 0.9 - 1
        else this.enemies.push(new LuckyFish(this))
    }

    // This code creates a random explosion from the SmokeExplosion or FireExplosion class
    // and adds it to the explosions array.
    // It is called when an enemy is destroyed.
    addExplosion (enemy) {
        // Randomize which type of explosion is created
        const randomize = Math.random()
        if (randomize < 0.5) {
            this.explosions.push(new FireExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
        } else {
            this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
        }
    }

    // This is a function that checks if two rectangles are colliding. It takes the two rectangles as arguments and returns a boolean value that indicates if the two rectangles are colliding or not.
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y
    }
}
export {Game}