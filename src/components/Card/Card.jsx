import React from 'react';
import './Card.css';

const Card = ({ ticket, user, grouping }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return '⚡';
      case 3: return '🔴';
      case 2: return '🔵';
      case 1: return '🟢';
      default: return '⚪';
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

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <div className="user-avatar">
            {user?.name.charAt(0)}
            <div className="availability-indicator"></div>
          </div>
        )}
      </div>
      
      <div className="card-title">
        {grouping !== 'status' && (
          <span className="status-icon">{getStatusIcon(ticket.status)}</span>
        )}
        <p>{ticket.title}</p>
      </div>
      
      <div className="card-tags">
        {grouping !== 'priority' && (
          <div className="priority-tag">
            {getPriorityIcon(ticket.priority)}
          </div>
        )}
        {ticket.tag && (
          <div className="feature-tag">
            <span>●</span> {ticket.tag}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;