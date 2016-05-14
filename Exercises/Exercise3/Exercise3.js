/**
 * Created by Jose Leon on 5/12/2016.
 */

    //////////////////////////////////////////////DRAG FUNCTIONS////////////////////////////////////////
var stored=[];///////WHERE EVERY CHANGE WILL BE STORED
var cCommands=document.getElementById('containerCommand'); ///////////////CONTAINER COMMAND REFERENCE
var cLeft=document.getElementById('containerLeft'); ///////////////CONTAINER COMMAND REFERENCE
var options=document.getElementById('controllers');//////A REFERENCE TO THE CONTROLLERS DIV////////////
options.addEventListener('click',selectAction,false);
document.body.addEventListener('mousedown',selectAction,false);
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
function selectAction(e){
    switch (e.target.id){
        case 'subject1':changes.drag(e.target);
            break;
        case 'undo':if(e.type=='click') changes.undo();
            break;
        case 'borderWidth': changes.slide(e);
    }
}
var changes= {
    drag:function(element){
        stored.push({action:'drag', element:element, change:element.parentNode});
    },
    //storeChanges:function(e){
    //console.log(e.target);
    //changes.push({
    //    bordColor: document.getElementById('borderColor').value,
    //    bordWidth: document.getElementById('borderWidth').value + "px",
    //    bordRadius: document.getElementById('borderRadius').value + "px",
    //    backColor: document.getElementById('backgroundColor').value
    //});
    //},
    slide:function(event){
        var element=cCommands.firstElementChild;
        if(element) {
            if(event.type=='mousedown'){
                stored.push({
                    action: 'style',
                    element: element,
                    change: event.target,
                    value:element.style[event.target.id]
                });
            }
            if(event.type=='click'){
                element.style[event.target.id]=event.target.value+'px';
                if(event.target.value ==stored[stored.length-1].value) stored.splice(stored.length-1,1); /////REMOVED THE STORED DATA IF THE VALUE IS THE SAME
            }
        }
    },
    undo: function() {
        if (stored.length > 0) {
            switch (stored[stored.length - 1].action) {
                case 'drag':
                    undos.drag(stored.splice(stored.length - 1, 1)[0]);
                    break;
                case 'style':
                    undos.style(stored.splice(stored.length - 1, 1)[0]);
                    break;
                //}
                //var action = stored.splice(stored.length-1,1);
                //action.change.appendChild(action.element);
            }
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
var undos={
    drag:function(change){
        change.change.appendChild(change.element);
    },
    style:function(change){
        change.element.style[change.change.id]=change.value;
        console.log(change.value);
        change.change.value=change.value;
    }
};
