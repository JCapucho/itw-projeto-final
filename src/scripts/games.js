const favoritesSection = "games";

function CompetitionsViewModel() {
    const self = this;

    self.view = makeViewSelectionController();

    self.games = ko.observableArray([]);

    self.loader = createListLoader(self.games, "Games", favoritesSection);
    self.toggleFavorite = favoriteToggle(favoritesSection);
}

const viewModel = new CompetitionsViewModel();

ko.applyBindings(viewModel);

searchBar("#search", "game.html", "Games/SearchByName", viewModel.loader);
