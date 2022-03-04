(() => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const countDown = new Date("03/19/2022").getTime(),
      x = setInterval(() => {
        const now = new Date().getTime();
        distance = countDown - now;

        document.getElementById("days").innerText = ("0" + Math.floor(distance / day)).slice(-2);
        document.getElementById("hours").innerText = ("0" + Math.floor((distance % day) / hour)).slice(-2);
        document.getElementById("minutes").innerText = ("0" + Math.floor((distance % hour) / minute)).slice(-2);

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("final").innerText = "Registrations are now closed.";
          document.getElementById("register").style.display = "none";
          document.getElementById("register").style.display = "none";
          clearInterval(x);
        }
      }, 1000);
  })();

document.getElementById('form').onsubmit = (e) => {
  e.preventDefault();
  console.log(e);
}