const favoritesSection = "athletes";

const ioc_flag = [
  { ioc: "AFG", name: "Afghanistan", flag: "\ud83c\udde6\ud83c\uddeb" },
  { ioc: "ALB", name: "Albania", flag: "\ud83c\udde6\ud83c\uddf1" },
  { ioc: "ALG", name: "Algeria", flag: "\ud83c\udde9\ud83c\uddff" },
  { ioc: "ASA", name: "American Samoa", flag: "\ud83c\udde6\ud83c\uddf8" },
  { ioc: "AND", name: "Andorra", flag: "\ud83c\udde6\ud83c\udde9" },
  { ioc: "ANG", name: "Angola", flag: "\ud83c\udde6\ud83c\uddf4" },
  { ioc: "ANT", name: "Antigua And Barbuda", flag: "\ud83c\udde6\ud83c\uddec" },
  { ioc: "ARG", name: "Argentina", flag: "\ud83c\udde6\ud83c\uddf7" },
  { ioc: "ARM", name: "Armenia", flag: "\ud83c\udde6\ud83c\uddf2" },
  { ioc: "ARU", name: "Aruba", flag: "\ud83c\udde6\ud83c\uddfc" },
  { ioc: "SHP", name: "Ascension Island", flag: "\ud83c\uddf8\ud83c\udded" },
  { ioc: "AUS", name: "Australia", flag: "\ud83c\udde6\ud83c\uddfa" },
  { ioc: "AUT", name: "Austria", flag: "\ud83c\udde6\ud83c\uddf9" },
  { ioc: "AZE", name: "Azerbaijan", flag: "\ud83c\udde6\ud83c\uddff" },
  { ioc: "BAH", name: "Bahamas", flag: "\ud83c\udde7\ud83c\uddf8" },
  { ioc: "BRN", name: "Bahrain", flag: "\ud83c\udde7\ud83c\udded" },
  { ioc: "BAN", name: "Bangladesh", flag: "\ud83c\udde7\ud83c\udde9" },
  { ioc: "BAR", name: "Barbados", flag: "\ud83c\udde7\ud83c\udde7" },
  { ioc: "BLR", name: "Belarus", flag: "\ud83c\udde7\ud83c\uddfe" },
  { ioc: "BEL", name: "Belgium", flag: "\ud83c\udde7\ud83c\uddea" },
  { ioc: "BIZ", name: "Belize", flag: "\ud83c\udde7\ud83c\uddff" },
  { ioc: "BEN", name: "Benin", flag: "\ud83c\udde7\ud83c\uddef" },
  { ioc: "BER", name: "Bermuda", flag: "\ud83c\udde7\ud83c\uddf2" },
  { ioc: "BHU", name: "Bhutan", flag: "\ud83c\udde7\ud83c\uddf9" },
  { ioc: "BOL", name: "Bolivia", flag: "\ud83c\udde7\ud83c\uddf4" },
  {
    ioc: "BIH",
    name: "Bosnia and Herzegovina",
    flag: "\ud83c\udde7\ud83c\udde6",
  },
  { ioc: "BOT", name: "Botswana", flag: "\ud83c\udde7\ud83c\uddfc" },
  { ioc: "BRA", name: "Brazil", flag: "\ud83c\udde7\ud83c\uddf7" },
  { ioc: "BRU", name: "Brunei Darussalam", flag: "\ud83c\udde7\ud83c\uddf3" },
  { ioc: "BUL", name: "Bulgaria", flag: "\ud83c\udde7\ud83c\uddec" },
  { ioc: "BUR", name: "Burkina Faso", flag: "\ud83c\udde7\ud83c\uddeb" },
  { ioc: "BDI", name: "Burundi", flag: "\ud83c\udde7\ud83c\uddee" },
  { ioc: "CPV", name: "Cabo Verde", flag: "\ud83c\udde8\ud83c\uddfb" },
  { ioc: "CAM", name: "Cambodia", flag: "\ud83c\uddf0\ud83c\udded" },
  { ioc: "CMR", name: "Cameroon", flag: "\ud83c\udde8\ud83c\uddf2" },
  { ioc: "CAN", name: "Canada", flag: "\ud83c\udde8\ud83c\udde6" },
  { ioc: "CAY", name: "Cayman Islands", flag: "\ud83c\uddf0\ud83c\uddfe" },
  {
    ioc: "CAF",
    name: "Central African Republic",
    flag: "\ud83c\udde8\ud83c\uddeb",
  },
  { ioc: "CHA", name: "Chad", flag: "\ud83c\uddf9\ud83c\udde9" },
  { ioc: "CHI", name: "Chile", flag: "\ud83c\udde8\ud83c\uddf1" },
  { ioc: "CHN", name: "China", flag: "\ud83c\udde8\ud83c\uddf3" },
  { ioc: "COL", name: "Colombia", flag: "\ud83c\udde8\ud83c\uddf4" },
  { ioc: "COM", name: "Comoros", flag: "\ud83c\uddf0\ud83c\uddf2" },
  { ioc: "COK", name: "Cook Islands", flag: "\ud83c\udde8\ud83c\uddf0" },
  { ioc: "CRC", name: "Costa Rica", flag: "\ud83c\udde8\ud83c\uddf7" },
  { ioc: "CIV", name: "C\u00f4te d'Ivoire", flag: "\ud83c\udde8\ud83c\uddee" },
  { ioc: "CRO", name: "Croatia", flag: "\ud83c\udded\ud83c\uddf7" },
  { ioc: "CUB", name: "Cuba", flag: "\ud83c\udde8\ud83c\uddfa" },
  { ioc: "CYP", name: "Cyprus", flag: "\ud83c\udde8\ud83c\uddfe" },
  { ioc: "CZE", name: "Czech Republic", flag: "\ud83c\udde8\ud83c\uddff" },
  {
    ioc: "COD",
    name: "Democratic Republic Of Congo",
    flag: "\ud83c\udde8\ud83c\udde9",
  },
  { ioc: "DEN", name: "Denmark", flag: "\ud83c\udde9\ud83c\uddf0" },
  { ioc: "DJI", name: "Djibouti", flag: "\ud83c\udde9\ud83c\uddef" },
  { ioc: "DMA", name: "Dominica", flag: "\ud83c\udde9\ud83c\uddf2" },
  { ioc: "DOM", name: "Dominican Republic", flag: "\ud83c\udde9\ud83c\uddf4" },
  { ioc: "ECU", name: "Ecuador", flag: "\ud83c\uddea\ud83c\udde8" },
  { ioc: "EGY", name: "Egypt", flag: "\ud83c\uddea\ud83c\uddec" },
  { ioc: "ESA", name: "El Salvador", flag: "\ud83c\uddf8\ud83c\uddfb" },
  { ioc: "GEQ", name: "Equatorial Guinea", flag: "\ud83c\uddec\ud83c\uddf6" },
  { ioc: "ERI", name: "Eritrea", flag: "\ud83c\uddea\ud83c\uddf7" },
  { ioc: "EST", name: "Estonia", flag: "\ud83c\uddea\ud83c\uddea" },
  { ioc: "ETH", name: "Ethiopia", flag: "\ud83c\uddea\ud83c\uddf9" },
  { ioc: "FAI", name: "Faroe Islands", flag: "\ud83c\uddeb\ud83c\uddf4" },
  { ioc: "FIJ", name: "Fiji", flag: "\ud83c\uddeb\ud83c\uddef" },
  { ioc: "FIN", name: "Finland", flag: "\ud83c\uddeb\ud83c\uddee" },
  { ioc: "FRA", name: "France", flag: "\ud83c\uddeb\ud83c\uddf7" },
  { ioc: "GAB", name: "Gabon", flag: "\ud83c\uddec\ud83c\udde6" },
  { ioc: "GAM", name: "Gambia", flag: "\ud83c\uddec\ud83c\uddf2" },
  { ioc: "GEO", name: "Georgia", flag: "\ud83c\uddec\ud83c\uddea" },
  { ioc: "GER", name: "Germany", flag: "\ud83c\udde9\ud83c\uddea" },
  { ioc: "GHA", name: "Ghana", flag: "\ud83c\uddec\ud83c\udded" },
  { ioc: "GRE", name: "Greece", flag: "\ud83c\uddec\ud83c\uddf7" },
  { ioc: "GRN", name: "Grenada", flag: "\ud83c\uddec\ud83c\udde9" },
  { ioc: "GUM", name: "Guam", flag: "\ud83c\uddec\ud83c\uddfa" },
  { ioc: "GUA", name: "Guatemala", flag: "\ud83c\uddec\ud83c\uddf9" },
  { ioc: "GCI", name: "Guernsey", flag: "\ud83c\uddec\ud83c\uddec" },
  { ioc: "GUI", name: "Guinea", flag: "\ud83c\uddec\ud83c\uddf3" },
  { ioc: "GBS", name: "Guinea-bissau", flag: "\ud83c\uddec\ud83c\uddfc" },
  { ioc: "GUY", name: "Guyana", flag: "\ud83c\uddec\ud83c\uddfe" },
  { ioc: "HAI", name: "Haiti", flag: "\ud83c\udded\ud83c\uddf9" },
  { ioc: "HON", name: "Honduras", flag: "\ud83c\udded\ud83c\uddf3" },
  { ioc: "HKG", name: "Hong Kong", flag: "\ud83c\udded\ud83c\uddf0" },
  { ioc: "HUN", name: "Hungary", flag: "\ud83c\udded\ud83c\uddfa" },
  { ioc: "ISL", name: "Iceland", flag: "\ud83c\uddee\ud83c\uddf8" },
  { ioc: "IND", name: "India", flag: "\ud83c\uddee\ud83c\uddf3" },
  { ioc: "INA", name: "Indonesia", flag: "\ud83c\uddee\ud83c\udde9" },
  { ioc: "IRI", name: "Iran", flag: "\ud83c\uddee\ud83c\uddf7" },
  { ioc: "IRQ", name: "Iraq", flag: "\ud83c\uddee\ud83c\uddf6" },
  { ioc: "IRL", name: "Ireland", flag: "\ud83c\uddee\ud83c\uddea" },
  { ioc: "ISR", name: "Israel", flag: "\ud83c\uddee\ud83c\uddf1" },
  { ioc: "ITA", name: "Italy", flag: "\ud83c\uddee\ud83c\uddf9" },
  { ioc: "JAM", name: "Jamaica", flag: "\ud83c\uddef\ud83c\uddf2" },
  { ioc: "JPN", name: "Japan", flag: "\ud83c\uddef\ud83c\uddf5" },
  { ioc: "JCI", name: "Jersey", flag: "\ud83c\uddef\ud83c\uddea" },
  { ioc: "JOR", name: "Jordan", flag: "\ud83c\uddef\ud83c\uddf4" },
  { ioc: "KAZ", name: "Kazakhstan", flag: "\ud83c\uddf0\ud83c\uddff" },
  { ioc: "KEN", name: "Kenya", flag: "\ud83c\uddf0\ud83c\uddea" },
  { ioc: "KIR", name: "Kiribati", flag: "\ud83c\uddf0\ud83c\uddee" },
  { ioc: "PRK", name: "North Korea", flag: "\ud83c\uddf0\ud83c\uddf5" },
  { ioc: "KOR", name: "South Korea", flag: "\ud83c\uddf0\ud83c\uddf7" },
  { ioc: "KUW", name: "Kuwait", flag: "\ud83c\uddf0\ud83c\uddfc" },
  { ioc: "KGZ", name: "Kyrgyzstan", flag: "\ud83c\uddf0\ud83c\uddec" },
  {
    ioc: "LAO",
    name: "Lao People's Democratic Republic",
    flag: "\ud83c\uddf1\ud83c\udde6",
  },
  { ioc: "LAT", name: "Latvia", flag: "\ud83c\uddf1\ud83c\uddfb" },
  { ioc: "LIB", name: "Lebanon", flag: "\ud83c\uddf1\ud83c\udde7" },
  { ioc: "LES", name: "Lesotho", flag: "\ud83c\uddf1\ud83c\uddf8" },
  { ioc: "LBR", name: "Liberia", flag: "\ud83c\uddf1\ud83c\uddf7" },
  { ioc: "LBA", name: "Libya", flag: "\ud83c\uddf1\ud83c\uddfe" },
  { ioc: "LIE", name: "Liechtenstein", flag: "\ud83c\uddf1\ud83c\uddee" },
  { ioc: "LTU", name: "Lithuania", flag: "\ud83c\uddf1\ud83c\uddf9" },
  { ioc: "LUX", name: "Luxembourg", flag: "\ud83c\uddf1\ud83c\uddfa" },
  { ioc: "MAC", name: "Macao", flag: "\ud83c\uddf2\ud83c\uddf4" },
  { ioc: "MKD", name: "Macedonia", flag: "\ud83c\uddf2\ud83c\uddf0" },
  { ioc: "MAD", name: "Madagascar", flag: "\ud83c\uddf2\ud83c\uddec" },
  { ioc: "MAW", name: "Malawi", flag: "\ud83c\uddf2\ud83c\uddfc" },
  { ioc: "MAS", name: "Malaysia", flag: "\ud83c\uddf2\ud83c\uddfe" },
  { ioc: "MDV", name: "Maldives", flag: "\ud83c\uddf2\ud83c\uddfb" },
  { ioc: "MLI", name: "Mali", flag: "\ud83c\uddf2\ud83c\uddf1" },
  { ioc: "MLT", name: "Malta", flag: "\ud83c\uddf2\ud83c\uddf9" },
  { ioc: "MHL", name: "Marshall Islands", flag: "\ud83c\uddf2\ud83c\udded" },
  { ioc: "MTN", name: "Mauritania", flag: "\ud83c\uddf2\ud83c\uddf7" },
  { ioc: "MRI", name: "Mauritius", flag: "\ud83c\uddf2\ud83c\uddfa" },
  { ioc: "MEX", name: "Mexico", flag: "\ud83c\uddf2\ud83c\uddfd" },
  { ioc: "MDA", name: "Moldova", flag: "\ud83c\uddf2\ud83c\udde9" },
  { ioc: "MON", name: "Monaco", flag: "\ud83c\uddf2\ud83c\udde8" },
  { ioc: "MGL", name: "Mongolia", flag: "\ud83c\uddf2\ud83c\uddf3" },
  { ioc: "MNE", name: "Montenegro", flag: "\ud83c\uddf2\ud83c\uddea" },
  { ioc: "MAR", name: "Morocco", flag: "\ud83c\uddf2\ud83c\udde6" },
  { ioc: "MOZ", name: "Mozambique", flag: "\ud83c\uddf2\ud83c\uddff" },
  { ioc: "MYA", name: "Myanmar", flag: "\ud83c\uddf2\ud83c\uddf2" },
  { ioc: "NAM", name: "Namibia", flag: "\ud83c\uddf3\ud83c\udde6" },
  { ioc: "NRU", name: "Nauru", flag: "\ud83c\uddf3\ud83c\uddf7" },
  { ioc: "NEP", name: "Nepal", flag: "\ud83c\uddf3\ud83c\uddf5" },
  { ioc: "NED", name: "Netherlands", flag: "\ud83c\uddf3\ud83c\uddf1" },
  { ioc: "NZL", name: "New Zealand", flag: "\ud83c\uddf3\ud83c\uddff" },
  { ioc: "NCA", name: "Nicaragua", flag: "\ud83c\uddf3\ud83c\uddee" },
  { ioc: "NIG", name: "Niger", flag: "\ud83c\uddf3\ud83c\uddea" },
  { ioc: "NGR", name: "Nigeria", flag: "\ud83c\uddf3\ud83c\uddec" },
  { ioc: "NOR", name: "Norway", flag: "\ud83c\uddf3\ud83c\uddf4" },
  { ioc: "OMA", name: "Oman", flag: "\ud83c\uddf4\ud83c\uddf2" },
  { ioc: "PAK", name: "Pakistan", flag: "\ud83c\uddf5\ud83c\uddf0" },
  { ioc: "PLW", name: "Palau", flag: "\ud83c\uddf5\ud83c\uddfc" },
  {
    ioc: "PLE",
    name: "Palestinian Territory",
    flag: "\ud83c\uddf5\ud83c\uddf8",
  },
  { ioc: "PAN", name: "Panama", flag: "\ud83c\uddf5\ud83c\udde6" },
  { ioc: "PNG", name: "Papua New Guinea", flag: "\ud83c\uddf5\ud83c\uddec" },
  { ioc: "PAR", name: "Paraguay", flag: "\ud83c\uddf5\ud83c\uddfe" },
  { ioc: "PER", name: "Peru", flag: "\ud83c\uddf5\ud83c\uddea" },
  { ioc: "PHI", name: "Philippines", flag: "\ud83c\uddf5\ud83c\udded" },
  { ioc: "POL", name: "Poland", flag: "\ud83c\uddf5\ud83c\uddf1" },
  { ioc: "POR", name: "Portugal", flag: "\ud83c\uddf5\ud83c\uddf9" },
  { ioc: "PUR", name: "Puerto Rico", flag: "\ud83c\uddf5\ud83c\uddf7" },
  { ioc: "QAT", name: "Qatar", flag: "\ud83c\uddf6\ud83c\udde6" },
  { ioc: "CGO", name: "Republic Of Congo", flag: "\ud83c\udde8\ud83c\uddec" },
  { ioc: "ROU", name: "Romania", flag: "\ud83c\uddf7\ud83c\uddf4" },
  { ioc: "RUS", name: "Russian Federation", flag: "\ud83c\uddf7\ud83c\uddfa" },
  { ioc: "RWA", name: "Rwanda", flag: "\ud83c\uddf7\ud83c\uddfc" },
  {
    ioc: "SKN",
    name: "Saint Kitts And Nevis",
    flag: "\ud83c\uddf0\ud83c\uddf3",
  },
  { ioc: "LCA", name: "Saint Lucia", flag: "\ud83c\uddf1\ud83c\udde8" },
  {
    ioc: "VIN",
    name: "Saint Vincent And The Grenadines",
    flag: "\ud83c\uddfb\ud83c\udde8",
  },
  { ioc: "SAM", name: "Samoa", flag: "\ud83c\uddfc\ud83c\uddf8" },
  { ioc: "SMR", name: "San Marino", flag: "\ud83c\uddf8\ud83c\uddf2" },
  { ioc: "KSA", name: "Saudi Arabia", flag: "\ud83c\uddf8\ud83c\udde6" },
  { ioc: "SEN", name: "Senegal", flag: "\ud83c\uddf8\ud83c\uddf3" },
  { ioc: "SRB", name: "Serbia", flag: "\ud83c\uddf7\ud83c\uddf8" },
  { ioc: "SEY", name: "Seychelles", flag: "\ud83c\uddf8\ud83c\udde8" },
  { ioc: "SLE", name: "Sierra Leone", flag: "\ud83c\uddf8\ud83c\uddf1" },
  { ioc: "SIN", name: "Singapore", flag: "\ud83c\uddf8\ud83c\uddec" },
  { ioc: "SVK", name: "Slovakia", flag: "\ud83c\uddf8\ud83c\uddf0" },
  { ioc: "SLO", name: "Slovenia", flag: "\ud83c\uddf8\ud83c\uddee" },
  { ioc: "SOL", name: "Solomon Islands", flag: "\ud83c\uddf8\ud83c\udde7" },
  { ioc: "SOM", name: "Somalia", flag: "\ud83c\uddf8\ud83c\uddf4" },
  { ioc: "RSA", name: "South Africa", flag: "\ud83c\uddff\ud83c\udde6" },
  { ioc: "ESP", name: "Spain", flag: "\ud83c\uddea\ud83c\uddf8" },
  { ioc: "SRI", name: "Sri Lanka", flag: "\ud83c\uddf1\ud83c\uddf0" },
  { ioc: "SUD", name: "Sudan", flag: "\ud83c\uddf8\ud83c\udde9" },
  { ioc: "SUR", name: "Suriname", flag: "\ud83c\uddf8\ud83c\uddf7" },
  { ioc: "SWZ", name: "Swaziland", flag: "\ud83c\uddf8\ud83c\uddff" },
  { ioc: "SWE", name: "Sweden", flag: "\ud83c\uddf8\ud83c\uddea" },
  { ioc: "SUI", name: "Switzerland", flag: "\ud83c\udde8\ud83c\udded" },
  {
    ioc: "SYR",
    name: "Syrian Arab Republic",
    flag: "\ud83c\uddf8\ud83c\uddfe",
  },
  {
    ioc: "STP",
    name: "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
    flag: "\ud83c\uddf8\ud83c\uddf9",
  },
  { ioc: "TPE", name: "Taiwan", flag: "\ud83c\uddf9\ud83c\uddfc" },
  { ioc: "TJK", name: "Tajikistan", flag: "\ud83c\uddf9\ud83c\uddef" },
  { ioc: "TAN", name: "Tanzania", flag: "\ud83c\uddf9\ud83c\uddff" },
  { ioc: "THA", name: "Thailand", flag: "\ud83c\uddf9\ud83c\udded" },
  { ioc: "TLS", name: "Timor-Leste", flag: "\ud83c\uddf9\ud83c\uddf1" },
  { ioc: "TOG", name: "Togo", flag: "\ud83c\uddf9\ud83c\uddec" },
  { ioc: "TGA", name: "Tonga", flag: "\ud83c\uddf9\ud83c\uddf4" },
  { ioc: "TRI", name: "Trinidad And Tobago", flag: "\ud83c\uddf9\ud83c\uddf9" },
  { ioc: "TUN", name: "Tunisia", flag: "\ud83c\uddf9\ud83c\uddf3" },
  { ioc: "TUR", name: "Turkey", flag: "\ud83c\uddf9\ud83c\uddf7" },
  { ioc: "TKM", name: "Turkmenistan", flag: "\ud83c\uddf9\ud83c\uddf2" },
  { ioc: "TUV", name: "Tuvalu", flag: "\ud83c\uddf9\ud83c\uddfb" },
  { ioc: "UGA", name: "Uganda", flag: "\ud83c\uddfa\ud83c\uddec" },
  { ioc: "UKR", name: "Ukraine", flag: "\ud83c\uddfa\ud83c\udde6" },
  {
    ioc: "UAE",
    name: "United Arab Emirates",
    flag: "\ud83c\udde6\ud83c\uddea",
  },
  { ioc: "GBR", name: "United Kingdom", flag: "\ud83c\uddec\ud83c\udde7" },
  { ioc: "USA", name: "United States", flag: "\ud83c\uddfa\ud83c\uddf8" },
  { ioc: "URU", name: "Uruguay", flag: "\ud83c\uddfa\ud83c\uddfe" },
  { ioc: "UZB", name: "Uzbekistan", flag: "\ud83c\uddfa\ud83c\uddff" },
  { ioc: "VAN", name: "Vanuatu", flag: "\ud83c\uddfb\ud83c\uddfa" },
  { ioc: "VEN", name: "Venezuela", flag: "\ud83c\uddfb\ud83c\uddea" },
  { ioc: "VIE", name: "Viet Nam", flag: "\ud83c\uddfb\ud83c\uddf3" },
  { ioc: "ISV", name: "Virgin Islands (US)", flag: "\ud83c\uddfb\ud83c\uddee" },
  { ioc: "YEM", name: "Yemen", flag: "\ud83c\uddfe\ud83c\uddea" },
  { ioc: "ZAM", name: "Zambia", flag: "\ud83c\uddff\ud83c\uddf2" },
  { ioc: "ZIM", name: "Zimbabwe", flag: "\ud83c\uddff\ud83c\uddfc" },
];

