import React, { createContext, useState, useContext} from 'react';

const BoardContext = createContext();

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};
const priorityOrder = [4, 3, 2, 1, 0];
const statusOrder = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

export const BoardProvider = ({ children }) => {
  const [grouping, setGrouping] = useState(() => localStorage.getItem("grouping") || "status");
  const [ordering, setOrdering] = useState(() => localStorage.getItem("ordering") || "priority");

  const updateGrouping = (newGrouping) =>{
    localStorage.setItem("grouping", newGrouping);
    setGrouping(newGrouping);
  } 
  const updateOrdering = (newOrdering) =>{
    localStorage.setItem("ordering", newOrdering);
    setOrdering(newOrdering);
  } 

  const groupAndSortTickets = (tickets, users) => {
    const grouped = {};

    tickets.forEach((ticket) => {
      let key = "";
      if (grouping === "status") {
        key = ticket.status;
      } else if (grouping === "user") {
        const user = users.find((u) => u.id === ticket.userId);
        key = user ? user.name : "Unassigned";
      } else if (grouping === "priority") {
        key = priorityLabels[ticket.priority];
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });

    Object.values(grouped).forEach((group) => {
      group.sort((a, b) => (ordering === "priority" ? b.priority - a.priority : a.title.localeCompare(b.title)));
    });

    if (grouping === "priority") {
      return Object.fromEntries(
        priorityOrder.map((p) => [priorityLabels[p], grouped[priorityLabels[p]] || []])
      );
    }

    if (grouping === "status") {
      return Object.fromEntries(
        statusOrder.map((status) => [status, grouped[status] || []])
      );
    }

    return grouped;
  };


  return (
    <BoardContext.Provider value={{ 
      grouping, 
      ordering, 
      updateGrouping, 
      updateOrdering, 
      groupAndSortTickets
    }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);