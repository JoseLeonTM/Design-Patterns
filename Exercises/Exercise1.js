/**
 * Created by Jose Leon on 5/3/2016.
 */


window.onload=function(){
    var Model={
        text:document.querySelector("#text"),  //////////////GET THE PARAGRAPH ELEMENT
        filter: document.querySelector("#filter"),////////////////GET THE TEXT FROM THE INPUT ELEMENT
        srcText:[ //////KEEP THE ORIGINAL TEXT
            "ant",
            "anthrax",
            "art",
            "arch",
            "archangel",
            "archenemy",
            "argument",
            "artillery",
            "ball",
            "balloon",
            "bat",
            "battle",
            "battalion",
            "battling",
            "bit",
            "bite",
            "bitten",
            "bitter",
            "byte",
            "call",
            "car",
            "carrousel",
            "carbohydrate",
            "carbon",
            "card",
            "celery",
            "cell",
            "cellar",
            "cellphone",
            "celt",
            "dance",
            "dancer",
            "dip",
            "diploma",
            "diplomatic",
            "direction",
            "direct",
            "directly",
            "each",
            "ear",
            "earth",
            "earthquake",
            "elefant",
            "elf",
            "eruption",
            "fall",
            "falling"
        ]
    };
    var Presenter=(function(){
        function reset(){
            Model.text.textContent=Model.srcText.join(", ");
        }
        return {
            filter: function () {
                if (Model.filter.value!="") {
                    var newText = "";
                    var oldText = Model.srcText;
                    //oldText = oldText.replace(/[.,:;]/g, "");
                    //oldText = oldText.split(" ");
                    var filter = Model.filter.value.trim();
                    for (var i = 0; i < oldText.length; i++) {
                            if (oldText[i].match(filter)) {
                                newText += oldText[i] + " ";
                                //oldText.splice(i,1);
                            }
                    }
                    Model.text.textContent = newText;
                }
                else {
                    reset();
                }
            }
        }
    })();
    Presenter.filter();
    Model.filter.addEventListener("input",Presenter.filter,false);
};