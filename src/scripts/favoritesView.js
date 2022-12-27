const favoritesObj = getAllFavorites();
let favorites = Object.entries(favoritesObj)
  .map(([section, sectionData]) =>
    Object.entries(sectionData).map(([id, obj]) => {
      obj.section = section;

      if (section === "athletes")
        obj.DisplayName = formatNameSex(obj.Sex, obj.Name);
      else obj.DisplayName = obj.Name;

      if (section === "countries") obj.Photo = obj.Flag;

      obj.Page = {
        athletes: "athlete.html",
        competitions: "competition.html",
        countries: "country.html",
        modalities: "modality.html",
        games: "game.html",
      }[section];

      return obj;
    })
  )
  .flat();

function FavoritesViewModel() {
  const self = this;

  self.queuedForRemoval = ko.observableArray([]);
  self.favoritesEntries = ko.observableArray(favorites);
  self.view = makeViewSelectionController();

  self.toastClosed = function (entry) {
    self.queuedForRemoval.remove(entry);
  };
  self.undo = function (entry) {
    favorites.push(entry);
    self.favoritesEntries.push(entry);
    addFavorite(entry.section, entry.id, entry);
  };
  self.unfavorite = function (entry) {
    self.queuedForRemoval.push(entry);
    favorites = favorites.filter(
      (record) => record.Id != entry.Id || record.section != entry.section
    );
    self.favoritesEntries.remove(
      (record) => record.Id == entry.Id && record.section == entry.section
    );
    removeFavorite(entry.section, entry.Id);
  };
}

function getIconForSection(section) {
  return (
    "fa-" +
    {
      athletes: "user-o",
      competitions: "trophy",
      countries: "flag-o",
      modalities: "bicycle",
      games: "futbol-o",
    }[section]
  );
}

ko.bindingHandlers.formatSectionIcon = {
  update: function (element, valueAccessor) {
    const section = ko.unwrap(valueAccessor());

    const iconClass = getIconForSection(section);

    const icon = `<i class="fa ${iconClass}" aria-hidden="true"></i>`;

    element.innerHTML = icon + " " + section;
  },
};

ko.bindingHandlers.toast = {
  init: function (element, valueAccessor) {
    const unwrapped = ko.unwrap(valueAccessor());
    const closed = unwrapped.closed;

    const toast = new bootstrap.Toast(element);

    element.addEventListener("hidden.bs.toast", () => {
      closed();
    });

    toast.show();
  },
};

const vm = new FavoritesViewModel();

ko.applyBindings(vm);

function search(term) {
  return favorites.filter((record) =>
    record.Name.toLowerCase().includes(term.toLowerCase())
  );
}

$("#search").autocomplete({
  source: function (request, resolve) {
    const data = search(request.term);
    const results = data.slice(0, 10).map((record) => ({
      label: record.Name,
      value: record,
    }));
    resolve(results);
  },
  change: function () {
    const results = search($("#search").val());
    vm.favoritesEntries(results);
  },
  focus: function (event, ui) {
    event.preventDefault();
    $("#search").val(ui.item.label);
  },
  select: function (event, ui) {
    event.preventDefault();
    $("#search").val(ui.item.label);
    const record = ui.item.value;
    window.location.href = `${record.Page}?id=${record.Id}`;
  },
  create: function (event, ui) {
    $(this).data("ui-autocomplete")._renderItem = function (ul, item) {
      const icon = $("<i>")
        .addClass(["fa", getIconForSection(item.value.section)])
        .attr("aria-hidden", true);

      const inner = $("<div>").append(icon).append("&nbsp;").append(item.label);

      return $("<li>").append(inner).appendTo(ul);
    };
  },
});
