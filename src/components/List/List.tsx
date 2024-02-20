import React, { useState } from 'react';
import { Box } from '@mui/material';
import data from "../../ListData.json";
import "./List.css";
import CurrentPriceService from '../../services/CurrentPriceService';

function List(props: { input: string; }) {
    // Create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        // If no input, return the original
        if (props.input === '') {
            return true;
        }
        // Return the item which contains the user input
        return el.name.toLowerCase().includes(props.input.toLowerCase());
    });

    const handleClick = async (stockName: string) => {
        const service = new CurrentPriceService(); // Create an instance of CurrentPriceService
        try {
            const data = await service.execute(stockName); // Execute the execute method with the stockName
            console.log(data); // Log the data returned from the execute method
        } catch (error) {
            console.error('Error executing CurrentPriceService:', error);
        }
    };

    return (
        <div>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" width="600px">
                {filteredData.map((item) => (
                    <div key={item.id} onClick={() => handleClick(item.name)} style={{ cursor: 'pointer' }}>
                        <Box className="box" color="black" p={1} m={1} width="200px" height="200px">
                            
                            {item.name}
                            <br />                           
                        </Box>
                    </div>
                ))}
            </Box>
        </div>
    );
}

export default List;
