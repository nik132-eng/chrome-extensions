var body = document.querySelector("body")

var btnBQ = document.createElement("button");
btnBQ.setAttribute("id","BtnBQ");
btnBQ.addEventListener("click", doSomething);

body.appendChild(btnBQ);

function doSomething(){
    if(btnBQ.hasAttribute("listening") === false){
        btnBQ.setAttribute("listening",true);
        console.log("I'm listening");
    }else{
        btnBQ.removeAttribute("listening");
        console.log("i'm not listening");
    }
}
