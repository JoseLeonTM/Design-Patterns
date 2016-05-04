/**
 * Created by Jose Leon on 5/4/2016.
 */

function draw() {

    function chooseFigure(){
        var figure= document.getElementsByName('figure');
        var figures = document.getElementsByTagName('input');
        console.log(figure);
        for(var i=0; i<figures.length;i++){
            //if(figures[i].)
            //console.log(figures[i]);
        }
    }
    var canvas = document.querySelector('#canvas');
    if (canvas.getContext) var ctx = canvas.getContext('2d');

    chooseFigure();
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(10, 10, 55, 50);

}
draw();
