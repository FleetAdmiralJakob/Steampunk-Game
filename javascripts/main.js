import { Game } from './game.js'
window.addEventListener('load', function () {
  // canvas setup
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 1400
  canvas.height = 500

  const game = new Game(canvas.width, canvas.height)
  let lastTime = 0

  // Animation loop
  function animate (timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.draw(ctx)
    game.update(deltaTime)
    requestAnimationFrame(animate)
  }
  animate(0)
})