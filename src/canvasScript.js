
/**
 * Initialize the canvas and its context, set up event listeners, and define drawing functions.
 */
const canvas = document.getElementById('drawArea');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 500;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = "black";
let drawing = false;
let pathsry = [];
let points = [];
var img = new Image();
img.src = 'src/CitricAcid.jpg';
var mouse = { x: 0, y: 0 };
var previous = { x: 0, y: 0 };

/**
 * Get the mouse position relative to the canvas.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @param {MouseEvent} evt - The mouse event.
 * @returns {Object} - The mouse position object with x and y coordinates.
 */
function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

/**
 * Undo the last drawn path.
 * Removes the last path from the paths array and redraws the canvas.
 * @returns {void}
 */
function Undo() {
    // remove the last path from the paths array
    pathsry.splice(-1, 1);
    // draw all the paths in the paths array
    drawPaths();
}

/**
 * Draw all the paths stored in the paths array.
 * Clears the canvas and redraws the image before drawing the paths.
 * @returns {void}
 */
function drawPaths() {
    // delete everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // draw all the paths in the paths array
    pathsry.forEach(path => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
    })
}

/**
 * Event listener for mousedown to start drawing on the canvas.
 * Saves the previous mouse position and the current mouse position.
 * Saves the points in the points array.
 * @param {MouseEvent} e - The mouse event.
 * @listens mousedown
 * @returns {Object} - The mouse position object with x and y coordinates.
 */
canvas.addEventListener('mousedown', function (e) {
    drawing = true;
    previous = { x: mouse.x, y: mouse.y };
    mouse = oMousePos(canvas, e);
    points = [];
    points.push({ x: mouse.x, y: mouse.y })
});

/**
 * Event listener for mousemove to draw lines on the canvas.
 * Draws a line from the previous point to the current point.
 * Saves the points in the points array.
 * @param {MouseEvent} e - The mouse event.
 * @listens mousemove
 * @returns {Object} - The mouse position object with x and y coordinates.
 */
canvas.addEventListener('mousemove', function (e) {
    if (drawing) {
        previous = { x: mouse.x, y: mouse.y };
        mouse = oMousePos(canvas, e);
        // saving the points in the points array
        points.push({ x: mouse.x, y: mouse.y })
        // drawing a line from the previous point to the current point
        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
}, false);

/**
 * Event listener for mouseup to stop drawing on the canvas.
 * Pushes the points array into the paths array.
 * @listens mouseup
 */
canvas.addEventListener('mouseup', function () {
    drawing = false;
    pathsry.push(points);
}, false);

/**
 * Load the image onto the canvas.
*/
img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

/**
 * Calls the function to undo the last drawn path when the undo button is clicked.
 */
undo.addEventListener("click", Undo);