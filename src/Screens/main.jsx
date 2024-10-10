import React from 'react';
import "../Styles/main.css"
import Column from "../Components/Column"
import { useBoard } from '../Context/BoardContext';

const Board = ({ tickets, users }) => {
    const { groupAndSortTickets } = useBoard();
    
    const groupedTickets = groupAndSortTickets(tickets, users);

    return (
        <div className="board">
            {Object.entries(groupedTickets).map(([group, groupTickets]) => (
                <Column 
                    key={group} 
                    title={group} 
                    tickets={groupTickets} 
                    users={users}
                />
            ))}
        </div>
    );
};

export default Board;