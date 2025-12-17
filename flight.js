document.addEventListener("DOMContentLoaded", () => {
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  if (sign_up_btn) {
    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
  }

  if (sign_in_btn) {
    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // STOP reload

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      // Hardcoded admin login for SKYFLICK
      if (username === "SKYFLICK" && password === "123456") {
        localStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("loggedInUser", "SKYFLICK");
        window.location.replace("admin.html");
        return; // Stop further execution
      }

      const storedCredentials = localStorage.getItem(username);

      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        if (password === credentials.password) {
          localStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("loggedInUser", username); // Store username

          // redirect to admin page if username is admin
          if (username === "admin") {
            window.location.replace("admin.html");
          } else {
            window.location.replace("index.html");
          }
        } else {
          alert("Invalid username or password");
        }
      } else {
        alert("Invalid username or password");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault(); // STOP reload

      const username = document.getElementById("signupUsername").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      if (username && password) {
        const credentials = { password: password };
        localStorage.setItem(username, JSON.stringify(credentials));
        alert("Sign up successful! Please sign in.");
        container.classList.remove("sign-up-mode");
      } else {
        alert("Please enter a username and password.");
      }
    });
  }
});
