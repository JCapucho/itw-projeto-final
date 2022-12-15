function ModalitiesViewModel() {
    const self = this;

    self.page = ko.observable(1);
    self.loading = ko.observable(false);
    self.finished = ko.observable(false);
    self.modalities = ko.observableArray([]);
    self.loadMoreModalities = async function () {
        if (self.loading() || self.finished()) return;

        self.loading(true);

        const page = self.page()

        const params = new URLSearchParams({ page, pagesize: 50 });
        const response = await fetch(`${API_URL}/Modalities?` + params);
        const data = await response.json();
        self.modalities(self.modalities().concat(data.Records));

        self.page(page + 1);
        self.loading(false);
        self.finished(!data.HasNext);
    }

    self.loadMoreModalities();
}

const viewModel = new ModalitiesViewModel();

addInfiniteViewController(() => viewModel.loadMoreModalities());

ko.applyBindings(viewModel)
