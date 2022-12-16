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
}
