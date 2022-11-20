export class SoundController {
    constructor () {
      this.powerUpSound = document.getElementById('powerup')
      this.powerDownSound = document.getElementById('powerdown')
      this.explosionSound = document.getElementById('explosion')
      this.shotSound = document.getElementById('shot')
      this.hitSound = document.getElementById('hit')
      this.shieldSound = document.getElementById('shield-sound')
    }

    powerUp () {
      this.powerUpSound.currentTime = 0
      this.powerUpSound.play()
    }

    powerDown () {
      this.powerDownSound.currentTime = 0
      this.powerDownSound.play()
    }

    explosion () {
      this.explosionSound.currentTime = 0
      this.explosionSound.play()
    }

    shot () {
      this.shotSound.currentTime = 0
      this.shotSound.play()
    }

    hit () {
      this.hitSound.currentTime = 0
      this.hitSound.play()
    }

    shield () {
      this.shieldSound.currentTime = 0
      this.shieldSound.play()
    }
  }