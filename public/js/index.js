const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
const message3 = document.querySelector("#message-3");
const image = document.querySelector("#img");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const locate = search.value;

  message1.textContent = "loading.....";
  message2.textContent = "";

  fetch("http://localhost:3000/weather?address=" + locate).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = "no such place found";
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast + "     " + data.description;
      }
    });
  });
});
