import tickets from './tickets.json' with { type: 'json' };

const ticketList = document.getElementById('ticketList');
const allticketsButton = document.getElementById('allTickets');
const openTicketsButton = document.getElementById('openTickets');
const closedTicketsButton = document.getElementById('closedTickets');

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

    function filterTicketsByStatus(status) {
        const filteredTickets = tickets.filter(ticket => ticket.status.toLocaleLowerCase() === status.toLocaleLowerCase());
        renderTickets(filteredTickets);
    };

    allticketsButton.addEventListener('click', () => {
        renderTickets(tickets);
    });

    openTicketsButton.addEventListener('click', () => {
        filterTicketsByStatus('aberto');
    });

    closedTicketsButton.addEventListener('click', () => {
        filterTicketsByStatus('fechado');
    });

// console.log(tickets);

