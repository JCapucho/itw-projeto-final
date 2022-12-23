const favoritesSection = "modalities";

function ModalitiesViewModel() {
    const self = this;

    self.view = makeViewSelectionController();

    self.modalities = ko.observableArray([]);

    self.loader = createListLoader(self.modalities, "Modalities", favoritesSection);
    self.toggleFavorite = favoriteToggle(favoritesSection);
}

ko.applyBindings(new ModalitiesViewModel())

$("#search").autocomplete({
    minLength: 2,
    source: async function(request, resolve) {
        const params = new URLSearchParams({ q: request.term });
        const response = await fetch(`${API_URL}/Modalities/SearchByName?` + params);
        const data = await response.json();
        const results = data.slice(0, 10).map(record => ({
            label: record.Name,
            value: record.Id,
        }));
        resolve(results);
    },
    select: function(event, ui) {
        window.location.href = `modality.html?id=${ui.item.value}`;
    }
});
