function AthletesViewModel() {
    const self = this;

    self.page = ko.observable(1);
    self.loading = ko.observable(false);
    self.athletes = ko.observableArray([]);
    self.loadMoreAthletes = async function() {
        if (self.loading()) return;

        self.loading(true);

        const page = self.page()

        const params = new URLSearchParams({ page, pagesize: 50 });
        const response = await fetch(`${API_URL}/Athletes?` + params);
        const data = await response.json();
        self.athletes(self.athletes().concat(data.Records));

        self.page(page + 1);
        self.loading(false);
    }

    self.loadMoreAthletes();
}

const viewModel = new AthletesViewModel();

addInfiniteViewController(() => viewModel.loadMoreAthletes());

ko.applyBindings(viewModel)
