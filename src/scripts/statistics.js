Chart.defaults.font.family = 'Open Sans';
Chart.defaults.font.size = 16;

function filterData(sortedData, predicate) {
    const results = [];

    for (let i = 0; i < sortedData.length; i++) {
        const record = sortedData[i];

        if (predicate(record)) {
            results.push(record.Counter);
        } else if (i + 1 < sortedData.length) {
            const nextRecord = sortedData[i + 1];

            const nextCheck = nextRecord.Year !== record.Year;
            let prevCheck = true;

            if (i - 1 > 0) {
                const prevRecord = sortedData[i - 1];
                prevCheck = prevRecord.Year !== record.Year
            }

            if (nextCheck && prevCheck)
                results.push(null);
        } else {
            results.push(null);
        }
    }

    return results;
}

function buildWinterSummerChart(chartId, title, data) {
    const sortedData = data.sort((a, b) => a.Year - b.Year);
    const labels = [...new Set(sortedData.map(record => record.Year))];

    let lastVisitedYear = 0;

    const summerData = filterData(sortedData, record => record.Name.includes("Summer"));
    const winterData = filterData(sortedData, record => record.Name.includes("Winter"));

    new Chart(
        document.getElementById(chartId),
        {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Summer game',
                        data: summerData,
                        borderColor: 'rgb(243, 135, 47)',
                        cubicInterpolationMode: 'monotone',
                        backgroundColor: 'rgba(243, 135, 47, 0.5)',
                        pointHoverRadius: 7
                    },
                    {
                        label: 'Winter game',
                        data: winterData,
                        borderColor: 'rgb(160, 230, 255)',
                        cubicInterpolationMode: 'monotone',
                        backgroundColor: 'rgba(160, 230, 255, 0.5)',
                        pointHoverRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                spanGaps: true,
                plugins: {
                    title: {
                        display: true,
                        text: title
                    },
                    tooltip: {
                        mode: "index",
                        intersect: true,
                        position: 'nearest',
                        bodySpacing: 4
                    }
                },
            },
        }
    );
}

async function loadAthletesPerGameChartData() {
    const response = await fetch(`${API_URL}/Statistics/Games_Athletes`);
    const data = await response.json();

    buildWinterSummerChart('athletesPerGameChart', 'Athletes per game', data);
}

async function loadCompetitionsPerGameChartData() {
    const response = await fetch(`${API_URL}/Statistics/Games_Competitions`);
    const data = await response.json();

    buildWinterSummerChart('competitionPerGameChart', 'Competitions per game', data);
}

async function loadCountriesPerGameChartData() {
    const response = await fetch(`${API_URL}/Statistics/Games_Countries`);
    const data = await response.json();

    buildWinterSummerChart('countryPerGameChart', 'Countries per game', data);
}

async function loadModalitiesPerGameChartData() {
    const response = await fetch(`${API_URL}/Statistics/Games_Modalities`);
    const data = await response.json();

    buildWinterSummerChart('modalityPerGameChart', 'Modalities per game', data);
}

loadCountriesPerGameChartData();
loadAthletesPerGameChartData();
loadModalitiesPerGameChartData();
loadCompetitionsPerGameChartData();
