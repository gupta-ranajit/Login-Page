


document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("🎉 Booking Successful!\nTicket confirmation will be sent to your email.");

    // Optional: redirect to confirmation page
    // window.location.href = "confirmation.html";
  });

});

document.querySelectorAll(".flight-row").forEach(row => {
  row.addEventListener("click", () => {

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
});
