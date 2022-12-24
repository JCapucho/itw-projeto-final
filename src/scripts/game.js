const gameId = new URLSearchParams(window.location.search).get("id");

async function loadChartData() {
    const response = await fetch(`${API_URL}/Statistics/Medals_Country?id=${gameId}`);
    const res_data = await response.json();

    buildMedalChart("totalChart", res_data);
    buildMedalChart("goldChart", res_data, record => record.MedalId === 1);
    buildMedalChart("silverChart", res_data, record => record.MedalId === 2);
    buildMedalChart("bronzeChart", res_data, record => record.MedalId === 3);
}

async function loadMap(city, country) {
    const params = new URLSearchParams({ city, country, format: "json" });
    const response = await fetch("https://nominatim.openstreetmap.org/search?" + params);
    const data = await response.json();

    const result = data[0];

    const lat = result.lat;
    const lon = result.lon;

    const map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marker = L.marker([lat, lon]).addTo(map);

    marker.bindPopup(`${city}, ${country}`).openPopup();

    document.getElementById("mapModal").addEventListener('shown.bs.modal', function() {
        setTimeout(function() {
            map.invalidateSize();
        }, 10);
    });
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
        loadMap(data.City, data.CountryName)
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
