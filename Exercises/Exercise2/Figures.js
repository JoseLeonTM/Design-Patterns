/**
 * Created by Jose Leon on 5/4/2016.
 */


var canvas= document.querySelector('#canvas'); ////////THE CANVAS ELEMENT
var ctx = canvas.getContext('2d'); ////////////////THE CANVAS CONTEXT
ctx.fillStyle = "rgba(0,0,0,0.4)"; ///////////////////SET THE COLOR FOR THE FIGURES

var draggingCanvas=document.querySelector('#draggingCanvas');///////////////THE CANVAS USED TO DRAG FIGURES AROUND
draggingCanvas.addEventListener('mousedown',clickDown,false);////////////ADD A CLICK EVENT TO THE CANVAS ON TOP
draggingCanvas.addEventListener('mousemove',clickDrag,false);////////////ADD A CLICK EVENT TO THE CANVAS ON TOP
draggingCanvas.addEventListener('mouseup',clickUp,false);////////////ADD A CLICK EVENT TO THE CANVAS ON TOP
var draggingCtx=draggingCanvas.getContext('2d');/////////DRAWING CONTEXT FOR CANVAS ON TOP
draggingCtx.fillStyle = "rgba(0,0,200,0.4)"; ///////////////////SET THE COLOR FOR THE FIGURES ON THE DRAGGING CANVAS

var drag=null;
var figures=[]; //////////////////AN ARRAY WITH THE EXISTING FIGURES

var form=document.querySelector('form');
form.addEventListener('click',chooseFigure,false);
var chosenFigure=chooseFigure();

var figureBuilder={
    rectangle:Rectangle,
    square:Square,
    circle:Circle
};
/////////////////////////////FIGURE CONSTRUCTORS////////////////////////////
function Figure(x,y){
    this.origX=x;
    this.origY=y;
    //this.drag=false;
}
function Rectangle(){}
function Square(){}
function Circle(){}
Rectangle.prototype=Object.create(Figure.prototype);///////////////INHERITANCE FOR ALL FIGURES
Rectangle.prototype.constructor=Rectangle;
Square.prototype=Object.create(Figure.prototype);
Square.prototype.constructor=Square;
Circle.prototype=Object.create(Figure.prototype);
Circle.prototype.constructor=Circle;
///////////////PROTOTYPE METHODS FOR EACH FIGURE////////////////////
Rectangle.prototype.draw=function(ctx) {
    ctx.fillRect(this.origX - 60, this.origY - 30, 120, 60);
};
Rectangle.prototype.check=function(x,y) {
    if(x > this.origX-60 && x < this.origX+60 && y > this.origY-30 && y < this.origY+30)
        return this;
};
Square.prototype.draw=function(ctx) {
    ctx.fillRect(this.origX - 30, this.origY - 30, 60, 60);
};
Square.prototype.check=function(x,y) {
    if(x > this.origX-30 && x < this.origX+30 && y > this.origY-30 && y < this.origY+30)
        return this;
};
Circle.prototype.draw=function(ctx) {
    ctx.beginPath();
    ctx.arc(this.origX, this.origY, 30, 0, 2 * Math.PI);
    ctx.fill();
};
Circle.prototype.check=function(x,y) {
    if(Math.sqrt(Math.pow(x-this.origX,2)+(Math.pow(y-this.origY,2)))<30)
        return true;
};
Figure.prototype.drag=function (index){
    var dragFigure=figures.splice(index,1)[0];
    ctx.clearRect(0,0,600,500);
    for(var i=0;i<figures.length;i++){
        figures[i].draw(ctx);
    }
    dragFigure.draw(draggingCtx);
    return dragFigure;
    //dragFigure.drag=true;
    //dragFigure.draw(draggingCtx);
    //draggingCtx.
};
///////////////////////END OF FIGURE CONSTRUCTORS/////////////////////////

function chooseFigure(e){///////////////////////////CHECK WHICH FIGURE HAS BEEN SELECTED TO CREATE
    if (e) {
        if (e.target.name == 'figure') chosenFigure = e.target.value;
    }
    else {
        var figures = document.getElementsByTagName('input');
        for(var i=0;i<figures.length;i++){
            if(figures[i].checked) return figures[i].value;
        }
    }
}
function newFigure(x,y){
    var figure =new figureBuilder[chosenFigure];
    figure.origX=x;
    figure.origY=y;
    return figure;
}
function checkForFigures(x,y){
    //var exists;
    if(figures[0]) {
        for (var i = figures.length - 1; i >= 0; i--) {
            if (figures[i].check(x, y)) return i;
        }
    }
}
function clickDown(e){
    var x= e.pageX-(canvas.offsetLeft-canvas.scrollLeft);
    var y= e.pageY-(canvas.offsetTop-canvas.scrollTop);
    var existing=checkForFigures(x,y);
    if(existing!=undefined){
        drag=figures[existing].drag(existing);
    }
}
function clickDrag(e){
    if(drag!=null) {
        var x = e.pageX - (canvas.offsetLeft - canvas.scrollLeft);
        var y = e.pageY - (canvas.offsetTop - canvas.scrollTop);
        drag.origX=x;
        drag.origY=y;
        draggingCtx.clearRect(0,0,600,500);
        drag.draw(draggingCtx);
        if(x>600 || x<0 || y>500 || y<0) {
            draggingCtx.clearRect(0, 0, 600, 500);
            drag.draw(ctx);
            figures.push(drag);
            drag = null;
        }
    }
}
function clickUp(e){
    if(drag) {
        draggingCtx.clearRect(0, 0, 600, 500);
        drag.draw(ctx);
        figures.push(drag);
        drag = null;
    }
    var x = e.pageX - (canvas.offsetLeft - canvas.scrollLeft);
    var y = e.pageY - (canvas.offsetTop - canvas.scrollTop);
    if(checkForFigures(x,y)==undefined) {
        var figure = newFigure(x,y);  /////////////////////GETTING THE CHOSEN FIGURE
        //figure.draw(figure);
        figure.draw(ctx);
        figures.push(figure); /////////ADD THE DRAWN FIGURE TO THE ARRAY
    }
}