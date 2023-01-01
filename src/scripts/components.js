function rawSearchBar(
  element,
  { fetcher, change, select, buildItem, minLength = 2 }
) {
  let lastSearch = "";

  function changeDetected(term) {
    if (lastSearch === term) return;

    change(term);

    lastSearch = term;
  }

  $(element).autocomplete({
    source: async function (request, resolve) {
      const data = await Promise.resolve(fetcher(request.term));
      const results = data.slice(0, 10).map((record) => ({
        label: record.Name,
        value: record,
      }));
      resolve(results);
    },
    change: function () {
      const term = $(this).val();

      changeDetected(term);
    },
    focus: function (event, ui) {
      event.preventDefault();
      $(this).val(ui.item.label);
    },
    select: function (event, ui) {
      event.preventDefault();
      $(this).val(ui.item.label);
      select(ui.item.value);
    },
    create: function (event, ui) {
      $(this).data("ui-autocomplete")._renderItem = function (ul, item) {
        const el = $("<div>");
        buildItem(el, item);
        return $("<li>").append(el).appendTo(ul);
      };

      $(this).on("keyup", function (e) {
        if (e.key === "Enter") {
          const term = $(this).val();
          changeDetected(term);
          $(this).autocomplete("close");
        }
      });
    },
  });
}

function defaultApiBuildItem(el, item) {
  el.append(item.label);
}

function searchBar(
  id,
  page,
  endpoint,
  loader,
  { minLength = 2, buildItem = defaultApiBuildItem } = {}
) {
  async function change(term) {
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

    loader.loadMore();
  }

  async function fetcher(term) {
    const params = new URLSearchParams({ q: term });
    const response = await fetch(`${API_URL}/${endpoint}?` + params);
    return await response.json();
  }

  function select(record) {
    window.location.href = `${page}?id=${record.Id}`;
  }

  rawSearchBar(document.querySelector(id), {
    change,
    fetcher,
    select,
    minLength,
    buildItem,
  });
}
