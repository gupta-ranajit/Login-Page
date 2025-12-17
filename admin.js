document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  // Simple admin check
  if (loggedInUser !== "admin" && loggedInUser !== "SKYFLICK") {
    alert("You do not have permission to view this page.");
    window.location.href = "login.html";
    return;
  }

  const adminContent = document.getElementById("adminContent");

  function renderTickets() {
    adminContent.innerHTML = ""; // Clear current content

    const tickets = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("ticket_")) {
        const ticket = JSON.parse(localStorage.getItem(key));
        ticket.key = key; // Add key to ticket object for later use
        tickets.push(ticket);
      }
    }

    if (tickets.length === 0) {
      adminContent.innerHTML = "<p>No tickets booked yet.</p>";
      return;
    }

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    thead.innerHTML = `
      <tr>
        <th>Passenger</th>
        <th>Flight</th>
        <th>From-To</th>
        <th>Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    `;

    tickets.forEach(ticket => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${ticket.name}</td>
        <td>${ticket.flight} (${ticket.airline})</td>
        <td>${ticket.from} → ${ticket.to}</td>
        <td>${ticket.date}</td>
        <td>${ticket.status}</td>
        <td>
          <button class="btn btn-danger cancel-btn" data-ticket-key="${ticket.key}">Cancel</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    adminContent.appendChild(table);
  }

  // Initial render
  renderTickets();

  // Event delegation for cancel buttons
  adminContent.addEventListener("click", function(e) {
    if (e.target.classList.contains("cancel-btn")) {
      const ticketKey = e.target.getAttribute("data-ticket-key");
      if (confirm("Are you sure you want to cancel this ticket?")) {
        const ticketData = JSON.parse(localStorage.getItem(ticketKey));
        ticketData.status = "CANCELLED";
        localStorage.setItem(ticketKey, JSON.stringify(ticketData));
        renderTickets(); // Re-render the table
      }
    }
  });
});
