const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.width = window.innerWidth;
ctx.height = window.innerHeight;

let circlesDrawn = [];

class Circle {
	constructor() {
		this.x = Math.random() * ctx.height;
		this.y = Math.random() * ctx.width;
		this.rad = Math.random() * 100 + 50;
		this.startAng = 0;
		this.endAng = 2*Math.PI;
	}
}


function distBetweenCircles(prev, cur) {
	let dist = Math.sqrt(((cur.x - prev.x) * (cur.x - prev.x)) + ((cur.y - prev.y) * (cur.y - prev.y)));
	return dist > (prev.rad + cur.rad) ? true : false;
}

function drawCircle(newCircle) {
	let c = newCircle; 
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#fff";
	if (c.rad < 50) {
		ctx.strokeStyle = "blue";
		ctx.fillStyle = "#000";
	}
	ctx.beginPath();
	ctx.arc(c.x, c.y, c.rad, c.startAng, c.endAng);
	ctx.fill();
	ctx.stroke();

	circlesDrawn.push(c);
}

function tryCircle() {

	let c = new Circle();

	if (circlesDrawn.length < 2) {
		drawCircle(c);
	} else {
		for (let i = 0; i < circlesDrawn.length; i++) {
			if (!distBetweenCircles(circlesDrawn[i], c)) {
				return;
			}
		}
		drawCircle(c);
	}
}

function draw(timestamp) {
	tryCircle();

	requestAnimationFrame(draw);
}

draw();
