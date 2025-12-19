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

import { db } from "./firebase.js";
import { collection, getDocs } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const flightList = document.getElementById("flightList");

const querySnapshot = await getDocs(collection(db, "flights"));

querySnapshot.forEach(doc => {
  const flight = doc.data();

  flightList.innerHTML += `
    <div class="flight-card">
      <h3>${flight.airline}</h3>
      <p>${flight.from} → ${flight.to}</p>
      <p>₹${flight.price}</p>
      <button onclick="selectFlight('${doc.id}')">Book</button>
    </div>
  `;
});

window.selectFlight = (id) => {
  sessionStorage.setItem("flightId", id);
  window.location.href = "Ticket Booking.html";
};

import { db, auth } from "./firebase.js";
import { addDoc, collection, serverTimestamp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("bookingForm").addEventListener("submit", async e => {
  e.preventDefault();

  const booking = {
    userId: auth.currentUser.uid,
    flightId: sessionStorage.getItem("flightId"),
    passengerName: name.value,
    email: email.value,
    status: "CONFIRMED",
    createdAt: serverTimestamp()
  };

  await addDoc(collection(db, "bookings"), booking);
  window.location.href = "ticket.html";
});
