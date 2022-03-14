(() => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const countDown = new Date(2022, 2, 16, 12, 0, 0).getTime();
    const x = setInterval(() => {
      const now = new Date().getTime();
      distance = countDown - now;

      document.getElementById("days").innerText = ("0" + Math.floor(distance / day)).slice(-2);
      document.getElementById("hours").innerText = ("0" + Math.floor((distance % day) / hour)).slice(-2);
      document.getElementById("minutes").innerText = ("0" + Math.floor((distance % hour) / minute)).slice(-2);

      //do something later when date is reached
      if (distance < 0) {
        document.getElementById("final").innerText = "Registrations are now closed.";
        document.getElementById("register").style.display = "none";
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
        
        clearInterval(x);
      }
    }, 1000);
  })();

document.getElementById('form').onsubmit = (e) => {
  e.preventDefault();
  let firstname = document.getElementById("prenom").value;
  let lastname = document.getElementById("nom").value;
  let email = document.getElementById("email").value;
  let speciality = document.getElementById("specialite").value;
  let level = document.getElementById("niveau").value;
  let discord = document.getElementById("discord").value;

  const body = {
    firstname,
    lastname,
    email,
    speciality,
    level,
    discord
  };

  const msg = document.getElementById('msg');
  msg.innerHTML = '';

  fetch('/participants', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if(data.err) {
        msg.innerHTML = `<p class="error">${data.errors[0].msg}</p>`;
        msg.class = 'error';
      }
      else {
        msg.innerHTML = `<p class="success">${data.msg}</p>`;
        msg.class = 'success';
        document.getElementById('form').reset();
      }
    }
    );
}