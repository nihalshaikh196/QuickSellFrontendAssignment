import React, { useState, useEffect } from "react";
import Board from "./Screens/main";
import HeaderBar from "./Components/Header";
import { BoardProvider } from "./Context/BoardContext";


const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch(process.env.REACT_APP_API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <BoardProvider>
      <div className="app">
        <HeaderBar />
        <Board tickets={tickets} users={users} />
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f5f7;
            color: #1e293b;
          }
          .app {
            margin: 0 auto;
            padding: 16px;
          }
        `}</style>
      </div>
    </BoardProvider>
  );
};

export default App;
