import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LineChart from '../../components/Chart/Chart';
import PredictionService from '../../services/PredictionService'; // Import PredictionService
import "./stockPage.css"

function StockPage() {
  const { stockName } = useParams<{ stockName: string }>(); // Get the stockName from URL params
  const [prediction, setPrediction] = useState<number | null>(null); // State to store prediction
  const predictionService = new PredictionService(); // Create an instance of PredictionService

  useEffect(() => {
    // Fetch prediction data when component mounts
    async function fetchPrediction() {
        try {
          if (!stockName) return; // Return if stockName is falsy
          const predictionResult = await predictionService.execute(stockName);
          setPrediction(predictionResult);
        } catch (error) {
          console.error('Error fetching prediction:', error);
        }
      }      
    fetchPrediction();
  }, [predictionService, stockName]); // Call useEffect whenever stockName changes

  return (
    <div className='stockPage'>
      <h1>PredictaStock</h1>
      <h2 style={{fontSize: '40px'}}>{stockName}</h2>
      {prediction !== null && (
        <div className="prediction" style={{ fontSize: '20px' }}>Preço de fechamento esperado para hoje: {prediction}</div>
        )}
      <LineChart stockName={stockName} /> {/* Pass the stockName */}
    </div>
  );
}

export default StockPage;
