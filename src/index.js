import './styles.css';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
window.addEventListener('mousemove', event => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

// d = sqrt(pow2(x2 - x1) + pow2(y2 - y1))

function calcDistance(x1, x2, y1, y2) {
	let xDist = x2 - x1;
	let yDist = y2 - y2;

	let hypotenuse = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

	return hypotenuse;
}

class Particle {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	update() {
		this.draw();
	}
}

// Implementation
let particles;
function init() {
	particles = [];

	for (let i = 0; i < 400; i++) {
		const x = Math.random * innerWidth;
		const y = Math.random * innerHeight;

		particles.push(new Particle(x, y, 20, 'black'));
	}
}

let distance;

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	particles.forEach(element => {
		element.update();
	});
}

init();
animate();
