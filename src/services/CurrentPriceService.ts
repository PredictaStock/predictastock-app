class CurrentPriceService {
    async execute(stockName: string): Promise<void> {
        try {
            const response = await fetch(`http://127.0.0.1:5000/stock/${stockName}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching current price:', error);
        }
    }
}

export default CurrentPriceService;
