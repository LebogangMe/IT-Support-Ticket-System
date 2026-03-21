"use strict";
let tickets = [];
function addTicket() {
    const titleInput = document.getElementById("title");
    const prioritySelect = document.getElementById("priority");
    if (!titleInput.value) {
        alert("Please enter an issue.");
        return;
    }
    const ticket = {
        id: Date.now(),
        title: titleInput.value,
        priority: prioritySelect.value,
        status: "Open"
    };
    tickets.push(ticket);
    displayTickets();
    titleInput.value = "";
}
function displayTickets() {
    const container = document.getElementById("tickets");
    container.innerHTML = "";
    tickets.forEach(ticket => {
        const div = document.createElement("div");
        div.className = "ticket " + ticket.priority.toLowerCase();
        div.innerHTML = `
            <h3>${ticket.title}</h3>
            <p>Priority: ${ticket.priority}</p>
            <p>Status: ${ticket.status}</p>
            <button onclick="changeStatus(${ticket.id})">Change Status</button>
            <button onclick="deleteTicket(${ticket.id})">Delete</button>
        `;
        container.appendChild(div);
    });
}
function changeStatus(id) {
    tickets = tickets.map(ticket => {
        if (ticket.id === id) {
            if (ticket.status === "Open")
                ticket.status = "In Progress";
            else if (ticket.status === "In Progress")
                ticket.status = "Resolved";
            else
                ticket.status = "Open";
        }
        return ticket;
    });
    displayTickets();
}
function deleteTicket(id) {
    tickets = tickets.filter(ticket => ticket.id !== id);
    displayTickets();
}
// Expose functions to HTML
window.addTicket = addTicket;
window.changeStatus = changeStatus;
window.deleteTicket = deleteTicket;
