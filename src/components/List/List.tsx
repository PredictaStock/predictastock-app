import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import data from "../../ListData.json";
import "./List.css";
import CurrentPriceService from '../../services/CurrentPriceService';
import { FaChartLine } from "react-icons/fa";
import { Link } from 'react-router-dom';

function List(props: { input: string; }) {
    // Create a new array by filtering the original array

    const filteredData = data.filter((el) => {
        if (props.input === '') {
            return true;
        }
        return el.name.toLowerCase().includes(props.input.toLowerCase());
    });

    const [prices, setPrices] = useState<Record<string, number | undefined>>({});
    const [loading, setLoading] = useState<boolean>(true);
    let successfullyFetchedCount = 0; // Track the count of successfully fetched prices

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPrices: Record<string, number | null> = {};

    
            for (const item of filteredData) {
                const service = new CurrentPriceService();
                try {
                    const priceData = await service.execute(item.name);
                    const lastPrice = priceData[priceData.length - 1]; // Get the last element of the array
                    fetchedPrices[item.name] = lastPrice;
                    
                } catch (error) {
                    console.error(`Error fetching price for ${item.name}:`, error);
                    fetchedPrices[item.name] = null; // Set price to null if there's an error
                }
            }
    
            // Check if all prices have been fetched successfully before setting loading to false
            if (successfullyFetchedCount >= filteredData.length) {
                setLoading(false);
            }

            else {
                successfullyFetchedCount = 40
                fetchData();
            }
    
            // Filter out null values and convert remaining values to numbers
            const filteredPrices: Record<string, number> = {};
            for (const key in fetchedPrices) {
                const price = fetchedPrices[key];
                if (typeof price === 'number') {
                    filteredPrices[key] = price;
                } else {
                    console.warn(`Price not available for ${key}`);
                }
            }
    
            setPrices(prevPrices => ({ ...prevPrices, ...filteredPrices }));
        };
    
        fetchData();
    }, []);
    

        
        return (
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" width="600px">
              {filteredData.map((item) => (
                <div key={item.id} style={{ cursor: 'pointer' }}>
                  <Link to={`/stockPage/${item.name}`}> {/* Navigate to stockPage with stockName as parameter */}
                    <Box className="box" color="black" p={1} m={1} width="200px" height="240px">
                      <div style={{ textAlign: 'center', fontSize: '24px' }}>{item.name}</div> {/* Centered and increased font size */}
                      <br />
                      {prices[item.name] !== undefined ? prices[item.name] : "No data available"}
                      <Box mt={2} textAlign="center">
                        <FaChartLine size={64} />
                      </Box>
                    </Box>
                  </Link>
                </div>
              ))}
            </Box>
          );
        }


export default List;
