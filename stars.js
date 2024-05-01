// Array of quotes
const quotes = [
"The secret of getting ahead is getting started. - Mark Twain",
"The reward of a thing well done is to have done it. - Ralph Waldo Emerson",
"Quality is not an act, it's a habit. - Aristotle",
"It is not enough to be busy, so are the ants. The question is: What are we busy about? - Henry David Thoreau",
"Discipline is the bridge between goals and accomplishment. - Jim Rohn",
"Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
"Duty makes us do things well, but love makes us do them beautifully. - Zig Ziglar",
"An investment in knowledge pays the best interest. - Benjamin Franklin",
"I am always doing that which I cannot do, in order that I may learn how to do it. - Pablo Picasso",
"Most people who doubt you doubt you because they can't do it themselves. - David Goggins",
"I will not be outworked, period. - David Goggins",
"The only way to do great work is to love what you do. - Steve Jobs",
"Do. Or do not. There is no try. - Yoda",
"You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
"Believe you can and you're halfway there. - Theodore Roosevelt",
"In my experience, there's no such thing as luck. - Obi-Wan Kenobi",
"Your focus determines your reality. - Qui-Gon Jinn",
"Live long and prosper. - Spock",
"The greatest danger facing us is irrational fear of the unknown. - Captain Kirk",
"When we hit our lowest point, we are open to the greatest change. - Avatar Aang",
"Life happens wherever you are, whether you make it or not. - Iroh",
"Wake up with determination. Go to bed with satisfaction. - Unknown",
"Don't stop when you're tired. Stop when you're done. - David Goggins",
"Pride is not the opposite of shame, but its source. True humility is the only antidote to shame. - Uncle Iroh",
"Stay hard. - David Goggins",
"The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius",
"The key is to keep company only with people who uplift you, whose presence calls forth your best. - Epictetus",
"I carry God so I fear nothing. - Arya Starr"
];

// Selecting a random quote
let currentQuoteIndex = Math.floor(Math.random() * quotes.length);
const headerElement = document.getElementById("header");
headerElement.innerText = quotes[currentQuoteIndex];

// Change quote on canvas click
const canvas = document.getElementById('background');
canvas.addEventListener('click', () => {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  headerElement.innerText = quotes[currentQuoteIndex];
});

// Canvas setup
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numParticles = 300;
const particles = [];

let mouseX = 0;
let mouseY = 0;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 3 + 1;
    if (Math.random() > 0.8) {
      this.radius = Math.random() * 0.75 + 0.5;
    } else {
      this.radius = Math.random() * 0.5 + 0.25;
    }
  }

  update() {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 50) {
      this.x += dx / distance * 2;
      this.y += dy / distance * 2;
    } else {
      this.x -= this.speed;
    }
    if (this.x <= -this.radius) {
      this.x = canvas.width + this.radius;
      this.y = Math.random() * canvas.height;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
  }
}

for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const particle of particles) {
    particle.update();
    particle.draw();
  }
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});
