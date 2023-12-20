document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "b242002b-896f-463b-888a-16e43a9c21fc";
    const apiUrl = `https://api.cricapi.com/v1/series?apikey=${apiKey}&offset=6&search`;
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
        seriesElement.innerHTML = `
            <h2>${seriesDetails.name}</h2>
            <p>Start Date: ${seriesDetails.startDate}</p>
            <p>End Date: ${seriesDetails.endDate}</p>
            ${seriesDetails.t20 ? `<p>T20 Matches: ${seriesDetails.t20}</p>` : ''}
            ${seriesDetails.ODI ? `<p>ODI Matches: ${seriesDetails.ODI}</p>` : ''}
            ${seriesDetails.tests ? `<p>Test Matches: ${seriesDetails.tests}</p>` : ''}
        `;

        // Add the 'active' class to make the series details visible
        seriesElement.classList.add('active');
    }

    function rotateSeries() {
        setInterval(function () {
            currentIndex = (currentIndex + 1) % data.data.length;
            displaySeriesDetails();
        }, 8000);
    }

    // Fetch series data when the page loads
    fetchSeriesData();
});
