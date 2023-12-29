document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = `https://api.cricapi.com/v1/currentMatches?apikey=b242002b-896f-463b-888a-16e43a9c21fc&offset=0`;
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
        console.log(seriesDetails); // Log the seriesDetails to see its structure
        const startTimeUTC = new Date(seriesDetails.dateTimeGMT);
        const startTimeIST = startTimeUTC.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        seriesElement.innerHTML = `
        <div class="scorecard">
                     <h2>${seriesDetails.name}</h2>
                      <p>${seriesDetails.venue} | ${startTimeIST}</p>
                      <div class="teams">
                         <div class="team">
                               <img src="${seriesDetails.teamInfo[0].img}" alt="${seriesDetails.teamInfo[0].name}">
                               <p>${seriesDetails.teamInfo[0].shortname}</p>
                               ${seriesDetails.score[0] ? '<p>' + seriesDetails.score[0].r + '/' + seriesDetails.score[0].w + ' (' + seriesDetails.score[0].o + ' overs)</p>' : ''}
                      </div>
                            <div class="team">
                               <img src="${seriesDetails.teamInfo[1].img}" alt="${seriesDetails.teamInfo[1].name}">
                              <p>${seriesDetails.teamInfo[1].shortname}</p>
                              ${seriesDetails.score[1] ? '<p>' + seriesDetails.score[1].r + '/' + seriesDetails.score[1].w + ' (' + seriesDetails.score[1].o + ' overs)</p>' : ''}
                            </div>
                      </div>
                      <p>Status: ${seriesDetails.status}</p>
                     </div>
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
