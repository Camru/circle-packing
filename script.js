const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('slider');
const count = document.getElementById('count');
const area = document.getElementById('area');
const overdrive = document.getElementById('overdrive');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const MIN_RAD = 1;
const MAX_RAD = 50;
const CANVAS_AREA = CANVAS_HEIGHT * CANVAS_WIDTH;
const OVERDIVE_MAX = 15000;
const NORMAL_MAX = 5000;

let MAX_CIRCLES = slider.max;
let OVERDRIVE_STATE = false;
let CLEARING = false;

let lastValue = 0;
let circlesDrawn = [];
let lastCount = circlesDrawn.length;

class Circle {
	constructor() {
		this.x = Math.random() * CANVAS_WIDTH;
		this.y = Math.random() * CANVAS_HEIGHT;
		this.rad = Math.random() * MAX_RAD + MIN_RAD;
		this.startAng = 0;
		this.endAng = 2*Math.PI;
		this.color = getRandomColor();
	}
}

function getRandomColor() {
    const colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#16a085", 
    				"#27ae60", "#2980b9", "#8e44ad", "#f1c40f", "#e67e22", 
    				"#e74c3c", "#ecf0f1", "#f39c12", "#d35400", "#c0392b"];
    return colors[Math.floor(Math.random() * 16)];
}

function sliderUpdate(val) {
	const curr = +val;
	if (curr === 0) {
		reset();
	} else if (curr >= lastValue) {
		while (circlesDrawn.length < val) {
			fitCircle();
		}
	} else {
	 let dtVal = lastValue - val;
	 let j  = 0;
	 	for (let i = dtVal; i > 0; i--) {
			circlesDrawn.pop();
		}
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		while (j < circlesDrawn.length) {
			drawCircle(circlesDrawn[j]);
			j++;
		}
	}
	lastValue = curr;
}

function isValid(cur) {
	for (let i = 0; i < circlesDrawn.length; i++) {
		const prev = circlesDrawn[i];
		const dx = cur.x - prev.x;
		const dy = cur.y - prev.y;
		const diff = Math.sqrt(dx*dx + dy*dy);
		if (diff < (prev.rad + cur.rad)) {
			return false;
		} 
	}
	circlesDrawn.push(cur);
	return true;
}

function reset() {
	circlesDrawn.length = 0;
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	count.innerHTML = `Circles: ${circlesDrawn.length}`;
	area.innerHTML = `Pixels Left: ${CANVAS_AREA}`;
}

function toggleOverdrive() {
	OVERDRIVE_STATE = !OVERDRIVE_STATE;	
	if (OVERDRIVE_STATE) {
		slider.max = OVERDIVE_MAX;
		MAX_CIRCLES = OVERDIVE_MAX;
	} else {
		slider.max = NORMAL_MAX;
		MAX_CIRCLES = NORMAL_MAX;
	}
	overdrive.innerHTML = OVERDRIVE_STATE ? "Overdrive: ON" : "Overdrive: OFF";
}

function clearCircles() {
	CLEARING = true;
	reset();
	setTimeout(() => {CLEARING = false;}, 500);
	slider.value = 0;
}

function drawCircle(c) {
	ctx.fillStyle = c.color;
	ctx.beginPath();
	ctx.arc(c.x, c.y, c.rad, c.startAng, c.endAng);
	ctx.fill();
	count.innerHTML = `Circles: ${circlesDrawn.length}`;
	area.innerHTML = `Pixels Left: ${areaDifference()}`;
}

function autoFill() {
	if (CLEARING) return;
	let c = new Circle();

	while (!isValid(c)) {
		c.x = Math.random() * CANVAS_WIDTH;
		c.y = Math.random() * CANVAS_HEIGHT;
		c.rad = Math.random() * MAX_RAD + MIN_RAD;
	} 
	if (circlesDrawn.length <= MAX_CIRCLES) {
		drawCircle(c);
		slider.value = circlesDrawn.length;
	} else {
		return;
	}

	requestAnimationFrame(autoFill);
}

function areaDifference() {
	let circlesArea = 0;

	for (let i = 0; i < circlesDrawn.length; i++) {
		circlesArea += Math.PI * (circlesDrawn[i].rad * circlesDrawn[i].rad);
	}

	return CANVAS_AREA - Math.floor(circlesArea);
}

function fitCircle(timestamp) {
	let c = new Circle();

	while (!isValid(c)) {
		c.x = Math.random() * CANVAS_WIDTH;
		c.y = Math.random() * CANVAS_HEIGHT;
		c.rad = Math.random() * MAX_RAD + MIN_RAD;
	} 

	drawCircle(c);
}
