const timer = document.getElementById("timer");
const input = document.getElementById("minutesInput");
const button = document.getElementById("startBtn");
const spinner = document.getElementById("spinner");
const circle = document.getElementById("progressCircle");
const radius = 110;
const length = 2 * Math.PI * radius;

circle.style.strokeDasharray = length;
circle.style.strokeDashoffset = 0;

let interval = null;

button.addEventListener("click", () => {

    let minutes = Number(input.value);

    if (minutes < 1 || minutes > 99) {

        alert("Введите от 1 до 99 минут");

        return;

    }

    startTimer(minutes);

});

function startTimer(minutes){

    clearInterval(interval);

    button.disabled = true;
    input.disabled = true;

    spinner.classList.remove("hidden");

    let total = minutes * 60;
    let left = total;

    update();

    interval = setInterval(()=>{

        left--;

        update();

        if(left<=0){

            clearInterval(interval);

            spinner.classList.add("hidden");

            button.disabled = false;
            input.disabled = false;

            alert("Время вышло!");

        }

    },1000);

    function update(){

        const min = Math.floor(left/60);
        const sec = left%60;

        timer.textContent =
        `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

        const percent = left/total;

        circle.style.strokeDashoffset =
            length*(1-percent);

    }

}