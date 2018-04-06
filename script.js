var square = document.getElementsByClassName("square");
var newGame_btn = document.getElementById("newColors");
var button = document.querySelectorAll(".mode");
var header = document.getElementById("header");

var width = square[0].getBoundingClientRect().width;

var length, ans;
var easyMode = false;

var rgbText = document.getElementById("rgb");

function getRandomRGB(min, max)
    {
    return "rgb(" + Math.floor(Math.random() * (max - min) + min) +
            ", " + Math.floor(Math.random() * (max - min) + min) +
            ", " + Math.floor(Math.random() * (max - min) + min) + ")";
    }

function init() {
    ans = Math.floor(Math.random() * (easyMode ? 3 : 6));
    newGame_btn.textContent = "new colors";
    header.style.background = "#436aa8";
    length = square.length / (easyMode ? 2 : 1);
    for(let i = 0; i < length; i++) {
        let color = getRandomRGB(0, 256);
        square[i].style.background = color;
        square[i].style.visibility = "visible";
        square[i].style.opacity = 1;
        ans = (ans == i) ? color : ans;
    }
    for(let i = length;  i < square.length; i++)
        square[i].style.visibility = "hidden";
    rgb.textContent = ans;
}

var nothing = false;
function extinction(square, sign) {
    var opacity = sign ? 0.1 : 0.9;
    var timer = setInterval(function() {
        opacity = (sign ? opacity + 0.05 : opacity - 0.05);
        square.style.opacity = opacity;
        nothing = true;
        }, 20);
    setTimeout(function() {
        clearInterval(timer);
        nothing = false;
        }, 440);
}

init();

for(var i = 0; i < length; i++)
    square[i].addEventListener('click', function() {
        if(this.style.opacity < 1 || nothing)
            return 0;
        if(this.style.background != ans)
            console.log("Im here"), extinction(this, false);
        else {
            for(let i = 0; i < length; i++) {
                square[i].style.background = ans;
                if(square[i].style.opacity < 1)
                    extinction(square[i], true);
            }
            header.style.background = ans;
            newGame_btn.textContent = "play again?";
        }
    });

newGame_btn.addEventListener('click', init);

for(let i = 0; i < button.length; i++)
    button[i].addEventListener("click", function() {
        button[0].classList.remove("selected");
        button[1].classList.remove("selected");
        this.classList.add("selected");
        easyMode = (this.textContent == "easy") ? true : false;
        init();
    });
