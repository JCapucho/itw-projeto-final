const athleteId = new URLSearchParams(window.location.search).get("id");

function AthleteViewModel() {
    const self = this;

    self.athlete = ko.observable(null);

    self.gamesList = createCollapsibleListObject(() => self.athlete()?.Games);
    self.modalitiesList = createCollapsibleListObject(() => self.athlete()?.Modalities);
    self.competitionsList = createCollapsibleListObject(() => self.athlete()?.Competitions);

    self.sexIcon = ko.computed(function() {
        const sex = this.athlete()?.Sex;

        if (sex === null) return null;

        const iconName = sex == "M" ? "mars" : "venus";
        const icon = `<i class="fa fa-${iconName}" aria-hidden="true"></i>`
        const sexName = sex == "M" ? "Masculino" : "Feminino"

        return sexName + " " + icon;
    }, this);

    async function loadAthleteInfo() {
        const response = await fetch(`${API_URL}/Athletes/FullDetails?id=${athleteId}`);
        const data = await response.json();
        console.log(data);
        self.athlete(data);
    }

    loadAthleteInfo();
}

if (athleteId === null) {
    window.location.href = `athletes.html`
} else {
    ko.applyBindings(new AthleteViewModel())
}
