let progress = 0;

const fill = document.getElementById("fill");
const text = document.getElementById("text");

let load = setInterval(() => {

    progress++;

    fill.style.width = progress + "%";

    if(progress < 60){
        text.innerHTML = progress + "%";
    }
    else if(progress < 100){
        text.innerHTML = "Connecting to server...";
    }
    else{
        clearInterval(load);

        text.innerHTML = "Connected!";

        setTimeout(() => {
            window.location.href = "lobby.html";
        }, 800);
    }

}, 25);
