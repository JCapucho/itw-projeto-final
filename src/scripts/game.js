const gameId = new URLSearchParams(window.location.search).get("id");

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
