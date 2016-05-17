/**
 * Created by Jose Leon on 5/16/2016.
 */
var options=(function(){

    var stored=[];///////WHERE EVERY CHANGE WILL BE STORED

    var cCommands=document.getElementById('containerCommand'); ///////////////CONTAINER COMMAND REFERENCE
    var cLeft=document.getElementById('containerLeft'); ///////////////CONTAINER COMMAND REFERENCE
    //////REFERENCE TO EVERY CONTROLLER
    var borderWIDTH=document.getElementById('borderWidth');
    var borderRADIUS=document.getElementById('borderRadius');
    var borderCOLOR=document.getElementById('borderColor');
    var backgroundCOLOR=document.getElementById('backgroundColor');



    function inEditor(){///////ADJUST THE CONTROL VALUES TO THE DIV VALUES
        borderWIDTH.value=parseInt(cCommands.firstElementChild.style.borderWidth);
        borderRADIUS.value=parseInt(cCommands.firstElementChild.style.borderRadius);
        borderCOLOR.value=rgbToHex(cCommands.firstElementChild.style.borderColor);
        backgroundCOLOR.value=rgbToHex(cCommands.firstElementChild.style.backgroundColor);
    }
    document.getElementById('backgroundColor').addEventListener('input',fillColor,false);
    document.getElementById('borderColor').addEventListener('input',fillColor,false);

    for(var i=0;i<cLeft.childElementCount;i++){
        cLeft.children[i].style.borderWidth=1+"px";
        cLeft.children[i].style.borderRadius=0+'px';
        cLeft.children[i].style.borderColor='#FFFFFF';
        cLeft.children[i].style.backgroundColor='#5c9eff';
    }
    function rgbToHex(rgbString) {///////TURNS RGB FORMAT INTO A HEXADECIMAL FORMAT
        var a = rgbString.split("(")[1].split(")")[0];
        a = a.split(",");
        var b = a.map(function (x) {             //For each array element
            x = parseInt(x).toString(16);      //Convert to a base16 string
            return (x.length == 1) ? "0" + x : x;  //Add zero if we get only one character
        });
        return "#" + b.join("");
    }

    function fillColor(event) {////MATCHES THE DIV'S COLOR TO WHAT IS SELECTED
        var element = cCommands.firstElementChild;
        if (element) {
            element.style[event.target.id] = event.target.value;
        }
    }
    var changes = {
        drag: function (element) {
            stored.push({action: 'drag', element: element, change: element.parentNode});
        },
        slide: function (event) {
            var element = cCommands.firstElementChild;
            if (element) {
                if (event.type == 'mousedown') {////STORE THE VALUES AS SOON AS THE CLICK IS DOWN
                    stored.push({
                        action: 'style',
                        element: element,
                        change: event.target,
                        value: event.target.value
                    });
                }
                if (event.type == 'click') {////////CHECK THE VALUES AFTER THE CLICK IF UP
                    element.style[event.target.id] = event.target.value + "px";
                    if (event.target.value == stored[stored.length - 1].value) stored.pop(); /////REMOVED THE STORED DATA IF THE VALUE IS THE SAME
                }
            }
        },
        color: function (event) {
            var element = cCommands.firstElementChild;
            if (element) {
                stored.push({
                    action: 'color',
                    element: element,
                    change: event.target,
                    value: event.target.value
                });
            }
        },
        undo: function () {
            if (stored.length > 0) {
                switch (stored[stored.length - 1].action) {
                    case 'drag':
                        undos.drag(stored.pop());
                        break;
                    case 'style':
                        undos.style(stored.pop());
                        break;
                    case 'color':
                        undos.color(stored.pop());
                        break;
                }
            }
        }
    };
    var undos = {
        drag: function (change) {
            change.change.appendChild(change.element);
            if (change.change == cCommands) inEditor();/////ADJUST THE CONTROLS TO THE VALUE OF THE ELEMENT IN THE EDITOR
        },
        style: function (change) {
            change.element.style[change.change.id] = change.value + "px";
            change.change.value = change.value;
        },
        color: function (change) {
            change.element.style[change.change.id] = change.value;
            change.change.value = change.value;

        }
    };
    return{
        selectAction: function(e){
            var divID = e.target.id.match(/subject[\d]+/) ? e.target.id.match(/subject[\d]+/)[0] : undefined;
            switch (e.target.id) {
                case divID:
                    changes.drag(e.target);
                    break;
                case 'undo':
                    if (e.type == 'click') changes.undo();
                    break;
                case 'borderWidth':
                    changes.slide(e);
                    break;
                case 'borderRadius':
                    changes.slide(e);
                    break;
                case 'backgroundColor':
                    if (e.type == 'click') changes.color(e);
                    break;
                case 'borderColor':
                    if (e.type == 'click') changes.color(e);
            }
        },
        inEditor:inEditor
    }
})();