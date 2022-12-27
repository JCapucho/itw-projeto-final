const athleteId = new URLSearchParams(window.location.search).get("id");

async function loadMap(place) {
  const params = new URLSearchParams({ q: place, format: "json" });
  const response = await fetch(
    "https://nominatim.openstreetmap.org/search?" + params
  );
  const data = await response.json();

  const result = data[0];

  const lat = result.lat;
  const lon = result.lon;

  const map = L.map("map").setView([lat, lon], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const marker = L.marker([lat, lon]).addTo(map);

  marker.bindPopup(place).openPopup();

  document
    .getElementById("mapModal")
    .addEventListener("shown.bs.modal", function () {
      setTimeout(function () {
        map.invalidateSize();
      }, 10);
    });
}

function AthleteViewModel() {
  const self = this;

  self.athlete = ko.observable(null);

  self.gamesList = createCollapsibleListObject(() => self.athlete()?.Games);
  self.modalitiesList = createCollapsibleListObject(
    () => self.athlete()?.Modalities
  );
  self.competitionsList = createCollapsibleListObject(
    () => self.athlete()?.Competitions
  );

  self.sexIcon = ko.computed(function () {
    const sex = this.athlete()?.Sex;

    if (sex === null) return null;

    const iconName = sex == "M" ? "mars" : "venus";
    const icon = `<i class="fa fa-${iconName}" aria-hidden="true"></i>`;
    const sexName = sex == "M" ? "Masculino" : "Feminino";

    return sexName + " " + icon;
  }, this);

  self.athlete.subscribe(function (newValue) {
    document.title = `${newValue.Name} - ${document.title}`;
  });

  async function loadAthleteInfo() {
    const response = await fetch(
      `${API_URL}/Athletes/FullDetails?id=${athleteId}`
    );
    const data = await response.json();
    console.log(data);
    self.athlete(data);

    if (data.BornPlace) loadMap(data.BornPlace);
  }

  loadAthleteInfo();
}

if (athleteId === null) {
  window.location.href = `athletes.html`;
} else {
  ko.applyBindings(new AthleteViewModel());
}
