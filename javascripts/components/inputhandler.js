export class InputHandler {
    constructor (game) {
        this.game = game
        window.addEventListener('keydown', e => {
            if ((
                (e.key === 'ArrowUp') ||
                (e.key === 'ArrowDown') ||
                (e.key === 'w') ||
                (e.key === 's')
            ) && this.game.keys.indexOf(e.key) === -1) {
                this.game.keys.push(e.key)
            } else if (e.key === ' ') {
                this.game.player.shootTop()
            } else if (e.key === 'e') {
                this.game.debug = !this.game.debug
            }
        })
        window.addEventListener('keyup', e => {
            if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
            }
        })
        window.addEventListener('w', e => {
            if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
            }
        })
        window.addEventListener('s', e => {
            if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
            }
        })
        window.addEventListener('touchstart', e => {

        })
        window.addEventListener('touchmove', e => {

        })
        window.addEventListener('touchend', e => {

        })
    }
}