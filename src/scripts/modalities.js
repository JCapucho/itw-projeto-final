const favoritesSection = "modalities";

function ModalitiesViewModel() {
    const self = this;

    self.view = makeViewSelectionController();

    self.modalities = ko.observableArray([]);

    self.loader = createListLoader(self.modalities, "Modalities", favoritesSection);
    self.toggleFavorite = favoriteToggle(favoritesSection);
}

const viewModel = new ModalitiesViewModel();

ko.applyBindings(viewModel);

searchBar("#search", "modality.html", "Modalities/SearchByName", viewModel.loader);
