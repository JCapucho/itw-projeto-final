const gameId = new URLSearchParams(window.location.search).get("id");

function buildChart(id, api_data, predicate = (_ => true)) {
    let medalsTotal = 0;
    const labels = [];
    const data = [];
    const ids = [];

    for (const record of api_data) {
        let medals = 0;
        for (const medal of record.Medals) {
            console.log(id, medal, predicate(medal));
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

async function loadChartData() {
    const response = await fetch(`${API_URL}/Statistics/Medals_Country?id=${gameId}`);
    const res_data = await response.json();

    buildChart("totalChart", res_data);
    buildChart("goldChart", res_data, record => record.MedalId === 1);
    buildChart("silverChart", res_data, record => record.MedalId === 2);
    buildChart("bronzeChart", res_data, record => record.MedalId === 3);
}

function GameViewModel() {
    const self = this;

    self.game = ko.observable(null);

    self.modalitiesList = createCollapsibleListObject(() => self.game()?.Modalities);
    self.competitionsList = createCollapsibleListObject(() => self.game()?.Competitions);

    self.seasonIcon = ko.computed(function() {
        const season = self.game()?.Season;

        if (season === null) return null;

        const iconName = season == "Summer" ? "sun-o" : "snowflake-o";
        const iconColor = season == "Summer" ? "warning" : "info";
        const icon = `<i class="text-${iconColor} fa fa-${iconName}" aria-hidden="true"></i>`

        return icon + " " + season;
    }, self);

    async function loadGameInfo() {
        const response = await fetch(`${API_URL}/Games/FullDetails?id=${gameId}`);
        const data = await response.json();
        console.log(data);
        self.game(data);
        loadChartData();
    }

    self.game.subscribe(function(newValue) {
        document.title = `${newValue.Name} - ${document.title}`;
    });

    loadGameInfo();
}

if (gameId === null) {
    window.location.href = `games.html`
} else {
    ko.applyBindings(new GameViewModel())
}
