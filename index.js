document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("mainLoginBtn");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    window.location.replace("login.html");
    return;
  }

  // Hide login button when logged in
  loginBtn.style.display = "none";

   // 🔍 Search Flights button
  const searchFlightBtn = document.getElementById("searchFlightsBtn");

  if (searchFlightBtn) {
    searchFlightBtn.addEventListener("click", () => {
      window.location.href = "flight-details.html";
    });
  }

   const searchBtn = document.getElementById("searchFlightsBtn");

  searchBtn.addEventListener("click", () => {

    const from = document.getElementById("fromCity").value.trim();
    const to = document.getElementById("toCity").value.trim();
    const departDate = document.getElementById("departureDate").value;
    const returnDate = document.getElementById("returnDate").value;

    if (!from || !to || !departDate) {
      alert("Please fill From, To and Departure Date");
      return;
    }

    // Save search details
    sessionStorage.setItem("fromCity", from);
    sessionStorage.setItem("toCity", to);
    sessionStorage.setItem("departureDate", departDate);
    sessionStorage.setItem("returnDate", returnDate);

    // Redirect
    window.location.href = "flights.html";
  });

});
