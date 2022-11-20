import {Explosion} from "../../explosion.js";

export class FireExplosion extends Explosion {
    constructor (game, x, y) {
        super(game, x, y)
        this.image = document.getElementById('fire-explosion')
    }
}