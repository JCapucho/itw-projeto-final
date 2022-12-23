const favoritesSection = "countries";

function CountriesViewModel() {
    const self = this;

    self.view = makeViewSelectionController();

    self.countries = ko.observableArray([]);

    self.loader = createListLoader(self.countries, "Countries", favoritesSection);
    self.toggleFavorite = favoriteToggle(favoritesSection);
}

const viewModel = new CountriesViewModel();

ko.applyBindings(viewModel);

searchBar("#search", "country.html", "Countries/SearchByName", viewModel.loader);
