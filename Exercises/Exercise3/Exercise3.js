/**
 * Created by Jose Leon on 5/12/2016.
 */

//function dragableDivs(){
    //////////////////////////////////////////////DRAG FUNCTIONS////////////////////////////////////////
    var changes=[];

    var allowDrop= function(ev) {
        ev.preventDefault();
    };
    var drag= function(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    };
     var drop =function(ev) {
        ev.preventDefault();
        storeChanges();
        document.querySelector('#containerCommand').appendChild(document.getElementById(ev.dataTransfer.getData("text")));
    };
var apply = document.getElementById('apply');
apply.addEventListener('click',storeChanges,false);
var undo=document.querySelector('#undo');
undo.addEventListener('click',undoChanges,false);
var container=document.getElementById('containerCommand');

    function storeChanges(){
        changes.push({
            bordColor:document.getElementById('borderCOLOR').value,
            bordWidth:document.getElementById('borderWIDTH').value+"px",
            bordRadius:document.getElementById('borderRADIUS').value+"px",
            backColor:document.getElementById('backgroundCOLOR').value
        });
        applyChanges();
    }
    function undoChanges(){
        changes.splice(changes.length-1,1);
        applyChanges();
    }
    function applyChanges(){
        var change= changes[changes.length-1];

        var children=container.querySelectorAll('div');
        for(var i=0; i<children.length;i++) {
            children[i].style.borderColor = change.bordColor;
            children[i].style.borderWidth = change.bordWidth;
            children[i].style.borderRadius = change.bordRadius;
            children[i].style.backgroundColor = change.backColor;
        }
    }
//}