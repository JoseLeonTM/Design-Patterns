/**
 * Created by Jose Leon on 5/3/2016.
 */


window.onload=function(){
    var text=document.querySelector("#listOfWords");  //////////////GET THE PARAGRAPH ELEMENT
    var filterWord=document.querySelector("#filter");////////////////GET THE TEXT FROM THE INPUT ELEMENT
    var words=require('ListOfWords').srcText;
    var Presenter=(function(){
        function reset(srcText){
            text.textContent=words.join(", ");
        }
        return {
            filter: function () {
                if (filterWord.value!="") {
                    var newText = "";
                    var srcText = words;
                    var filter = filterWord.value.trim();
                    for (var i = 0; i < srcText.length; i++) {
                            if (srcText[i].match(filter)) {
                                newText += srcText[i] + " ";
                            }
                    }
                    text.textContent = newText;
                }
                else {
                    reset();
                }
            }
        }
    })();
    Presenter.filter();
    filter.addEventListener("input",Presenter.filter,false);
};