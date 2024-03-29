const favoritesSection = "competitions";
const competitionId = new URLSearchParams(window.location.search).get("id");

function CompetitionViewModel() {
  const self = this;

  self.competition = ko.observable(null);

  self.gamesList = createCollapsibleListObject(
    () => self.competition()?.Participant
  );

  async function loadCompetitionInfo() {
    const response = await fetch(`${API_URL}/Competitions/${competitionId}`);
    const data = await response.json();
    favoriteAdapter(favoritesSection)(data);
    self.competition(data);
  }

  self.competition.subscribe(function (newValue) {
    document.title = `${newValue.Name} - ${document.title}`;
  });
  self.toggleFavorite = favoriteToggle(favoritesSection);

  loadCompetitionInfo();
}

if (competitionId === null) {
  window.location.href = `competitions.html`;
} else {
  ko.applyBindings(new CompetitionViewModel());
}
