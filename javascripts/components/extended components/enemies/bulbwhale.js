import {Enemy} from "../../enemy.js";

export class BulbWhale extends Enemy {
    constructor (game) {
        super(game)
        this.width = 270
        this.height = 219
        this.y = Math.random() * (this.game.height * 0.95 - this.height)
        this.image = document.getElementById('bulb-whale')
        this.frameY = Math.floor(Math.random() * 2)
        this.lives = 20
        this.score = this.lives
        this.speedX = Math.random() * -1.2 - 0.2
    }
}