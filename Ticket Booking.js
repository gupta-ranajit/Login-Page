document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("Please login to book a ticket.");
    window.location.href = "login.html";
    return;
  }

  // Get flight data
  const flightData = JSON.parse(sessionStorage.getItem("selectedFlight"));

  if (!flightData) {
    alert("No flight selected!");
    window.location.href = "flight-details.html";
    return;
  }

  // DOM references
  const flightInfo = document.getElementById("flightInfo");
  const routeInfo = document.getElementById("routeInfo");
  const dateInfo = document.getElementById("dateInfo");
  const timeInfo = document.getElementById("timeInfo");
  const priceInfo = document.getElementById("priceInfo");

  // Fill flight details
  flightInfo.textContent = `${flightData.flight} (${flightData.airline})`;
  routeInfo.textContent = `${flightData.from} → ${flightData.to}`;
  dateInfo.textContent = flightData.date;
  timeInfo.textContent = flightData.time;
  priceInfo.textContent = flightData.price;

  // Form submit
  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const paymentInput = document.querySelector('input[name="payment"]:checked');
    if (!paymentInput) {
      alert("Please select a payment method");
      return;
    }

    const ticketData = {
      // Passenger
      name: document.getElementById("name").value,
      gender: document.getElementById("gender").value,
      nationality: document.getElementById("nationality").value,

      // Flight
      flight: flightData.flight,
      airline: flightData.airline,
      from: flightData.from,
      to: flightData.to,
      date: flightData.date,
      departure: flightData.time,
      fare: flightData.price,

      // Booking options
      tripType: document.getElementById("tripType").value,
      travelClass: document.getElementById("travelClass").value,
      seatPreference: document.getElementById("seatPref").value,

      seat: generateSeat(),
      payment: paymentInput.value,
      status: "CONFIRMED",
      bookedBy: loggedInUser,
    };

    const ticketKey = `ticket_${loggedInUser}_${Date.now()}`;
    localStorage.setItem(ticketKey, JSON.stringify(ticketData));
    sessionStorage.setItem("ticketKey", ticketKey); // Pass key to ticket page
    window.location.href = "ticket.html";
  });
});

// 🎯 Seat Generator
function generateSeat() {
  const row = Math.floor(Math.random() * 30) + 1;
  const seats = ["A", "B", "C", "D", "E", "F"];
  return row + seats[Math.floor(Math.random() * seats.length)];
}
