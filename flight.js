const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// ✅ LOGIN LOGIC
document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // STOP reload

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");

      // redirect
      window.location.replace("index.html");
    } else {
      alert("Invalid username or password");
    }
  });

});
