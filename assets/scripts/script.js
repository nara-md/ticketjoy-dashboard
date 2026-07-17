import tickets from './json/tickets.json' with { type: 'json' };

const ticketList = document.getElementById('ticketList');
const allticketsButton = document.getElementById('allTickets');
const openTicketsButton = document.getElementById('openTickets');
const closedTicketsButton = document.getElementById('closedTickets');
const statusText = document.getElementById('statusText');
let chamados = JSON.parse(localStorage.getItem("tickets")) || [...tickets];

let editingId = null;

function renderTickets(tickets) {
    ticketList.innerHTML = '';
    ticketList.style.display = 'block';


    tickets.forEach(ticket => {
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Excluir';

        const item = document.createElement('li');
        const user = document.createElement('span');
        user.textContent = ticket.user;
        const category = document.createElement('span');
        category.textContent = ticket.category;
        const priority = document.createElement('span');
        priority.textContent = ticket.priority;
        const status = document.createElement('span');
        status.textContent = ticket.status;
        const createdAt = document.createElement('span');
        createdAt.textContent = ticket.createdAt;

        deleteButton.addEventListener('click', () => {
            deleteTicket(ticket.id);
        })

        editButton.addEventListener('click', () => {
            editingId = ticket.id;

            document.getElementById('newUser').value = ticket.user;
            document.getElementById('newCategory').value = ticket.category;
            document.getElementById('newPriority').value = ticket.priority;
            document.getElementById('newStatus').value = ticket.status;
        })

        item.appendChild(user);
        item.appendChild(document.createElement('br'));
        item.appendChild(category);
        item.appendChild(document.createElement('br'));
        item.appendChild(priority);
        item.appendChild(document.createElement('br'));
        item.appendChild(status);
        item.appendChild(document.createElement('br'));
        item.appendChild(createdAt);

        item.appendChild(deleteButton);
        item.appendChild(editButton);
        ticketList.appendChild(item);
        updateStatusText();
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

allticketsButton.click();

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

function updateStatusText() {
    statusText.textContent = `
    Total de tickets: ${chamados.length}
    Abertos: ${chamados.filter(i => i.status.toLowerCase() === 'aberto').length}
    Fechados: ${chamados.filter(i => i.status.toLowerCase() === 'fechado').length}
    `;
};

function resetForm() {
    document.getElementById('newUser').value = '';
    document.getElementById('newCategory').value = '';
    document.getElementById('newPriority').value = 'normal';
    document.getElementById('newStatus').value = 'aberto';
}

function addTicket() {
    const newUser = document.getElementById('newUser').value;
    const newCategory = document.getElementById('newCategory').value;
    const newPriority = document.getElementById('newPriority').value;
    const newStatus = document.getElementById('newStatus').value;

    const now = new Date()

    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const hour = now.getHours();
    const minute = now.getMinutes();

    const date = `${day}/${month}/${year} | ${hour}:${minute}`

    if (!newUser) {
        alert("Preencha o usuário");
        return;
    }

    const chamado = {
        id: crypto.randomUUID(),
        user: newUser,
        status: newStatus,
        priority: newPriority,
        category: newCategory,
        createdAt: date
    };

    if (editingId !== null) {
        const ticket = chamados.find(t => t.id === editingId);

        ticket.user = newUser;
        ticket.category = newCategory;
        ticket.priority = newPriority;
        ticket.status = newStatus;
        ticket.createdAt = date;
        resetForm();
    } else {
        chamados.push(chamado);
        resetForm();
    }

    localStorage.setItem("tickets", JSON.stringify(chamados));

    renderTickets(chamados);
}

function deleteTicket(id) {
    chamados = chamados.filter(ticket => ticket.id !== id);

    localStorage.setItem("tickets", JSON.stringify(chamados));

    renderTickets(chamados);
}

document
    .getElementById("submitTicket")
    .addEventListener("click", addTicket);

// Teste do arquivo JSON
// console.log(tickets);

