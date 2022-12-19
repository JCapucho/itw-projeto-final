const params = new URLSearchParams(window.location.search);
const countryId = params.get("country");
const gameId = params.get("game");

function buildGraph(athletes) {
    let firstPlace = 0, secondPlace = 0, thirdPlace = 0;

    for (const athlete of athletes) {
        switch(athlete.BestPosition) {
            case 1:
                firstPlace += 1;
                break;
            case 2:
                secondPlace += 1;
                break;
            case 3:
                thirdPlace += 1;
                break;
        }
    }

    new Chart(
        document.getElementById("athletesPerCountryChart"),
        {
            type: 'bar',
            data: {
                labels: ["Bronze medals", "Gold medals", "Silver Medals"],
                datasets: [{
                    label: 'Medals',
                    data: [thirdPlace, firstPlace, secondPlace],
                    backgroundColor: [
                        'rgba(167, 112, 116)',
                        'rgba(252, 180, 52)',
                        'rgba(167, 167, 173)',
                    ],
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        }
    );
}

function CountryViewModel() {
    const self = this;

    self.game = ko.observable(null);
    self.country = ko.observable(null);
    self.athletes = ko.observableArray([]);

    self.athletesList = createCollapsibleListObject(() => self.athletes());


    async function loadAthletesInfo([country, game]) {
        const params = new URLSearchParams({ id: game.Id, IOC: country.IOC });
        const response = await fetch(`${API_URL}/Statistics/Athlete_Country?` + params);
        const data = await response.json();
        self.athletes(data);
        buildGraph(data);
    }

    async function loadCountryInfo() {
        const response = await fetch(`${API_URL}/Countries/${countryId}`);
        const data = await response.json();
        self.country(data);
        return data;
    }

    async function loadGameInfo() {
        const response = await fetch(`${API_URL}/Games/FullDetails?id=${gameId}`);
        const data = await response.json();
        self.game(data);
        return data;
    }

    self.country.subscribe(function(newValue) {
        document.title = `${newValue.Name} - ${document.title}`;
    });

    Promise.all([loadCountryInfo(), loadGameInfo()])
        .then(loadAthletesInfo)
}

if (countryId === null || gameId === null) {
    window.location.href = `countries.html`
} else {
    ko.applyBindings(new CountryViewModel())
}
