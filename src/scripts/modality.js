const favoritesSection = "modalities";
const modalityId = new URLSearchParams(window.location.search).get("id");

function ModalityViewModel() {
  const self = this;

  self.modality = ko.observable(null);

  self.competitionsList = createCollapsibleListObject(
    () => self.modality()?.Modalities
  );

  async function loadModalityInfo() {
    const response = await fetch(`${API_URL}/Modalities/${modalityId}`);
    const data = await response.json();
    favoriteAdapter(favoritesSection)(data);
    self.modality(data);
  }

  self.modality.subscribe(function (newValue) {
    document.title = `${newValue.Name} - ${document.title}`;
  });
  self.toggleFavorite = favoriteToggle(favoritesSection);

  loadModalityInfo();
}

if (modalityId === null) {
  window.location.href = `modalities.html`;
} else {
  ko.applyBindings(new ModalityViewModel());
}
