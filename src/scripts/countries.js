function CountriesViewModel() {
    const self = this;

    self.page = ko.observable(1);
    self.loading = ko.observable(false);
    self.finished = ko.observable(false);
    self.countries = ko.observableArray([]);
    self.loadMoreCountries = async function () {
        if (self.loading() || self.finished()) return;

        self.loading(true);

        const page = self.page()

        const params = new URLSearchParams({ page, pagesize: 50 });
        const response = await fetch(`${API_URL}/Countries?` + params);
        const data = await response.json();
        self.countries(self.countries().concat(data.Records));

        self.page(page + 1);
        self.loading(false);
        self.finished(!data.HasNext);
    }

    self.loadMoreCountries();
}

const viewModel = new CountriesViewModel();

addInfiniteViewController(() => viewModel.loadMoreCountries());

ko.applyBindings(viewModel)
