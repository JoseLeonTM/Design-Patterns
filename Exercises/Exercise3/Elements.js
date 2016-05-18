/**
 * Created by Jose Leon on 5/12/2016.
 */
var elements=(function() {
    var controls = document.getElementById('controllers');//////A REFERENCE TO THE CONTROLLERS DIV////////////
    controls.addEventListener('click', options.selectAction, false);
    document.body.addEventListener('mousedown', options.selectAction, false);
///////////DRAGGING FUNCTIONS////////////////////
    return {
        allowDrop : function (ev) {
                ev.preventDefault();
        },
        drag : function (ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        },
        drop : function (ev) {
            ev.preventDefault();
            if ((ev.target == options.cCommands || ev.target.parentNode == options.cCommands) && options.cCommands.childElementCount == 0) {
                options.cCommands.appendChild(document.getElementById(ev.dataTransfer.getData("text")));
                options.inEditor();
            }
            else if (ev.target == options.cLeft || ev.target.parentNode == options.cLeft) {
                options.cLeft.appendChild(document.getElementById(ev.dataTransfer.getData("text")));
            }
        }
    };
})();
////////END OF DRAGGING FUNCTIONS//////////////////