/**
 * Created by Jose Leon on 5/12/2016.
 */

    //////////////////////////////////////////////DRAG FUNCTIONS////////////////////////////////////////
    var stored=[];///////WHERE EVERY CHANGE WILL BE STORED
//(function(){////////STORE THE FIRST STATE OF EVERY DIV AT THE BEGINNING
//    var leftContainer=document.getElementById('containerLeft');
//    for(var i=0; i<leftContainer.childElementCount;i++){
//        var child = leftContainer.children[i];
//        stored.push([{
//            bordColor:child.style.borderColor,
//            bordWidth:child.style.borderWidth,
//            bordRadius:child.style.borderRadius,
//            backColor:child.style.backgroundColor
//        }]);
//    }
//})();
var cCommands=document.getElementById('containerCommand'); ///////////////CONTAINER COMMAND REFERENCE
var cLeft=document.getElementById('containerLeft'); ///////////////CONTAINER COMMAND REFERENCE
//var apply = document.getElementById('apply');//////APPLY BUTTON//////////////
//apply.addEventListener('click',bindChanges('applyChanges'),false);
var undo=document.querySelector('#undo');//////UNDO BUTTON////////////
undo.addEventListener('click',bindChanges('undoChanges'),false);
document.body.addEventListener('mouseDown',checkAction,false);
///////////DRAGGING FUNCTIONS////////////////////
    var allowDrop= function(ev) {
        ev.preventDefault();
    };
    var drag= function(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    };
     var drop =function(ev) {
        ev.preventDefault();
         if((ev.target==cCommands || ev.target.parentNode==cCommands) && cCommands.childElementCount==0){
             cCommands.appendChild(document.getElementById(ev.dataTransfer.getData("text")));
         }
         else{
             cLeft.appendChild(document.getElementById(ev.dataTransfer.getData("text")));
         }
    };
////////END OF DRAGGING FUNCTIONS//////////////////


function checkAction(e){
    console.log("wf");
    console.log(e.target);
    //if(e.target.draggable){

    //}
}
function bindChanges(method){

}
var changes= {
    storeChanges:function(e){
    console.log(e.target);
    changes.push({
        bordColor: document.getElementById('borderCOLOR').value,
        bordWidth: document.getElementById('borderWIDTH').value + "px",
        bordRadius: document.getElementById('borderRADIUS').value + "px",
        backColor: document.getElementById('backgroundCOLOR').value
    });
    applyChanges();
    },
    undoChanges: function() {
        if (changes.length > 1){
            changes.splice(changes.length - 1, 1);
            applyChanges();
        }
    },
    applyChanges: function(){
        var change = changes[changes.length - 1];

        var children = container.querySelectorAll('div');
        for (var i = 0; i < children.length; i++) {
            children[i].style.borderColor = change.bordColor;
            children[i].style.borderWidth = change.bordWidth;
            children[i].style.borderRadius = change.bordRadius;
            children[i].style.backgroundColor = change.backColor;
        }
    }
};
