/**
 * Created by Jose Leon on 5/11/2016.
 */
var canvas=(function(){
    var drawC= document.querySelector('#canvas').getContext('2d'); ////////////////THE CANVAS CONTEXT
    var methodC=document.querySelector('#draggingCanvas');
    var dragC=methodC.getContext('2d');
    draggingCanvas.addEventListener('mousedown',clickDown,false);////////////ADD A CLICK EVENT TO THE CANVAS ON TOP
    draggingCanvas.addEventListener('mousemove',clickDrag,false);////////////ADD A CLICK EVENT TO THE CANVAS ON TOP
    draggingCanvas.addEventListener('mouseup',clickUp,false);////////////ADD A CLICK EVENT TO THE CANVAS ON TOP

    /////////////////////EVENT HANDLING FUNCTIONS/////////////////////////////
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
    ////////////END OF EVENT HANDLING FUNCTIONS/////////////////////////
})();