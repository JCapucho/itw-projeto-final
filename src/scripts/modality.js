const modalityId = new URLSearchParams(window.location.search).get("id");

function ModalityViewModel() {
    const self = this;

    self.modality = ko.observable(null);

    self.competitionsList = createCollapsibleListObject(() => self.modality()?.Modalities);

    async function loadModalityInfo() {
        const response = await fetch(`${API_URL}/Modalities/${modalityId}`);
        const data = await response.json();
        console.log(data);
        self.modality(data);
    }

    loadModalityInfo();
}

if (modalityId === null) {
    window.location.href = `modalities.html`
} else {
    ko.applyBindings(new ModalityViewModel())
}
