class PredictionService {
    async execute(stockName: string): Promise<number> {
      try {
        const response = await fetch(`http://localhost:3001/stock/${stockName}/prediction`);
        if (!response.ok) {
          throw new Error('Failed to fetch prediction');
        }
        const data = await response.json();
        return data.prediction as number;
      } catch (error) {
        // Handle error if request fails
        console.error('Error fetching prediction:', error);
        throw error; // Re-throw the error to handle it outside
      }
    }
  }
  
  export default PredictionService;
  