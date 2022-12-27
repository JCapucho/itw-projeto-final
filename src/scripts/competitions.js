const favoritesSection = "competitions";

function CompetitionsViewModel() {
  const self = this;

  self.view = makeViewSelectionController();

  self.competitions = ko.observableArray([]);

  self.loader = createListLoader(
    self.competitions,
    "Competitions",
    favoritesSection
  );
  self.toggleFavorite = favoriteToggle(favoritesSection);
}

const viewModel = new CompetitionsViewModel();

ko.applyBindings(viewModel);

searchBar(
  "#search",
  "competition.html",
  "Competitions/SearchByName",
  viewModel.loader
);
