function buildMedalChart(id, api_data, predicate = (_ => true)) {
    let medalsTotal = 0;
    const labels = [];
    const data = [];
    const ids = [];

    for (const record of api_data) {
        let medals = 0;
        for (const medal of record.Medals) {
            if (!predicate(medal)) continue;

            medals += medal.Counter;
        }

        medalsTotal += medals;

        if(medals === 0) continue;

        labels.push(record.CountryName);
        ids.push(record.CountryId);
        data.push(medals);
    }

    let i = 0;
    while (i < data.length) {
        if (data[i] / medalsTotal < 0.01) {
            data.splice(i, 1);
            continue;
        }

        i++;
    }

    new Chart(document.getElementById(id), {
        type: 'pie',
        data: { labels, datasets: [{ data }] },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            interaction: {
                mode: 'index'
            },
            onClick: (event, actives, chart) => {
                let active = actives[0];
                if (active) {
                    window.location.href = `country.html?id=${ids[active.index]}`;
                }
            }
        },
    });
}
