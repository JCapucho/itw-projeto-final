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

ko.bindingHandlers.formatBestPosition = {
    update: function(element, valueAccessor) {
        const value = ko.unwrap(valueAccessor());

        if (value > 3) return;

        element.textContent = { 1: "🥇", 2: "🥈", 3: "🥉" }[value];
    }
};

ko.bindingHandlers.formatNameSex = {
    update: function(element, valueAccessor) {
        const unwrapped = ko.unwrap(valueAccessor());
        const sex = unwrapped.sex;
        const name = unwrapped.name;

        if (sex === null) return;

        const iconName = sex == "M" ? "mars" : "venus";
        const icon = `<i class="fa fa-${iconName}" aria-hidden="true"></i>`

        element.innerHTML = icon + " " + name;
    }
};

ko.applyBindings(viewModel)
