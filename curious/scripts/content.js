var body = document.querySelector("body")

var btnBQ = document.createElement("button");
btnBQ.setAttribute("id", "BtnBQ");
btnBQ.addEventListener("click", doSomething);

body.appendChild(btnBQ);

let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-us";

let transcript = "";
recognition.onresult = function (event) {
    transcript = "";
    for (var i = 0; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
    }
}

function doSomething() {
    if (btnBQ.hasAttribute("listening") === false) {
        btnBQ.setAttribute("listening", true);
        recognition.start();
    } else {
        btnBQ.removeAttribute("listening");
        recognition.stop();
        console.log("this is what you said -", transcript);
        transcript = "";
    }
}
