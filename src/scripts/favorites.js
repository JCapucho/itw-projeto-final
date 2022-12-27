const favKey = "favorites";
const memStore = JSON.parse(localStorage.getItem(favKey)) || {};

function isFavorite(section, id) {
  if (memStore[section] === undefined) return false;

  return memStore[section][id] !== undefined;
}

function addFavorite(section, id, data) {
  if (memStore[section] === undefined) memStore[section] = {};

  memStore[section][id] = data;

  localStorage.setItem(favKey, JSON.stringify(memStore));
}

function removeFavorite(section, id) {
  if (memStore[section] === undefined) return;

  delete memStore[section][id];

  localStorage.setItem(favKey, JSON.stringify(memStore));
}

function getAllFavorites() {
  return memStore;
}

if (typeof ko === "object") {
  function favoriteToggle(section) {
    return function (record) {
      const isFavorited = record.isFavorite();
      if (isFavorited) removeFavorite(section, record.Id);
      else addFavorite(section, record.Id, record);

      record.isFavorite(!isFavorited);
    };
  }

  function favoriteAdapter(section) {
    return function (record) {
      const isFavorited = isFavorite(section, record.Id);
      record.isFavorite = ko.observable(isFavorited);
      return record;
    };
  }
}
