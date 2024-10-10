import React from 'react';
import "../Styles/card.css"
import { useBoard } from '../Context/BoardContext';
import UserIcon from "../utils/userIconPNG.png"
import Circle from "../utils/circle.png"
import UrgentPriority from "../utils/SVG - Urgent Priority grey.svg"
import HighPriority from "../utils/Img - High Priority.svg";
import LowPriority from "../utils/Img - Low Priority.svg";
import MediumPriority from "../utils/Img - Medium Priority.svg";
import NoPriority from "../utils/No-priority.svg";
import InProgress from "../utils/in-progress.svg";
import Done from "../utils/Done.svg";
import Cancelled from "../utils/Cancelled.svg";
import ToDo from "../utils/To-do.svg";
import BackLog from "../utils/Backlog.svg";

const Card = ({ ticket, user }) => {
  const { grouping } = useBoard();

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return <img src={UrgentPriority} alt="Urgent" />;
      case 3: return <img src={HighPriority} alt="High" />;
      case 2: return <img src={MediumPriority} alt="Medium" />;
      case 1: return <img src={LowPriority} alt="Low" />;
      default: return <img src={NoPriority} alt="No Priority" />;
    }
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return <img src={InProgress} alt="In Progress" />;
      case 'done': return <img src={Done} alt="Done" />;
      case 'cancelled': return <img src={Cancelled} alt="Cancelled" />;
      case 'todo': return <img src={ToDo} alt="To Do" />;
      case 'backlog': return <img src={BackLog} alt="Backlog" />;
      default: return null;
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <span className="user-avatar">
            <img src={UserIcon} alt={user.name} width="18" height="18" />
            <span className={`availability-indicator ${user.available ? 'available' : 'unavailable'}`}></span>
          </span>
        )}
      </div>
      <div className="card-content">
        {grouping !== 'status' && (
          <span className="status">
            {getStatusIcon(ticket.status)}
          </span>
        )}
        <span className="card-title">{ticket.title}</span>
      </div>
      <div className="card-footer">
        {grouping !== 'priority' && (
          <span className="priority">
            {getPriorityIcon(ticket.priority)}
          </span>
        )}
        <span className="tag">
          <img src={Circle} alt='O'/>
          {ticket.tag[0]}
        </span>
      </div>
    </div>
  );
};

export default Card;