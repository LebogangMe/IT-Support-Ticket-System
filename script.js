let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

// LOGIN
function login() {
    let username = document.getElementById("username").value;

    if (username === "") {
        alert("Enter username");
        return;
    }

    localStorage.setItem("user", username);
    showApp();
}

function showApp() {
    let user = localStorage.getItem("user");

    if (user) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
        document.getElementById("welcome").innerText = "Welcome, " + user;
        displayTickets();
    }
}

showApp();

// SAVE
function save() {
    localStorage.setItem("tickets", JSON.stringify(tickets));
}

// ADD TICKET
function addTicket() {
    let title = document.getElementById("title").value;
    let priority = document.getElementById("priority").value;

    if (title === "") return alert("Enter issue");

    tickets.push({
        id: Date.now(),
        title,
        priority,
        status: "Open"
    });

    save();
    displayTickets();
    document.getElementById("title").value = "";
}

// DISPLAY
function displayTickets() {
    let list = document.getElementById("ticketList");
    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;

    list.innerHTML = "";

    let filtered = tickets.filter(t => {
        return (
            t.title.toLowerCase().includes(search) &&
            (filter === "All" || t.status === filter)
        );
    });

    let open = 0, resolved = 0;

    filtered.forEach(t => {
        if (t.status === "Open") open++;
        if (t.status === "Resolved") resolved++;

        let div = document.createElement("div");
        div.className = "ticket " + t.priority.toLowerCase();

        div.innerHTML = `
            <h3>${t.title}</h3>
            <p>Priority: ${t.priority}</p>
            <p>Status: ${t.status}</p>

            <button onclick="changeStatus(${t.id})">Change Status</button>
            <button onclick="deleteTicket(${t.id})">Delete</button>
        `;

        list.appendChild(div);
    });

    document.getElementById("total").innerText = tickets.length;
    document.getElementById("open").innerText = open;
    document.getElementById("resolved").innerText = resolved;
}

// STATUS CHANGE
function changeStatus(id) {
    tickets = tickets.map(t => {
        if (t.id === id) {
            if (t.status === "Open") t.status = "In Progress";
            else if (t.status === "In Progress") t.status = "Resolved";
            else t.status = "Open";
        }
        return t;
    });

    save();
    displayTickets();
}

// DELETE
function deleteTicket(id) {
    tickets = tickets.filter(t => t.id !== id);
    save();
    displayTickets();
}