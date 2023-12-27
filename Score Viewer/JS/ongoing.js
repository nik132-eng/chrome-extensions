document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = `https://api.cricapi.com/v1/cricScore?apikey=b242002b-896f-463b-888a-16e43a9c21fc`;
    let data = [];
    let currentIndex = 0;

    async function fetchSeriesData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            data = await response.json();
            displaySeriesDetails(); // Call the function to display series details
            rotateSeries(); // Start rotating series every 8 seconds
        } catch (error) {
            console.error('Error fetching series data:', error);
        }
    }

    function displaySeriesDetails() {
        const seriesElement = document.getElementById('series');
        seriesElement.innerHTML = ''; // Clear previous content

        // Display details for the active series (currentIndex)
        const seriesDetails = data.data[currentIndex];
        const startTimeUTC = new Date(seriesDetails.dateTimeGMT);
        const startTimeIST = startTimeUTC.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        seriesElement.innerHTML = `
            <h2>Match Type: ${seriesDetails.matchType}</h2>
            <p>Start Time: ${startTimeIST}</p>
            <p>${seriesDetails.t1} vs ${seriesDetails.t2}</p>
             <p>Status: ${seriesDetails.status}</p>
        `;

        // Add the 'active' class to make the series details visible
        seriesElement.classList.add('active');
    }

    function rotateSeries() {
        setInterval(function () {
            currentIndex = (currentIndex + 1) % data.data.length;
            displaySeriesDetails();
        }, 6000);
    }

    // Fetch series data when the page loads
    fetchSeriesData();
});
