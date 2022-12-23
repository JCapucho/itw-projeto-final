const favoritesSection = "countries";

function CountriesViewModel() {
    const self = this;

    self.view = makeViewSelectionController();

    self.countries = ko.observableArray([]);

    self.loader = createListLoader(self.countries, "Countries", favoritesSection);
    self.toggleFavorite = favoriteToggle(favoritesSection);
}

ko.applyBindings(new CountriesViewModel())

$("#search").autocomplete({
    minLength: 2,
    source: async function(request, resolve) {
        const params = new URLSearchParams({ q: request.term });
        const response = await fetch(`${API_URL}/Countries/SearchByName?` + params);
        const data = await response.json();
        const results = data.slice(0, 10).map(record => ({
            label: record.Name,
            value: record.Id,
        }));
        resolve(results);
    },
    select: function(event, ui) {
        window.location.href = `country.html?id=${ui.item.value}`;
    }
});
