let nav = document.getElementById('navbaar')
;(headerSection = document.querySelector('header')),
  (window.onscroll = function () {
    // make navbar fixed & change logo color
    if (window.pageYOffset > headerSection.offsetHeight - 75) {
      nav.classList.add('active')
    } else {
      nav.classList.remove('active')
    }
  })

// contact form
const scriptURL =
  'https://script.google.com/macros/s/AKfycbwMxmPPrsc8u0fIOETI6Siq7rgMa06V53izKlvxgKTv1d1fr4WLZyostdzVUEgXxLLU5w/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg')

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      msg.innerHTML = '*Message sent sucessfully'
      setTimeout(() => {
        msg.innerHTML = ''
      }, 5000)
      form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

// background imgage//

var canvas
var context
var screenH
var screenW
var stars = []
var fps = 50
var numStars = 2000

$('document').ready(function () {
  // Calculate the screen size
  screenH = $(window).height()
  screenW = $(window).width()

  // Get the canvas
  canvas = $('#space')

  // Fill out the canvas
  canvas.attr('height', screenH)
  canvas.attr('width', screenW)
  context = canvas[0].getContext('2d')

  // Create all the stars
  for (var i = 0; i < numStars; i++) {
    var x = Math.round(Math.random() * screenW)
    var y = Math.round(Math.random() * screenH)
    var length = 1 + Math.random() * 3
    var opacity = Math.random()

    // Create a new star and draw
    var star = new Star(x, y, length, opacity)

    // Add the the stars array
    stars.push(star)
  }

  setInterval(animate, 1000 / fps)
})

/**
 * Animate the canvas
 */
function animate () {
  context.clearRect(0, 0, screenW, screenH)
  $.each(stars, function () {
    this.draw(context)
  })
}

function Star (x, y, length, opacity) {
  this.x = parseInt(x)
  this.y = parseInt(y)
  this.length = parseInt(length)
  this.opacity = opacity
  this.factor = 1
  this.increment = Math.random() * 0.03
}

Star.prototype.draw = function () {
  context.rotate((Math.PI * 1) / 5)

  context.save()

  context.translate(this.x, this.y)

  if (this.opacity > 1) {
    this.factor = -1
  } else if (this.opacity <= 0) {
    this.factor = 1

    this.x = Math.round(Math.random() * screenW)
    this.y = Math.round(Math.random() * screenH)
  }

  this.opacity += this.increment * this.factor

  context.beginPath()
  for (var i = 5; i--; ) {
    context.lineTo(0, this.length)
    context.translate(0, this.length)
    context.rotate((Math.PI * 2) / 10)
    context.lineTo(0, -this.length)
    context.translate(0, -this.length)
    context.rotate(-((Math.PI * 6) / 10))
  }
  context.lineTo(0, this.length)
  context.closePath()
  context.fillStyle = 'rgba(227, 27, 109, ' + this.opacity + ')'
  context.shadowBlur = 5
  context.shadowColor = '#ffff33'
  context.fill()

  context.restore()
}
