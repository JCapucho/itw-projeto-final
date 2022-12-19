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
