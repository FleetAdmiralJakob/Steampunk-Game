import {Enemy} from "../../enemy.js";

export class LuckyFish extends Enemy {
    constructor (game) {
        super(game)
        this.width = 99
        this.height = 95
        this.y = Math.random() * (this.game.height * 0.95 - this.height)
        this.image = document.getElementById('lucky-fish')
        this.frameY = Math.floor(Math.random() * 2)
        this.lives = 5
        this.score = 15
        this.type = 'lucky-fish'
    }
}