function AthletesViewModel() {
  const self = this;

  self.view = makeViewSelectionController();

  self.athletes = ko.observableArray([]);
  self.sortingOptions = ko.observableArray([
      { name: "Name ascending", value: "NameUp" },
      { name: "Name descending", value: "NameDn" },
      { name: "Height ascending", value: "HeightUp" },
      { name: "Height descending", value: "HeightDn" },
      { name: "Sex feminine", value: "SexUp" },
      { name: "Sex masculine", value: "SexDn" },
  ]);
  self.sortBy = ko.observable(self.sortingOptions()[0])

  self.loader = createListLoader(
    self.athletes,
    "Athletes",
    favoritesSection,
    { extraParams: { sortby: self.sortBy().value } }
  );
  self.toggleFavorite = favoriteToggle(favoritesSection);

  self.sortBy.subscribe(function ({ value }) {
      viewModel.loader.reset();

      viewModel.loader.extraParams.sortby = value;

      viewModel.loader.loadMore();
  });
}

const viewModel = new AthletesViewModel();

ko.applyBindings(viewModel);

function setIOCFilter(ioc) {
  viewModel.loader.reset();

  if (ioc) {
    viewModel.loader.endpoint = "Athletes/ByIOC";
    viewModel.loader.extraParams = { ioc };
  } else {
    viewModel.loader.endpoint = "Athletes";
    delete viewModel.loader.extraParams.ioc;
  }

  viewModel.loader.loadMore();
}

searchBar("#search", "athlete.html", "Athletes/SearchByName", viewModel.loader);

$("#ioc").autocomplete({
  source: function (request, resolve) {
    const data = ioc_flag.filter((record) =>
      record.name.toLowerCase().includes(request.term.toLowerCase())
    );
    const results = data.slice(0, 10).map((record) => ({
      label: record.name,
      value: record,
    }));
    resolve(results);
  },
  focus: function (event, ui) {
    event.preventDefault();
    $("#ioc").val(ui.item.label);
  },
  select: function (event, ui) {
    event.preventDefault();
    $("#ioc").val(ui.item.label);

    setIOCFilter(ui.item.value.ioc);
  },
  change: function (event, ui) {
    setIOCFilter(ui.item?.value?.ioc);
  },
  create: function (event, ui) {
    $(this).data("ui-autocomplete")._renderItem = function (ul, item) {
      const inner = $("<div>")
        .append(item.value.flag)
        .append("&nbsp;")
        .append(item.label);

      return $("<li>").append(inner).appendTo(ul);
    };
  },
});
