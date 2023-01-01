const favoritesSection = "games";

function CompetitionsViewModel() {
  const self = this;

  self.view = makeViewSelectionController();

  self.games = ko.observableArray([]);

  self.season = ko.observable("0");

  self.loader = createListLoader(self.games, "Games", favoritesSection);
  self.toggleFavorite = favoriteToggle(favoritesSection);

  self.season.subscribe(function(value) {
    const season = event.target.value;
    viewModel.loader.reset();

    if (season !== "0")
      viewModel.loader.extraParams = { season };
    else
      viewModel.loader.extraParams = null;

    viewModel.loader.loadMore();
  });
}

const viewModel = new CompetitionsViewModel();

ko.applyBindings(viewModel);

searchBar("#search", "game.html", "Games/SearchByName", viewModel.loader);
