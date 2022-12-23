var API_URL = "http://192.168.160.58/Olympics/api"

function addInfiniteViewController(controller) {
    window.addEventListener("scroll", function() {
        const scrollTarget = window.scrollY + 1.5 * window.innerHeight;
        if(scrollTarget >= document.documentElement.scrollHeight) {
            controller()
        }
    });
}

function getRandomInt({ min = 0, max = null }) {
    let randomRes = Math.random()
    if (max !== null)
        randomRes *= (max - min)
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
       function(v) { isResolved = true; return v; }, 
       function(e) { isRejected = true; throw e; });
    result.isFulfilled = function() { return isResolved || isRejected; };
    result.isResolved = function() { return isResolved; }
    result.isRejected = function() { return isRejected; }
    return result;
}

function formatNameSex(sex, name) {
    const iconName = sex == "M" ? "mars" : "venus";
    const icon = `<i class="fa fa-${iconName}" aria-hidden="true"></i>`

    return icon + " " + name;
}

if (typeof ko === "object") {
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

            element.innerHTML = formatNameSex(sex, name);
        }
    };

    function createCollapsibleListObject(getData, limit = 5) {
        const scope = {};
        scope.open = ko.observable(false);
        scope.toggle = function() {
            scope.open(!scope.open());
        };
        scope.entries = ko.computed(function() {
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
            window.location.hash = view;
        }
        return view
    }


    function makeViewSelectionController() {
        const view = ko.observable(viewMode());
        addEventListener('hashchange', function () {
            let newView = viewMode();
            view(newView);
        });
        return view;
    }

    function createListLoader(
        target,
        endpoint,
        { extraParams = null, favoriteExtended = true } = {}
    ) {
        const scope = {};

        scope.endpoint = endpoint;
        scope.extraParams = extraParams;

        scope.page = 1;
        scope.finished = false;
        scope.loading = ko.observable(false);
        scope.totalEntries = ko.observable("??");

        scope.loadMore = async function() {
            if (scope.loading() || scope.finished) return;

            scope.loading(true);

            let paramsObj = { page: scope.page, pagesize: 50 };
            if(scope.extraParams)
                paramsObj = {...paramsObj, ...scope.extraParams}

            const params = new URLSearchParams(paramsObj);
            const response = await fetch(`${API_URL}/${scope.endpoint}?` + params);
            const data = await response.json();
            let records = data.Records;

            if (favoriteExtended)
                records = records.map(favoriteAdapter(favoritesSection));

            target(target().concat(records));

            scope.totalEntries(data.TotalRecords);
            scope.finished = !data.HasNext;
            scope.loading(false);
            scope.page++;
        }

        scope.reset = function() {
            scope.page = 1;
            scope.finished = false;
            target([]);
        }

        return scope;
    }
}
