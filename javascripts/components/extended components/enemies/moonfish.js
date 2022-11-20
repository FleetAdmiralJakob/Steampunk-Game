import {Enemy} from "../../enemy.js";

export class MoonFish extends Enemy {
    constructor (game) {
        super(game)
        this.width = 227
        this.height = 240
        this.y = Math.random() * (this.game.height * 0.95 - this.height)
        this.image = document.getElementById('moon-fish')
        this.frameY = 0
        this.lives = 10
        this.score = this.lives
        this.speedX = Math.random() * -1.2 - 2
        this.type = 'moon'
    }
}