/**
 * Created by Jose Leon on 5/4/2016.
 */

function draw() {
    var canvas = document.querySelector('#canvas');
    if (canvas.getContext) var ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(10, 10, 55, 50);

    ctx.fillStyle="rgba(0,200,150,0.5)";
    ctx.fillRect(30,30,55,50);
}

draw();