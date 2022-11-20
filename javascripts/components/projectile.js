export class Projectile {
    constructor (game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.width = 10
        this.height = 3
        this.speed = 3
        this.markedForDeletion = false
        this.image = document.getElementById('projectile')
    }

    update () {
        this.x += this.speed
        if (this.x > this.game.width * 0.8) this.markedForDeletion = true
    }

    draw (context) {
        context.drawImage(this.image, this.x, this.y)
    }
}