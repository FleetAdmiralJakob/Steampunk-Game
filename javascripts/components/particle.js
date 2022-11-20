export class Particle {
    constructor (game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.image = document.getElementById('gears')
        this.frameX = Math.floor(Math.random() * 3)
        this.frameY = Math.floor(Math.random() * 3)
        this.spriteSize = 50
        this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1)
        this.size = this.spriteSize * this.sizeModifier
        this.speedX = Math.random() * 6 - 3
        this.speedY = Math.random() * -15
        this.gravity = 0.5
        this.markedForDeletion = false
        this.angle = 0
        this.va = Math.random() * 0.2 - 0.1
        this.bounced = 0
        this.bottomBounceBoundary = Math.random() * 80 + 60
    }

    update () {
        this.angle += this.va
        this.speedY += this.gravity
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY
        if (this.y > this.game.height + this.size || this.x < 0 - this.size) this.markedForDeletion = true

        if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2) {
            this.bounced++
            this.speedY *= -0.7
        }
    }

    draw (context) {
        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.angle)
        context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * 0.5, this.size, this.size)
        context.restore()
    }
}