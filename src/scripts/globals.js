var API_URL = "http://192.168.160.58/Olympics/api";

function addInfiniteViewController(controller) {
  window.addEventListener("scroll", function () {
    const scrollTarget = window.scrollY + 1.5 * window.innerHeight;
    if (scrollTarget >= document.documentElement.scrollHeight) {
      controller();
    }
  });
}

function getRandomInt({ min = 0, max = null }) {
  let randomRes = Math.random();
  if (max !== null) randomRes *= max - min;
  return Math.floor(randomRes + min);
}

function getRandomArrayElement(array) {
  if (array.length === 0) return null;

  const idx = getRandomInt({ max: array.length });

  return array[idx];
}

function MakeQueryablePromise(promise) {
  if (promise.isResolved) return promise;

  var isResolved = false;
  var isRejected = false;

  var result = promise.then(
    function (v) {
      isResolved = true;
      return v;
    },
    function (e) {
      isRejected = true;
      throw e;
    }
  );
  result.isFulfilled = function () {
    return isResolved || isRejected;
  };
  result.isResolved = function () {
    return isResolved;
  };
  result.isRejected = function () {
    return isRejected;
  };
  return result;
}

function formatNameSex(sex, name) {
  const iconName = sex == "M" ? "mars" : "venus";
  const icon = `<i class="fa fa-${iconName}" aria-hidden="true"></i>`;

  return icon + " " + name;
}

if (typeof ko === "object") {
  ko.bindingHandlers.formatDay = {
    update: function (element, valueAccessor) {
      const dateStr = ko.unwrap(valueAccessor());
      const formatStr = new Date(dateStr).toLocaleString("pt-PT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      element.textContent = formatStr;
    },
  };

  ko.bindingHandlers.formatBestPosition = {
    update: function (element, valueAccessor) {
      const value = ko.unwrap(valueAccessor());

      if (value > 3) return;

      element.textContent = { 1: "🥇", 2: "🥈", 3: "🥉" }[value];
    },
  };

  ko.bindingHandlers.formatNameSex = {
    update: function (element, valueAccessor) {
      const unwrapped = ko.unwrap(valueAccessor());
      const sex = unwrapped.sex;
      const name = unwrapped.name;

      if (sex === null) return;

      element.innerHTML = formatNameSex(sex, name);
    },
  };

  function createCollapsibleListObject(getData, limit = 5) {
    const scope = {};
    scope.open = ko.observable(false);
    scope.toggle = function () {
      scope.open(!scope.open());
    };
    scope.entries = ko.computed(function () {
      if (scope.open()) {
        return getData();
      } else {
        return getData()?.slice(0, limit);
      }
    }, scope);
    scope.needsCollapse = ko.computed(() => getData()?.length > limit, scope);
    return scope;
  }

  function viewMode() {
    let view = window.location.hash.slice(1);
    if (view !== "grid" && view !== "list") {
      view = "grid";
      history.replaceState("", "", `#${view}`);
    }
    return view;
  }

  function makeViewSelectionController() {
    const view = ko.observable(viewMode());
    addEventListener("hashchange", function () {
      let newView = viewMode();
      view(newView);
    });
    return view;
  }

  function createListLoader(
    target,
    endpoint,
    favoritesSection,
    {
      extraParams = null,
      favoriteExtended = true,
      infinityView = true,
      pagesize = 50,
    } = {}
  ) {
    const scope = {};

    scope.searching = false;
    scope.searchEntries = [];
    scope.endpoint = endpoint;
    scope.extraParams = extraParams;

    scope.page = 1;
    scope.finished = false;
    scope.loading = ko.observable(false);
    scope.totalEntries = ko.observable("??");

    function loadMoreSearch() {
      let records = scope.searchEntries.slice(
        (scope.page - 1) * pagesize,
        scope.page * pagesize
      );

      if (favoriteExtended)
        records = records.map(favoriteAdapter(favoritesSection));

      target(target().concat(records));

      scope.totalEntries(scope.searchEntries.length);
      scope.finished = self.page * pagesize > scope.searchEntries.length;
    }

    async function loadMoreApi() {
      let paramsObj = { page: scope.page, pagesize };
      if (scope.extraParams) paramsObj = { ...paramsObj, ...scope.extraParams };

      const params = new URLSearchParams(paramsObj);
      const response = await fetch(`${API_URL}/${scope.endpoint}?` + params);
      const data = await response.json();
      let records = data.Records;

      if (favoriteExtended)
        records = records.map(favoriteAdapter(favoritesSection));

      target(target().concat(records));

      scope.totalEntries(data.TotalRecords);
      scope.finished = !data.HasNext;
    }

    scope.loadMore = async function () {
      if (scope.loading() || scope.finished) return;

      scope.loading(true);

      if (scope.searching) loadMoreSearch();
      else await loadMoreApi();

      scope.loading(false);
      scope.page++;
    };

    scope.reset = function () {
      scope.page = 1;
      scope.finished = false;
      target([]);
    };

    if (infinityView) addInfiniteViewController(() => scope.loadMore());

    scope.loadMore();

    return scope;
  }
}

function globalSearchBar() {
  function getIconForTable(table) {
    return (
      "fa-" +
      {
        Athletes: "user-o",
        Competitions: "trophy",
        Countries: "flag-o",
        Modalities: "bicycle",
        Games: "futbol-o",
      }[table]
    );
  }

  function getPageForTable(table) {
    return {
      Athletes: "athlete.html",
      Competitions: "competition.html",
      Countries: "country.html",
      Modalities: "modality.html",
      Games: "game.html",
    }[table];
  }

  $("#globalSearch").autocomplete({
    minLength: 3,
    source: async function (request, resolve) {
      const params = new URLSearchParams({ q: request.term });
      const response = await fetch(`${API_URL}/Utils/Search?` + params);
      const data = await response.json();
      const results = data.slice(0, 10).map((record) => ({
        label: record.Name,
        value: record,
      }));
      resolve(results);
    },
    position: { collision: "flip" },
    focus: function (event, ui) {
      event.preventDefault();
      $(this).val(ui.item.label);
    },
    select: function (event, ui) {
      event.preventDefault();
      $(this).val(ui.item.label);
      const record = ui.item.value;
      window.location.href = `${getPageForTable(record.TableName)}?id=${
        record.Id
      }`;
    },
    create: function (event, ui) {
      $(this).data("ui-autocomplete")._renderItem = function (ul, item) {
        const icon = $("<i>")
          .addClass(["fa", getIconForTable(item.value.TableName)])
          .attr("aria-hidden", true);

        const inner = $("<div>")
          .append(icon)
          .append("&nbsp;")
          .append(item.label);

        return $("<li>").append(inner).appendTo(ul);
      };
    },
  });
}

globalSearchBar();

// Bootstrap dark mode code
(() => {
  "use strict";

  const storedTheme = localStorage.getItem("theme");

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = function (theme) {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme) => {
    const activeThemeIcon = document.getElementById("activeThemeIcon");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
    });

    btnToActive.classList.add("active");

    activeThemeIcon.classList.remove("fa-sun-o", "fa-moon-o", "fa-adjust");

    const className = {
      light: "fa-sun-o",
      dark: "fa-moon-o",
      auto: "fa-adjust",
    }[theme];
    activeThemeIcon.classList.add(className);
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (storedTheme !== "light" || storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        localStorage.setItem("theme", theme);
        setTheme(theme);
        showActiveTheme(theme);
      });
    });
  });
})();
