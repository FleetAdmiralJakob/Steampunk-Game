import {Enemy} from "../../enemy.js";

export class HiveWhale extends Enemy {
    constructor (game) {
        super(game)
        this.width = 400
        this.height = 227
        this.y = Math.random() * (this.game.height * 0.95 - this.height)
        this.image = document.getElementById('hive-whale')
        this.frameY = 0
        this.lives = 20
        this.score = this.lives
        this.type = 'hive-whale'
        this.speedX = Math.random() * -1.2 - 0.2
    }
}