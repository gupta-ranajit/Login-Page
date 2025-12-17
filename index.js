document.addEventListener("DOMContentLoaded", () => {
  const mainLoginBtn = document.getElementById("mainLoginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Page Protection
  if (!isLoggedIn) {
    window.location.href = "login.html";
    return; // Stop further execution if not logged in
  }

  // Toggle button visibility based on login state
  if (isLoggedIn) {
    mainLoginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    mainLoginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }

  // Event listener for login button
  mainLoginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  // Event listener for logout button
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  // 🔍 Search Flights button
  const searchFlightBtn = document.getElementById("searchFlightsBtn");

  if (searchFlightBtn) {
    searchFlightBtn.addEventListener("click", () => {
      const from = document.getElementById("fromCity").value.trim();
      const to = document.getElementById("toCity").value.trim();
      const departDate = document.getElementById("DepartureDate").value;

      if (!from || !to || !departDate) {
        alert("Please fill From, To and Departure Date");
        return;
      }

      // Save search details to sessionStorage
      const searchData = { from, to, departDate };
      sessionStorage.setItem("flightSearch", JSON.stringify(searchData));

      // Redirect to flight details page
      window.location.href = "flight-details.html";
    });
  }

  // Handle clicks on top flight routes
  const routesGrid = document.querySelector(".routes-grid");
  if (routesGrid) {
    routesGrid.addEventListener("click", (e) => {
      const routeCard = e.target.closest(".route-card");
      if (routeCard) {
        const routeText = routeCard.querySelector("p").textContent;
        const [from, to] = routeText.split(" → ");
        
        sessionStorage.setItem("fromCity", from.trim());
        sessionStorage.setItem("toCity", to.trim());

        window.location.href = "flight-details.html";
      }
    });
  }
});

// Navigate to Hotels page
document.getElementById("hotelsLink").addEventListener("click", function (e) {
  e.preventDefault(); // stop default anchor behavior
  window.location.href = "hotel.html";
});
