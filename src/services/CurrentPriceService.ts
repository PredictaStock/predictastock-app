class CurrentPriceService {
    async execute(stockName: string): Promise<number[]> {
        try {
            const response = await fetch(`http://localhost:3001/stock/${stockName}`);
            const data = await response.json();
            console.log(data);
            return data; // Assuming data is an array of numbers representing stock prices
        } catch (error) {
            console.error('Error fetching current price:', error);
            throw error; // Re-throw the error to be caught by the caller
        }
    }
}

export default CurrentPriceService;
