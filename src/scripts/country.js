const countryId = new URLSearchParams(window.location.search).get("id");

function CountryViewModel() {
    const self = this;

    self.country = ko.observable(null);

    async function loadCountryInfo() {
        const response = await fetch(`${API_URL}/Countries/${countryId}`);
        const data = await response.json();
        console.log(data);
        self.country(data);
    }

    loadCountryInfo();
}

if (countryId === null) {
    window.location.href = `countries.html`
} else {
    ko.applyBindings(new CountryViewModel())
}
