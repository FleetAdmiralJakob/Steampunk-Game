import {Enemy} from "../../enemy.js";

export class Angler2 extends Enemy {
    constructor (game) {
        super(game)
        this.width = 213
        this.height = 165
        this.y = Math.random() * (this.game.height * 0.95 - this.height)
        this.image = document.getElementById('angler2')
        this.frameY = Math.floor(Math.random() * 2)
        this.lives = 6
        this.score = this.lives
    }
}