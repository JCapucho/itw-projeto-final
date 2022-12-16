const competitionId = new URLSearchParams(window.location.search).get("id");

function CompetitionViewModel() {
    const self = this;

    self.competition = ko.observable(null);

    async function loadCompetitionInfo() {
        const response = await fetch(`${API_URL}/Competitions/${competitionId}`);
        const data = await response.json();
        console.log(data);
        self.competition(data);
    }

    loadCompetitionInfo();
}

if (competitionId === null) {
    window.location.href = `competitions.html`
} else {
    ko.applyBindings(new CompetitionViewModel())
}
