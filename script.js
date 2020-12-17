/*********************************
 VARIABLES DOM
 ********************************/

const timeLeftDOM = document.getElementById("timeleft");
const playButton = document.getElementById("buttonPlay");
const pauseButton = document.getElementById("BtnPause");
const resetButton = document.getElementById("buttonReset");
const sessionLengthDOM = document.getElementById("sessionLength");
const sessionIncrement = document.getElementById("sessionIncrement");
const sessionDecrement = document.getElementById("sessionDecrement");
const breakLengthDOM = document.getElementById("breakLength");
const breakIncrement = document.getElementById("breakIncrement");
const breakDecrement = document.getElementById("breakDecrement");
const relaxSong = document.getElementById("relaxSong");
const timeBreak = parseInt(breakLengthDOM.innerText);
const timeWork = parseInt(sessionLengthDOM.innerText);


let interval = null;
let valueTimer = 0;
let valueSession = 25;
let valueBreak = 5;
let sec = 59;
let breakTime = false;
let workTime = true;



class Countdowm {
  constructor() {
    playButton.addEventListener("click", this.startTimer);
    pauseButton.addEventListener("click", this.stopTimer);
    resetButton.addEventListener("click", this.resetTimer);
  }

  startTimer() {
    interval = setInterval(() => {
      if (sec < 10) {
        sec = "0" + sec;
      }
      workTime ? (valueTimer = valueSession) : (valueTimer = valueBreak);
      timeLeftDOM.innerHTML = valueTimer - 1 + " : " + sec;
      sec--;

      if (workTime && sec === 0) {
        valueSession--;
        sec = 59;
      }

      if (valueSession === 0) {
        breakTime = true;
        workTime = false;
        valueSession = timeWork;
        relaxSong.play();
      }

      if (breakTime && sec === 0) {
        valueBreak--;
        sec = 59;
      }
      if (valueBreak === 0) {
        breakTime = false;
        workTime = true;
        valueBreak = timeBreak;
        relaxSong.play();
      }

      playButton.classList.add("hide");
    }, 1000);
  }

  stopTimer() {
    playButton.classList.remove("hide");
    clearInterval(interval);
  }

  resetTimer() {
    workTime = true; 
    breakTime = false; 
    valueSession = 25;
    valueBreak = 5;
    sec = 59;
    sessionLengthDOM.innerHTML = 25;
    breakLengthDOM.innerHTML = 5;
    clearInterval(interval);
    timeLeftDOM.innerHTML = valueSession + " : " + "0" + 0;
    playButton.classList.remove("hide");
    new SessionAndBreakLength(valueSession, valueBreak);
  }
}


class SessionAndBreakLength {
  constructor(valueSession, valueBreak) {
    (this.valueBreak = valueBreak),
      (this.valueSession = valueSession),
      this.incrementDecrementValue(
        "Break",
        valueBreak,
        breakLengthDOM,
        breakIncrement,
        breakDecrement
      );
    this.incrementDecrementValue(
      "Session",
      valueSession,
      sessionLengthDOM,
      sessionIncrement,
      sessionDecrement
    );
  }

  incrementDecrementValue(
    flag,
    value,
    lenghtDOM,
    sectionIncrement,
    sectionDecrement
  ) {
    sectionIncrement.addEventListener("click", () => {
      if (value >= 60) {
        return;
      }
      lenghtDOM.innerHTML = ++value;
      this.updateCountdown(flag, value);
    });
    sectionDecrement.addEventListener("click", () => {
      if (value <= 1) {
        return;
      }
      lenghtDOM.innerHTML = --value;
      this.updateCountdown(flag, value);
    });
  }

  // Update Countdowm in the DOM

  updateCountdown(flag, value) {
    playButton.classList.remove("hide");
    clearInterval(interval);
    flag === "Session" ? (valueSession = value) : (valueBreak = value);
    timeLeftDOM.innerHTML = valueSession + " : " + "00";
  }
}

new Countdowm();
new SessionAndBreakLength(valueSession, valueBreak);
