const backupImages = [
    {
        img: "assets/img/CarouselOlympic2021.webp",
        name: "2021 Olympic Games",
        description: "The XXXII Olympiad was held at Tokyo after a year of delay due to the COVID-19 pandemic",
    },
    {
        img: "assets/img/CarouselOlympic2016.jpg",
        name: "2016 Olympic Games",
        description: "The previous edition was held at Rio de Janeiro and featured over 11,000 athletes",
    },
    {
        img: "assets/img/CarouselOlympicWinter2022.webp",
        name: "Winter Olympic Games",
        description: "A separate event focused on winter sports last held in 2022 in Beijing",
    },
];

const factGenerators = [
    (data) => `Held in ${data.City}`,
    (data) => {
        const medalsCount = data.Medals.reduce((accum, data) => accum + data.Counter, 0);
        return `In this edition ${medalsCount} medals were awarded`;
    },
    (data) => {
        const modalitiesCount = data.Modalities.length;
        return `${modalitiesCount} different modalities were played in this edition`;
    }
];

async function loadGameImage(id) {
    const response = await fetch(`${API_URL}/Games/FullDetails?id=${id}`);

    if (!response.ok) return null

    const data = await response.json();

    if (data.Photo === null || data.Medals === null || data.Modalities === null) return null

    const fact = getRandomArrayElement(factGenerators)(data);
    return { img: data.Photo, name: data.Name, description: fact };
}

function IndexViewModel() {
    const self = this;

    self.results = ko.observableArray(backupImages);

    async function fetchGameImages() {
        const response = await fetch(`${API_URL}/Games`);
        const data = await response.json();

        const shuffled = data.Records.sort(() => 0.5 - Math.random());

        let inFlight = [];

        imageFetcher:
        for (const game of shuffled) {
            while (inFlight.length + self.results().length >= 5) {
                await Promise.race(inFlight);

                if (self.results().length >= 5) break imageFetcher;

                inFlight = inFlight.filter(queryPromise => !queryPromise.isFulfilled());
            }

            inFlight.push(
                MakeQueryablePromise(loadGameImage(game.Id).then((res) => {
                    if (res === null) return;

                    self.results.push(res);
                }))
            );
        }
    }

    fetchGameImages();
}

ko.applyBindings(new IndexViewModel())

const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl.add({
    targets: '.animate g circle',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 250 },
}).add({
    targets: '.animate g path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1000,
}, 1500);
