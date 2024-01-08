document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'V6MBDCOJSGNVIWJD';
    const stockSymbols = ['GOOGL', 'AMZN', 'MSFT', 'AAPL', 'FB'];
    let currentIndex = 0;

    async function fetchStockData(symbol) {
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${symbol}. Status: ${response.status}`);
            }

            const data = await response.json();
            return {
                symbol: symbol,
                data: data['Time Series (1min)']
            };
        } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);
            return null;
        }
    }

    async function fetchSeriesData() {
        const promises = stockSymbols.map(symbol => fetchStockData(symbol));
        const stockDataList = await Promise.all(promises);

        const validStockData = stockDataList.filter(data => data !== null);

        console.log(validStockData);
        displaySeriesDetails(validStockData); // Call the function to display series details
        rotateSeries(); // Start rotating series every 8 seconds
    }

    function displaySeriesDetails(stockDataList) {
        const seriesElement = document.getElementById('series');
        seriesElement.innerHTML = ''; // Clear previous content

        const currentStock = stockDataList[currentIndex];

        if (currentStock) {
            const latestTimestamp = Object.keys(currentStock.data)[0];
            const latestPrice = currentStock.data[latestTimestamp]['1. open'];

            seriesElement.innerHTML = `
                <h2>${currentStock.symbol}</h2>
                <p>${latestPrice}</p>
            `;

            // Add the 'active' class to make the series details visible
            seriesElement.classList.add('active');
        }
    }

    function rotateSeries() {
        setInterval(function () {
            currentIndex = (currentIndex + 1) % stockSymbols.length;
            fetchSeriesData();
        }, 8000);
    }

    // Fetch series data when the page loads
    fetchSeriesData();
});
