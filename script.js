// Not perfect, but quickest to understand and build upon:
// Original https://www.sitepoint.com/community/t/javascript-how-to-make-laps-in-the-stopwatch/244936/2

(function () {
  let hours = 00;
  let minutes = 00;
  let seconds = 00;
  let tens = 00;
  let aHours = document.getElementById("hours");
  let aMinutes = document.getElementById("minutes");
  let aSeconds = document.getElementById("seconds");
  let aTens = document.getElementById("tens");
  let Start = document.getElementById("start");
  let Stop = document.getElementById("stop");
  let reset = document.getElementById("reset");
  let clear = document.getElementById("clear");
  let Interval;
  let Lap = document.getElementById("lap");
  let Laps = document.getElementById("laps");
  let lapCount = 1;
  let lapsContent = document.getElementById("laps").innerHTML;
  let lastLap = { hours: 0, minutes: 0, tens: 0, seconds: 0 };

  function leftPad(value) {
    return value < 10 ? "0" + value : value;
  }

  // localStorage detection
  function supportsLocalStorage() {
    return typeof Storage !== "undefined";
  }

  $("#stop").hide();

  Start.onclick = function () {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
    $("#stop").toggle();
    $("#start").toggle();
  };

  Stop.onclick = function () {
    clearInterval(Interval);
    $("#start").toggle();
    $("#stop").toggle();
  };

  reset.onclick = function () {
    clearInterval(Interval);
    hours = "00";
    minutes = "00";
    seconds = "00";
    tens = "00";
    aHours.innerHTML = hours;
    aMinutes.innerHTML = minutes;
    aSeconds.innerHTML = seconds;
    aTens.innerHTML = tens;
  };

  function startTimer() {
    tens++;

    if (tens < 9) {
      aTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
      aTens.innerHTML = tens;
    }

    if (tens > 99) {
      // console.log("seconds");
      seconds++;
      aSeconds.innerHTML = "0" + seconds;
      tens = 0;
      aTens.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
      aSeconds.innerHTML = seconds;
    }

    if (seconds > 59) {
      // console.log("minutes");
      minutes++;
      aMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      aSeconds.innerHTML = "0" + 0;
      tens = 0;
      aTens.innerHTML = "0" + 0;
    }

    if (minutes > 9) {
      aMinutes.innerHTML = minutes;
    }

    if (minutes > 59) {
      // console.log("seconds");
      hours++;
      aHours.innerHTML = "0" + hours;
      minutes = 0;
      aMinutes.innerHTML = "0" + 0;
      seconds = 0;
      aSeconds.innerHTML = "0" + 0;
      tens = 0;
      aTens.innerHTML = "0" + 0;
    }

    if (hours > 9) {
      aHours.innerHTML = hours;
    }
  }

  // Run the support check
  if (!supportsLocalStorage()) {
    console.log("browser storage not supported");

    Lap.onclick = function () {
      let lapHours = hours - lastLap.hours;
      let lapMinutes = minutes - lastLap.minutes;
      if (lapMinutes < 0) {
        let lapMinutes = minutes - lastLap.minutes + 60;
      }
      let lapSeconds = seconds - lastLap.seconds;
      if (lapSeconds < 0) {
        let lapSeconds = seconds - lastLap.seconds + 60;
      }
      let lapTens = tens - lastLap.tens;
      if (lapTens < 0) {
        let lapTens = tens - lastLap.tens + 100;
      }
      lastLap = {
        tens: tens,
        seconds: seconds,
        minutes: minutes,
        hours: hours,
      };

      Laps.innerHTML +=
        "<li>" +
        leftPad(lapHours) +
        ":" +
        leftPad(lapMinutes) +
        ":" +
        leftPad(lapSeconds) +
        ":" +
        leftPad(lapTens) +
        "</li>";
    };
    // Just clear laps list
    clear.onclick = function () {
      Laps.innerHTML = "";
    };
  } else {
    // HTML5 localStorage Support
    try {
      Lap.onclick = function () {
        let lapHours = hours - lastLap.hours;
        let lapMinutes = minutes - lastLap.minutes;
        if (lapMinutes < 0) {
          let lapMinutes = minutes - lastLap.minutes + 60;
        }
        let lapSeconds = seconds - lastLap.seconds;
        if (lapSeconds < 0) {
          let lapSeconds = seconds - lastLap.seconds + 60;
        }
        let lapTens = tens - lastLap.tens;
        if (lapTens < 0) {
          let lapTens = tens - lastLap.tens + 100;
        }
        lastLap = {
          tens: tens,
          seconds: seconds,
          minutes: minutes,
          hours: hours,
        };

        Laps.innerHTML +=
          "<li>" +
          "Lap " +
          lapCount++ +
          " – " +
          leftPad(lapHours) +
          ":" +
          leftPad(lapMinutes) +
          ":" +
          leftPad(lapSeconds) +
          "." +
          leftPad(lapTens) +
          "</li>";

        localStorage.setItem("laps", JSON.stringify(Laps.innerHTML));
        // console.log(localStorage.getItem('laps'));
      };

      clear.onclick = function () {
        Laps.innerHTML = "";
        localStorage.removeItem("laps");
      };
    } catch (e) {
      // If any errors, catch and alert the user
      if (e == QUOTA_EXCEEDED_ERR) {
        alert("Quota exceeded!");
      }
    }

    if (localStorage.getItem("laps")) {
      // Retrieve the item
      let storedLaps = JSON.parse(localStorage.getItem("laps"));
      $("#laps").html(storedLaps);
      // console.log(localStorage.getItem('laps'));
    }
  }
})();
