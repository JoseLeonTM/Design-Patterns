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
        document.querySelector('#containerCommand').appendChild(document.getElementById(ev.dataTransfer.getData("text")));
    };
    var apply = document.getElementById('apply');
    apply.addEventListener('click',storeChanges,false);
    var container=document.getElementById('containerCommand');

    function storeChanges(){
        changes.push({
            bordColor:document.getElementById('borderCOLOR').value,
            bordWidth:document.getElementById('borderWIDTH').value+"px",
            bordRadius:document.getElementById('borderRADIUS').value+"px",
            backColor:document.getElementById('backgroundCOLOR').value
        });

    }
    function editDivs(){
        var bordColor=document.getElementById('borderCOLOR').value;
        var bordWidth=document.getElementById('borderWIDTH').value+"px";
        var bordRadius=document.getElementById('borderRADIUS').value+"px";
        var backColor=document.getElementById('backgroundCOLOR').value;
        var children=container.querySelectorAll('div');
        for(var i=0; i<children.length;i++) {
            children[i].style.borderColor = bordColor;
            children[i].style.borderWidth = bordWidth;
            children[i].style.borderRadius = bordRadius;
            children[i].style.backgroundColor = backColor;
        }
    }
//}