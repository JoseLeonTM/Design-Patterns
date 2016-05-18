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
        var element=cCommands.firstElementChild;
        if(element) {
            borderWIDTH.value = parseInt(element.style.borderWidth);
            borderRADIUS.value = parseInt(element.style.borderRadius);
            borderCOLOR.value = rgbToHex(element.style.borderColor);
            backgroundCOLOR.value = rgbToHex(element.style.backgroundColor);
        }
    }
    document.getElementById('backgroundColor').addEventListener('change',fillColor,false);//MAKE THE COLOR INPUTS CHANGE THE DIVS
    document.getElementById('borderColor').addEventListener('change',fillColor,false);

    for(var i=0;i<cLeft.childElementCount;i++){//INITIALIZE THE VALUES FOR THE DIVS
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
            if(Macros.recording()){//////IF WE ARE RECORDING A MACRO STORE THE ACTION
                Macros.actions.push({target:event.target, value:event.target.value});
            }
        }
    }
    var changes = {
        drag: function (element) {
            stored.push({action: 'drag', element: element, change: element.parentNode});
                //if (element.parentNode == stored[stored.length - 1].change) stored.pop();
            //else
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
                    if(Macros.recording()){//////IF WE ARE RECORDING A MACRO STORE THE ACTION
                        Macros.actions.push({target:event.target, value:event.target.value});
                    }
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
                if(Macros.recording()){//////IF WE ARE RECORDING A MACRO STORE THE ACTION
                    Macros.actions.push({target:stored[stored.length-1].change, value:stored[stored.length-1].value});
                }
                undos[stored[stored.length-1].action](stored.pop());
            }
        },
        macroCreation:function(event){
            stored.push({
                action:'macroCreation',
                change:Macros.macros.lastElementChild
            });
            ///////STORE CREATION OF MACROS
        },
        macro:function(event){
            var element = cCommands.firstElementChild;
            if (element) {
                stored.push({
                    action: 'macro',
                    element: element,
                    bRadius: element.style.borderRadius,
                    bWidth: element.style.borderWidth,
                    bColor: element.style.borderColor,
                    backColor: element.style.backgroundColor
                });
                for(var i=0;i<event.actions.length;i++){
                    var property=(event.actions[i].target.id);
                    var value=(event.actions[i].value);
                    if(property=='borderWidth' || property=='borderRadius') {
                        element.style[property] = value+'px';
                    }
                    else {
                        element.style[property] = value;
                    }
                }
                inEditor();
            }
        }
    };
    var undos = {
        drag: function (change) {
            change.change.appendChild(change.element);
            //if (change.change == cCommands) inEditor();/////ADJUST THE CONTROLS TO THE VALUE OF THE ELEMENT IN THE EDITOR
        },
        style: function (change) {
            change.element.style[change.change.id] = change.value + "px";
            change.change.value = change.value;
        },
        color: function (change) {
            change.element.style[change.change.id] = change.value;
            change.change.value = change.value;

        },
        macroCreation:function(change){
            change.change.parentNode.removeChild(change.change);
        },
        macro:function(change){
            change.element.style.borderRadius=change.bRadius;
            change.element.style.borderWidth=change.bWidth;
            change.element.style.borderColor=change.bColor;
            change.element.style.backgroundColor=change.backColor;
        }
    };
    var dragREGEX=/subject[\d]/;
    var macroREGEX=/^[\d]+/;
    return{
        cCommands:cCommands,
        cLeft:cLeft,
        selectAction: function(e){//THIS METHOD DECIDES WHAT TO EXECUTE BASED ON THE EVENT TARGET
            var divID = e.target.id.match(dragREGEX) ? e.target.id.match(dragREGEX)[0] : undefined;
            var macro= e.target.id.match(macroREGEX) ? e.target.id.match(macroREGEX)[0] : undefined;
            switch (e.target.id) {
                case divID:
                    changes.drag(e.target);
                    break;
                case 'undo':
                    if (e.type == 'click') {
                        changes.undo();
                        inEditor();
                    }
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
                    break;
                case 'create':
                    if(e.type=='click') changes.macroCreation(e);
                    break;
                case macro:
                    changes.macro(e);
            }
        },
        inEditor:inEditor
    }
})();