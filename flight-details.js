document.addEventListener("DOMContentLoaded", () => {
  const fromCity = sessionStorage.getItem("fromCity");
  const toCity = sessionStorage.getItem("toCity");

  if (fromCity && toCity) {
    const rows = document.querySelectorAll(".flight-row");
    rows.forEach(row => {
      const rowFrom = row.dataset.from;
      const rowTo = row.dataset.to;
      if (rowFrom !== fromCity || rowTo !== toCity) {
        row.style.display = "none";
      }
    });

    // Clean up sessionStorage
    sessionStorage.removeItem("fromCity");
    sessionStorage.removeItem("toCity");
  }

  const flightTable = document.getElementById("flightTable");

  // Add a header for the new column
  const headerRow = document.querySelector("thead tr");
  const th = document.createElement("th");
  th.textContent = "Status";
  headerRow.appendChild(th);

  const rows = document.querySelectorAll(".flight-row");

  rows.forEach(row => {
    // 1. Randomize Time
    const timeCell = row.children[5]; // 6th column for time
    const randomHour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const randomMinute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const randomTime = `${randomHour}:${randomMinute}`;
    timeCell.textContent = randomTime;
    row.dataset.time = randomTime; // Update data attribute

    // 2. Randomize Availability
    const isAvailable = Math.random() > 0.3; // 70% chance of being available
    const statusCell = document.createElement("td");

    if (isAvailable) {
      statusCell.innerHTML = '<button class="btn book-btn">Book Now</button>';
      const bookBtn = statusCell.querySelector(".book-btn");

      bookBtn.addEventListener("click", () => {
        const flightData = {
          flight: row.dataset.flight,
          airline: row.dataset.airline,
          from: row.dataset.from,
          to: row.dataset.to,
          date: row.dataset.date,
          time: row.dataset.time,
          price: row.dataset.price
        };

        // Store data in sessionStorage
        sessionStorage.setItem("selectedFlight", JSON.stringify(flightData));

        // Redirect to ticket booking page
        window.location.href = "Ticket Booking.html";
      });
    } else {
      row.classList.add("not-available");
      statusCell.textContent = "Not Available";
    }

    row.appendChild(statusCell);
  });
});
