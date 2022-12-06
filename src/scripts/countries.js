function CountriesViewModel() {
    const self = this;

    self.page = ko.observable(1);
    self.loading = ko.observable(false);
    self.countries = ko.observableArray([]);
    self.loadMoreCountries = async function () {
        if (self.loading()) return;

        self.loading(true);

        const page = self.page()

        const params = new URLSearchParams({ page, pagesize: 50 });
        const response = await fetch(`${API_URL}/Countries?` + params);
        const data = await response.json();
        self.countries(self.countries().concat(data.Records));

        self.page(page + 1);
        self.loading(false);
    }

    self.loadMoreCountries();
}

const viewModel = new CountriesViewModel();

window.addEventListener("scroll", function () {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        viewModel.loadMoreCountries();
    }
});

ko.applyBindings(viewModel)