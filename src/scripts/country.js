const countryId = new URLSearchParams(window.location.search).get("id");

async function loadMap(country) {
    const params = new URLSearchParams({ country, format: "json", polygon_geojson: 1 });
    const response = await fetch("https://nominatim.openstreetmap.org/search?" + params);
    const data = await response.json();

    const result = data[0];

    const lat = result.lat;
    const lon = result.lon;

    const map = L.map('map').setView([lat, lon], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.geoJson(result.geojson).addTo(map);

    document.getElementById("mapModal").addEventListener('shown.bs.modal', function() {
        setTimeout(function() {
            map.invalidateSize();
        }, 10);
    });
}

function CountryViewModel() {
    const self = this;

    self.country = ko.observable(null);

    self.participantList = createCollapsibleListObject(() => self.country()?.Participant);
    self.eventsList = createCollapsibleListObject(() => self.country()?.Events);

    async function loadCountryInfo() {
        const response = await fetch(`${API_URL}/Countries/${countryId}`);
        const data = await response.json();
        console.log(data);
        self.country(data);

        loadMap(data.Name);
    }

    self.country.subscribe(function(newValue) {
        document.title = `${newValue.Name} - ${document.title}`;
    });

    loadCountryInfo();
}

if (countryId === null) {
    window.location.href = `countries.html`
} else {
    ko.applyBindings(new CountryViewModel())
}
