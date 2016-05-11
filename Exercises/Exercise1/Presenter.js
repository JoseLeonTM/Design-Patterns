/**
 * Created by Jose Leon on 5/3/2016.
 */

window.onload=function(){
    //var filter = document.querySelector("#filter");
    var Presenter=(function(){
        var text=document.querySelector("#listOfWords");  //////////////GET THE PARAGRAPH ELEMENT
        var filterWord=document.querySelector("#filter");////////////////GET THE TEXT FROM THE INPUT ELEMENT
        var words=require('ListOfWords').srcText; ///////////GET THE LIST OF WORDS FROM REQUIRE.JS
        function reset(){
            text.textContent=words.join(", ");
        }
        return {
            filter: function () {
                if (filterWord.value!="") {
                    var newText = "";
                    var srcText = words;  ///\b[\w]*filter[\w]*\b/
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