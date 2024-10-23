import React from 'react';
import Card from '../Card/Card';
import './Board.css';

const Board = ({ tickets, users, grouping, ordering }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return '⚡'; // Urgent
      case 3: return '🔴'; // High
      case 2: return '🔵'; // Medium
      case 1: return '🟢'; // Low
      default: return '⚪'; // No priority
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'todo': return '🔲';
      case 'in progress': return '🔄';
      case 'done': return '✅';
      case 'canceled': return '❌';
      default: return '⭕';
    }
  };

  const groupTickets = () => {
    let grouped = {};
    
    if (grouping === 'status') {
      grouped = {
        'Todo': [],
        'In Progress': [],
        'Done': [],
        'Canceled': []
      };
      tickets.forEach(ticket => {
        const status = ticket.status;
        if (!grouped[status]) grouped[status] = [];
        grouped[status].push(ticket);
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        grouped[user.name] = [];
      });
      tickets.forEach(ticket => {
        const user = users.find(u => u.id === ticket.userId);
        if (user) {
          grouped[user.name].push(ticket);
        }
      });
    } else if (grouping === 'priority') {
      grouped = {
        'No priority': [],
        'Urgent': [],
        'High': [],
        'Medium': [],
        'Low': []
      };
      tickets.forEach(ticket => {
        const priority = ticket.priority;
        const priorityName = ['No priority', 'Low', 'Medium', 'High', 'Urgent'][priority];
        grouped[priorityName].push(ticket);
      });
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (ordering === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([groupName, tickets]) => (
        <div key={groupName} className="board-column">
          <div className="column-header">
            <div className="column-header-left">
              {grouping === 'priority' && getPriorityIcon(tickets[0]?.priority)}
              {grouping === 'status' && getStatusIcon(groupName)}
              {grouping === 'user' && '👤'}
              <span>{groupName}</span>
              <span className="ticket-count">{tickets.length}</span>
            </div>
            <div className="column-header-right">
              <button className="icon-button">+</button>
              <button className="icon-button">⋮</button>
            </div>
          </div>
          <div className="column-tickets">
            {tickets.map(ticket => (
              <Card 
                key={ticket.id}
                ticket={ticket}
                user={users.find(u => u.id === ticket.userId)}
                grouping={grouping}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;