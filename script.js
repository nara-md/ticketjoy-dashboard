import tickets from './tickets.json' with { type: 'json' };

const ticketList = document.getElementById('ticketList');
const allticketsButton = document.getElementById('allTickets');
const openTicketsButton = document.getElementById('openTickets');
const closedTicketsButton = document.getElementById('closedTickets');
const statusText = document.getElementById('statusText');
let chamados = JSON.parse(localStorage.getItem("tickets")) || [...tickets];

function renderTickets(tickets) {
    ticketList.innerHTML = '';
    ticketList.style.display = 'block';

    tickets.forEach(ticket => {
        const item = document.createElement('li');
        const id = document.createElement('span');
        id.textContent = ticket.id;
        const user = document.createElement('span');
        user.textContent = ticket.user;
        const category = document.createElement('span');
        category.textContent = ticket.category;
        const priority = document.createElement('span');
        priority.textContent = ticket.priority;
        const status = document.createElement('span');
        status.textContent = ticket.status;

        item.appendChild(id);
        item.appendChild(document.createElement('br'));
        item.appendChild(user);
        item.appendChild(document.createElement('br'));
        item.appendChild(category);
        item.appendChild(document.createElement('br'));
        item.appendChild(priority);
        item.appendChild(document.createElement('br'));
        item.appendChild(status);

        ticketList.appendChild(item);
    });
}

function filterTicketsByStatus(...statuses) {
    const filteredTickets = chamados.filter(ticket =>
        statuses.includes(ticket.status.toLowerCase())
    );

    renderTickets(filteredTickets);
}


allticketsButton.addEventListener('click', () => {
    renderTickets(chamados);
});

openTicketsButton.addEventListener('click', () => {
    filterTicketsByStatus('aberto');
});

closedTicketsButton.addEventListener('click', () => {
    filterTicketsByStatus(
        'fechado',
        'resolvido',
        'cancelado'
    );
});

statusText.textContent = `Total de tickets: ${chamados.length}\nAbertos: ${chamados.filter(i => i.status.toLocaleLowerCase() === 'aberto').length}\nFechados: ${chamados.filter(i => i.status.toLocaleLowerCase() === 'fechado').length}`;



function addTicket() {
    const newTitle = document.getElementById('newTitle').value;
    const newUser = document.getElementById('newUser').value;
    const newCategory = document.getElementById('newCategory').value;
    const newPriority = document.getElementById('newPriority').value;
    const newStatus = document.getElementById('newStatus').value;

    if (!newTitle || !newUser) {
        alert("Preencha título e usuário");
        return;
    }

    const chamado = {
        id: new Date().toLocaleDateString(),
        title: newTitle,
        user: newUser,
        status: newStatus,
        priority: newPriority,
        category: newCategory
    };

    chamados.push(chamado);

    localStorage.setItem("tickets", JSON.stringify(chamados));

    renderTickets(chamados);
}

document
    .getElementById("submitTicket")
    .addEventListener("click", addTicket);

// console.log(tickets);

