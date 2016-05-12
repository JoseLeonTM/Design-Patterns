/**
 * Created by Jose Leon on 5/11/2016.
 */
define(['Figures'],function(Figures){
    var figureHolder =document.querySelector('#canvas');
    var drawC= figureHolder.getContext('2d'); ////////////////THE CANVAS CONTEXT
    drawC.fillStyle = "rgba(0,0,0,0.4)"; ///////////////////SET THE COLOR FOR THE FIGURES

    var eventHolder=document.querySelector('#draggingCanvas');
    var dragC=eventHolder.getContext('2d');
    dragC.fillStyle = "rgba(0,0,200,0.4)"; ///////////////////SET THE COLOR FOR THE DRAGGING FIGURES

    eventHolder.addEventListener('mousedown',clickDown,false);
    eventHolder.addEventListener('mousemove',clickDrag,false);
    var body=document.querySelector('body');
    body.addEventListener('mouseup',clickUp,false);

    var drag=null; ////////////THE REFERENCE TO THE FIGURE THAT IS BEING DRAGGED

    var figureBuilder={ ////////////THE OBJECT THAT WE USE TO BUILD THE RIGHT TYPE OF FIGURE
        rectangle:Figures.Rectangle,
        square:Figures.Square,
        circle:Figures.Circle
    };
    var chosenFigure; ////HOLDS THE VAlUE OF THE SELECTED FIGURE IN THE INTERFACE
    chooseFigure();

    var form=document.querySelector('form');/////////A REFERENCE TO THE INTERFACE FORM
    form.addEventListener('click',chooseFigure,false);

    function chooseFigure(e){///////////////////////////CHANGES THE VALUE OF chosenFigure TO THE SELECTED FIGURE
        if (e) {
            if (e.target.name == 'figure') chosenFigure=e.target.value;
        }
        else {
            var options = document.getElementsByTagName('input');
            for(var i=0;i<options.length;i++){
                if(options[i].checked) chosenFigure= options[i].value;
            }
        }
    }
    function newFigure(x,y){////////////////////////////RETURNS A NEW FIGURE/////////////////
        var figure =new figureBuilder[chosenFigure];
        figure.origX=x;
        figure.origY=y;
        return figure;
    }
    function checkForFigures(x,y){////////////////////RETURNS THE INDEX OF THE figures ARRAY IF THERE IS A FIGURE IN THE POSITION
        //var exists;
        if(Figures.figures[0]) {
            for (var i = Figures.figures.length - 1; i >= 0; i--) {
                if (Figures.figures[i].check(x, y)) return i;
            }
        }
    }
    /////////////////////EVENT HANDLING FUNCTIONS/////////////////////////////
    function clickDown(e){
        var x= e.pageX-(figureHolder.offsetLeft-figureHolder.scrollLeft);
        var y= e.pageY-(figureHolder.offsetTop-figureHolder.scrollTop);
        var existing=checkForFigures(x,y);
        if(existing!=undefined){
            drag=Figures.figures.splice(existing, 1)[0];
            drag.draw(dragC);
            drawC.clearRect(0,0,600,500);
            for (var i = 0; i < Figures.figures.length; i++) {
                    Figures.figures[i].draw(drawC);
                }
        }
    }
    function clickDrag(e){
        if(drag!=null) {
            var x = e.pageX - (figureHolder.offsetLeft - figureHolder.scrollLeft);
            var y = e.pageY - (figureHolder.offsetTop - figureHolder.scrollTop);
            drag.origX=x;
            drag.origY=y;
            dragC.clearRect(0,0,600,500);
            drag.draw(dragC);
            if(x>600 || x<0 || y>500 || y<0) {
                dragC.clearRect(0, 0, 600, 500);
                drag.draw(drawC);
                figures.push(drag);
                drag = null;
            }
        }
    }
    function clickUp(e){
        if(drag) {
            dragC.clearRect(0, 0, 600, 500);
            drag.draw(drawC);
            Figures.figures.push(drag);
            drag = null;
        }
        var x = e.pageX - (figureHolder.offsetLeft - figureHolder.scrollLeft);
        var y = e.pageY - (figureHolder.offsetTop - figureHolder.scrollTop);
        if(checkForFigures(x,y)==undefined && x<600 && x>0 && y<500 && y>0) {
            var figure = newFigure(x,y);  /////////////////////GETTING THE CHOSEN FIGURE
            //figure.draw(figure);
            figure.draw(drawC);
            Figures.figures.push(figure); /////////ADD THE DRAWN FIGURE TO THE ARRAY
        }
    }
    ////////////END OF EVENT HANDLING FUNCTIONS/////////////////////////
});