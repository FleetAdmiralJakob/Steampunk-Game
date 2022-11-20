import {Projectile} from "./projectile.js";

export class Player {
    constructor (game) {
        this.game = game
        this.width = 120
        this.height = 190
        this.x = 20
        this.y = 130
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 37

        this.speedY = 0
        this.maxSpeed = 2

        this.projectiles = []
        this.image = document.getElementById('player')

        this.powerUp = false
        this.powerUpTimer = 0
        this.powerUpLimit = 10000
    }

    update (deltaTime) {
        // Moves the player
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed
        else if (this.game.keys.includes('s')) this.speedY = this.maxSpeed
        else if (this.game.keys.includes('w')) this.speedY = -this.maxSpeed
        else this.speedY = 0

        this.y += this.speedY
        // Vertical Boundaries
        if (this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5
        else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5
        // Handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.update()
        })
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion)
        // Sprite animations
        if (this.frameX < this.maxFrame) {
            this.frameX++
        } else {
            this.frameX = 0
        }
        // Handle power ups
        if (this.powerUp) {
            if (this.powerUpTimer > this.powerUpLimit) {
                this.powerUpTimer = 0
                this.powerUp = false
                this.frameY = 0
                this.game.sound.powerDown()
            } else {
                this.powerUpTimer += deltaTime
                this.frameY = 1
                this.game.ammo += 0.1
            }
        }
    }

    draw (context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        // Draws the projectiles
        this.projectiles.forEach(projectile => {
            projectile.draw(context)
        })
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }

    shootTop () {
        // limited ammo
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30))
            this.game.ammo--
        }
        this.game.sound.shot()
        if (this.powerUp) this.shootBottom()
    }

    shootBottom () {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175))
            this.game.ammo--
        }
        if (this.powerUp) this.shootBottom()
    }

    enterPowerUp () {
        this.powerUpTimer = 0
        this.powerUp = true
        if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo
        this.game.sound.powerUp()
    }
}