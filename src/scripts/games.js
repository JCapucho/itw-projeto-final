function GamesViewModel() {
    const self = this;

    self.page = ko.observable(1);
    self.loading = ko.observable(false);
    self.games = ko.observableArray([]);
    self.loadMoreGames = async function () {
        if (self.loading()) return;

        self.loading(true);

        const page = self.page()

        const params = new URLSearchParams({ page, pagesize: 50 });
        const response = await fetch(`${API_URL}/Games?` + params);
        const data = await response.json();
        self.games(self.games().concat(data.Records));

        self.page(page + 1);
        self.loading(false);
    }

    self.loadMoreGames();
}

const viewModel = new GamesViewModel();

window.addEventListener("scroll", function () {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        viewModel.loadMoreGames();
    }
});

ko.applyBindings(viewModel)
