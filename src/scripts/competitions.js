function CompetitionsViewModel() {
    const self = this;

    self.page = ko.observable(1);
    self.loading = ko.observable(false);
    self.competitions = ko.observableArray([]);
    self.loadMoreCompetitions = async function () {
        if (self.loading()) return;

        self.loading(true);

        const page = self.page()

        const params = new URLSearchParams({ page, pagesize: 50 });
        const response = await fetch(`${API_URL}/Competitions?` + params);
        const data = await response.json();
        self.competitions(self.competitions().concat(data.Records));

        self.page(page + 1);
        self.loading(false);
    }

    self.loadMoreCompetitions();
}

const viewModel = new CompetitionsViewModel();

window.addEventListener("scroll", function () {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        viewModel.loadMoreGames();
    }
});

ko.applyBindings(viewModel)
