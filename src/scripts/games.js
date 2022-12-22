const favoritesSection = "games";

function CompetitionsViewModel() {
    const self = this;

    self.page = ko.observable(1);
    self.loading = ko.observable(false);
    self.finished = ko.observable(false);
    self.games = ko.observableArray([]);
    self.view = makeViewSelectionController();
    self.loadMoreGames = async function () {
        if (self.loading() || self.finished()) return;

        self.loading(true);

        const page = self.page()

        const params = new URLSearchParams({ page, pagesize: 50 });
        const response = await fetch(`${API_URL}/Games?` + params);
        const data = await response.json();
        const extendedRecords = data.Records.map(favoriteAdapter(favoritesSection));
        self.games(self.games().concat(extendedRecords));

        self.page(page + 1);
        self.loading(false);
        self.finished(!data.HasNext);
    }
    self.toggleFavorite = favoriteToggle(favoritesSection);

    self.loadMoreGames();
}

const viewModel = new CompetitionsViewModel();

addInfiniteViewController(() => viewModel.loadMoreGames());

ko.applyBindings(viewModel)

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
