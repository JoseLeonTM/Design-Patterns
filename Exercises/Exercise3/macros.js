/**
 * Created by Jose Leon on 5/16/2016.
 */

var record=document.getElementById('record');
var create=document.getElementById('create');
create.style.display='none';
record.addEventListener('click',recordMacro,false);
create.addEventListener('click',createMacro,false);

function recordMacro(){
    create.style.display='inline-block';
    record.style.display='none';
    var record=[];
    if(record.length){
        
    }
}
function createMacro(){
    record.style.display='inline-block';
    create.style.display='none';
}