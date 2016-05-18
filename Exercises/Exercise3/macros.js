/**
 * Created by Jose Leon on 5/16/2016.
 */

var Macros=(function(){
    var stored = [];
    var id=1;
    var macros=document.getElementById('recordings');///A REFERENCE TO THE DIV HOLDING THE MACRO BUTTONS
    macros.addEventListener('click',runMacro,false);

    var record=document.getElementById('record');
    var create=document.getElementById('create');

    var recording=false;

    create.style.display='none'; //HIDE THE CREATE BUTTON
    record.addEventListener('click',recordMacro,false);
    create.addEventListener('click',createMacro,false);

    function recordMacro(){
        create.style.display = 'inline-block';
        record.style.display = 'none';
        recording=true;
    }
    function createMacro(e) {
        record.style.display = 'inline-block';
        create.style.display = 'none';
        var macro=document.createElement('button');
        macro.class='macro';
        macro.actions=[];
        macro.textContent=id++;
        if(stored.length){
            while(stored.length){
                macro.actions.push(stored.splice(0,1)[0]);
            }
        }
        macros.appendChild(macro);
        recording=false;
        options.selectAction(e);/////PASS THE EVENT TO SELECT ACTION TO STORE THE CREATION OF A MACRO
    }
    function runMacro(e) {
        if(e.target.class=='macro'){
           options.selectAction({action:'macro',target:{id: e.target.textContent},actions: e.target.actions});
        }
    }
    return {
        recording:function() {
            return recording;
        },
        actions:stored,
        macros: macros
    };
})();

