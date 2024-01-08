document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,cardano&vs_currencies=usd';
    let data = {};
    let currentIndex = 0;

    async function fetchSeriesData() {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            data = await response.json();
            console.log(data);
            displaySeriesDetails(); // Call the function to display series details
            rotateSeries(); // Start rotating series every 8 seconds
        } catch (error) {
            console.error('Error fetching series data:', error);
        }
    }

    function displaySeriesDetails() {
        const seriesElement = document.getElementById('series');
        seriesElement.innerHTML = ''; // Clear previous content

        const currencyCodes = Object.keys(data);
        const currentCurrency = currencyCodes[currentIndex];
        const seriesDetails = data[currentCurrency];

        console.log(seriesDetails); // Log the seriesDetails to see its structure

        getCryptoImage(currentCurrency).then(imageUrl => {
            seriesElement.innerHTML = `
                <h2>${getFullName(currentCurrency)}</h2>
                <img src="${imageUrl}" alt="${currentCurrency}">
                <p>${currentCurrency}: ${seriesDetails.usd} USD</p>
            `;

            // Add the 'active' class to make the series details visible
            seriesElement.classList.add('active');
        });
    }

    function rotateSeries() {
        setInterval(function () {
            currentIndex = (currentIndex + 1) % Object.keys(data).length;
            displaySeriesDetails();
        }, 8000);
    }

    function getFullName(shortCode) {
        const fullNameMapping = {
            'bitcoin': 'Bitcoin',
            'ethereum': 'Ethereum',
            'ripple': 'Ripple',
            'litecoin': 'Litecoin',
            'cardano': 'Cardano',
        };

        return fullNameMapping[shortCode] || shortCode;
    }

    async function getCryptoImage(shortCode) {
        const imageUrl = `https://api.coingecko.com/api/v3/coins/${shortCode}`;
        
        try {
            const response = await fetch(imageUrl);
            const coinData = await response.json();
            
            return coinData.image && coinData.image.small;
        } catch (error) {
            console.error('Error fetching image data:', error);
            return 'url_to_default_image'; // Provide a default image URL
        }
    }

    // Fetch series data when the page loads
    fetchSeriesData();
});
