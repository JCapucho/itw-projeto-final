function CompetitionsViewModel() {
    const self = this;

    self.page = ko.observable(1);
    self.loading = ko.observable(false);
    self.finished = ko.observable(false);
    self.games = ko.observableArray([]);
    self.loadMoreGames = async function () {
        if (self.loading() || self.finished()) return;

        self.loading(true);

        const page = self.page()

        const params = new URLSearchParams({ page, pagesize: 50 });
        const response = await fetch(`${API_URL}/Games?` + params);
        const data = await response.json();
        self.games(self.games().concat(data.Records));

        self.page(page + 1);
        self.loading(false);
        self.finished(!data.HasNext);
    }

    self.loadMoreGames();
}

const viewModel = new CompetitionsViewModel();

addInfiniteViewController(() => viewModel.loadMoreGames());

ko.applyBindings(viewModel)
