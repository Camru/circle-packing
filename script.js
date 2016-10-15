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


function isValid(cur) {
	for (let i = 0; i < circlesDrawn.length; i++) {
		const prev = circlesDrawn[i];
		const dx = cur.x - prev.x;
		const dy = cur.y - prev.y;
		const diff = Math.sqrt(dx*dx + dy*dy);
		return diff > (prev.rad + cur.rad) ? true : false;
	}
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

	while (!isValid(c)) {
		c.x = Math.random() * ctx.height;
		c.y = Math.random() * ctx.width;
	} 

	drawCircle(c);

}

function loop(timestamp) {
	fitCircle();

	requestAnimationFrame(loop);
}

loop();
