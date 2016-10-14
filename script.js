const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.width = window.innerWidth;
ctx.height = window.innerHeight;

let circlesDrawn = [];

class Circle {
	constructor() {
		this.x = Math.random() * ctx.height;
		this.y = Math.random() * ctx.width;
		this.rad = Math.random() * 100 + 10;
		this.startAng = 0;
		this.endAng = 2*Math.PI;
	}
}


function distanceGreaterThanRadii(prev, cur) {
	let dist = Math.sqrt(((cur.x - prev.x) * (cur.x - prev.x)) + ((cur.y - prev.y) * (cur.y - prev.y)));
	return dist > (prev.rad + cur.rad) ? true : false;
}

function drawCircle(newCircle) {
	let c = newCircle; 

	ctx.fillStyle = "#fff";

	ctx.strokeStyle = (c.rad) < 50 ? "blue" : "#000";
	ctx.fillStyle = (c.rad) < 50 ? "#000" : "blue";

	ctx.beginPath();
	ctx.arc(c.x, c.y, c.rad, c.startAng, c.endAng);
	ctx.fill();
	ctx.stroke();

	circlesDrawn.push(c);
}

function fitCircle() {
	let c = new Circle();
	const len = circlesDrawn.length;

	if (len < 2) {
		drawCircle(c);
	} else {
		for (let i = 0; i < len; i++) {
			if (!distanceGreaterThanRadii(circlesDrawn[i], c)) {
				return;
			}
		}
		drawCircle(c);
	}
}

function loop(timestamp) {
	fitCircle();

	requestAnimationFrame(loop);
}

loop();
