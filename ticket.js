// Ticket is static demo
// Later you can auto-fill using localStorage/sessionStorage
console.log("Ticket Loaded Successfully");


document.addEventListener("DOMContentLoaded", () => {

  const ticketData = JSON.parse(sessionStorage.getItem("ticketData"));

  if (!ticketData) {
    alert("No ticket data found!");
    return;
  }

  // Fill ticket details
  document.getElementById("tName").textContent = ticketData.name;
  document.getElementById("tGender").textContent = ticketData.gender;
  document.getElementById("tNationality").textContent = ticketData.nationality;

  document.getElementById("tFlight").textContent = ticketData.flight;
  document.getElementById("tAirline").textContent = ticketData.airline;
  document.getElementById("tDate").textContent = ticketData.date;
  document.getElementById("tFrom").textContent = ticketData.from;
  document.getElementById("tTo").textContent = ticketData.to;
  document.getElementById("tDuration").textContent = "As per schedule";
  document.getElementById("tDeparture").textContent = ticketData.departure;
  document.getElementById("tArrival").textContent = "--";
  document.getElementById("tSeat").textContent = ticketData.seat;
  document.getElementById("tTrip").textContent = ticketData.tripType;
  document.getElementById("tClass").textContent = ticketData.travelClass;


  document.getElementById("tPayment").textContent = ticketData.payment;
  document.getElementById("tFare").textContent = "₹" + ticketData.fare;
  document.getElementById("tStatus").textContent = ticketData.status;

  // Download PDF
  document.getElementById("downloadBtn").addEventListener("click", () => {
    generatePDF(ticketData);
  });
});

function generatePDF(data) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text("SKYFLICK - Boarding Pass", 20, 20);

  pdf.setFontSize(12);
  pdf.text("Status: CONFIRMED", 20, 30);

  pdf.line(20, 33, 190, 33);

  pdf.text("Passenger Details", 20, 45);
  pdf.text(`Name: ${data.name}`, 20, 55);
  pdf.text(`Gender: ${data.gender}`, 20, 63);
  pdf.text(`Nationality: ${data.nationality}`, 20, 71);

  pdf.line(20, 75, 190, 75);

  pdf.text("Flight Details", 20, 88);
  pdf.text(`Flight No: ${data.flight}`, 20, 98);
  pdf.text(`Airline: ${data.airline}`, 20, 106);
  pdf.text(`From: ${data.from}`, 20, 114);
  pdf.text(`To: ${data.to}`, 20, 122);
  pdf.text(`Date: ${data.date}`, 20, 130);
  pdf.text(`Departure: ${data.departure}`, 20, 138);
  pdf.text(`Seat: ${data.seat}`, 20, 146);

  pdf.line(20, 150, 190, 150);

  pdf.text("Payment", 20, 163);
  pdf.text(`Method: ${data.payment}`, 20, 173);
  pdf.text(`Fare: ₹${data.fare}`, 20, 181);

  pdf.save(`Ticket_${data.flight}.pdf`);
}
