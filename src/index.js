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

class Circle {
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
let circle1;
let circle2;
function init() {
	circle1 = new Circle(300, 300, 100, 'black');
	circle2 = new Circle(undefined, undefined, 30, 'red');
}

let distance;

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	circle2.x = mouse.x;
	circle2.y = mouse.y;

	circle2.draw();
	circle1.draw();

	distance =
		calcDistance(circle1.x, circle2.x, circle1.y, circle2.y) <
		circle1.radius + circle2.radius;

	distance ? (circle1.color = 'blue') : (circle1.color = 'black');
}

init();
animate();
