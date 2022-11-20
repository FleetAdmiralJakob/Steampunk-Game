import {Explosion} from "../../explosion.js";

export class SmokeExplosion extends Explosion {
    constructor (game, x, y) {
        super(game, x, y)
        this.image = document.getElementById('smoke-explosion')
    }
}