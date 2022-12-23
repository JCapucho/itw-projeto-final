const favoritesSection = "games";

function CompetitionsViewModel() {
    const self = this;

    self.view = makeViewSelectionController();

    self.games = ko.observableArray([]);

    self.loader = createListLoader(self.games, "Games", favoritesSection);
    self.toggleFavorite = favoriteToggle(favoritesSection);
}

ko.applyBindings(new CompetitionsViewModel())

$("#search").autocomplete({
    minLength: 2,
    source: async function(request, resolve) {
        const params = new URLSearchParams({ q: request.term });
        const response = await fetch(`${API_URL}/Games/SearchByName?` + params);
        const data = await response.json();
        const results = data.slice(0, 10).map(record => ({
            label: record.Name,
            value: record.Id,
        }));
        resolve(results);
    },
    select: function(event, ui) {
        window.location.href = `game.html?id=${ui.item.value}`;
    }
});
