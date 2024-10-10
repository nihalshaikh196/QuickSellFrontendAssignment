import React from 'react';
import Card from './Card';
import "../Styles/column.css"
import { useBoard } from '../Context/BoardContext';
import UrgentPriority from "../utils/SVG - Urgent Priority colour.svg"
import HighPriority from "../utils/Img - High Priority.svg";
import LowPriority from "../utils/Img - Low Priority.svg";
import MediumPriority from "../utils/Img - Medium Priority.svg";
import NoPriority from "../utils/No-priority.svg";
import UserIcon from "../utils/userIconPNG.png";
import InProgress from "../utils/in-progress.svg";
import Done from "../utils/Done.svg";
import Cancelled from "../utils/Cancelled.svg";
import ToDo from "../utils/To-do.svg";
import BackLog from "../utils/Backlog.svg";
import Add from "../utils/add.svg";
import menu from "../utils/3 dot menu.svg"

const Column = ({ title, tickets, users }) => {
    const {grouping} = useBoard();
  const getIcon = () => {
    switch (grouping) {
      case 'priority':
        switch (title) {
          case 'Urgent': return <img src={UrgentPriority} alt="Urgent" />;
          case 'High': return <img src={HighPriority} alt="High" />;
          case 'Medium': return <img src={MediumPriority} alt="Medium" />;
          case 'Low': return <img src={LowPriority} alt="Low" />;
          default: return <img src={NoPriority} alt="No Priority" />;
        }
      case 'status':
        switch (title) {
          case 'In progress': return <img src={InProgress} alt="In Progress" />;
          case 'Done': return <img src={Done} alt="Done" />;
          case 'Cancelled': return <img src={Cancelled} alt="Cancelled" />;
          case 'Todo': return <img src={ToDo} alt="Todo" />;
          case 'Backlog': return <img src={BackLog} alt="Backlog" />;
          default: return null;
        }
      case 'user':
        return <img src={UserIcon} alt="User" />;
      default:
        return null;
    }
  };

  return (
    <div className="column">
        <div className='column-header'>
            <div className='segment'>
            <span className="title-icon">{getIcon()}</span>
            <span className='title'>{title}</span> 
            <span className="ticket-count">{tickets.length}</span>
            </div>
            <div className='segment'>
            <span className='title-icon'>
                <img src={Add} alt='AddIcon'/>
            </span>
            <span className='title-icon'>
                <img src={menu} alt='MenuIcon'/>
            </span>
            </div>
        </div>
        <div className="cards-container">
            {tickets.map(ticket => (
              <Card key={ticket.id} ticket={ticket} user={users.find(user => user.id === ticket.userId)} />
            ))}
          </div>
    </div>
  );
};

export default Column;