const athleteId = new URLSearchParams(window.location.search).get("id");

function AthleteViewModel() {
    const self = this;

    self.athlete = ko.observable(null);
    self.sexIcon = ko.computed(function() {
        const sex = this.athlete()?.Sex;

        if (sex === null) return null;

        const iconName = sex == "M" ? "mars" : "venus";
        const icon = `<i class="fa fa-${iconName}" aria-hidden="true"></i>`
        const sexName = sex == "M" ? "Masculino" : "Feminino"

        return sexName + " " + icon;
    }, this);

    async function loadAthleteInfo() {
        const response = await fetch(`${API_URL}/Athletes/${athleteId}`);
        const data = await response.json();
        self.athlete(data);
    }

    loadAthleteInfo();
}

ko.bindingHandlers.formatDay = {
    update: function(element, valueAccessor) {
        const dateStr = ko.unwrap(valueAccessor());
        const formatStr = new Date(dateStr).toLocaleString("pt-PT", { 
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        element.textContent = formatStr;
    }
};

if (athleteId === null) {
    window.location.href = `athletes.html`
} else {
    ko.applyBindings(new AthleteViewModel())
}
