function searchBar(id, page, endpoint, loader, { minLength = 2 } = {}) {
  let lastSearch = "";

  async function changeDetected() {
    const term = $(id).val();

    if (lastSearch === term) return;

    loader.reset();

    if (!term) {
      loader.searching = false;
    } else {
      loader.loading(true);

      const params = new URLSearchParams({ q: term });
      const response = await fetch(`${API_URL}/${endpoint}?` + params);
      const data = await response.json();

      loader.searching = true;
      loader.searchEntries = data;

      loader.loading(false);
    }

    lastSearch = term;

    loader.loadMore();
  }

  $(id).autocomplete({
    minLength,
    source: async function (request, resolve) {
      const params = new URLSearchParams({ q: request.term });
      const response = await fetch(`${API_URL}/${endpoint}?` + params);
      const data = await response.json();
      const results = data.slice(0, 10).map((record) => ({
        label: record.Name,
        value: record.Id,
      }));
      resolve(results);
    },
    change: changeDetected,
    focus: function (event, ui) {
      event.preventDefault();
      $(this).val(ui.item.label);
    },
    select: function (event, ui) {
      event.preventDefault();
      $(this).val(ui.item.label);

      window.location.href = `${page}?id=${ui.item.value}`;
    },
    create: function (event, ui) {
      $(this).data("ui-autocomplete")._renderItem = function (ul, item) {
        const inner = $("<div>").append(item.label);
        return $("<li>").append(inner).appendTo(ul);
      };
      $(this).on("keyup", function (e) {
        if (e.key === "Enter") {
          changeDetected();
          $(this).autocomplete("close");
        }
      });
    },
  });
}
