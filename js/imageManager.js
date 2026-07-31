export class ImageManager {

    constructor() {

    this.images = [];
    this.deck = [];
    this.currentIndex = 0;
    this.lastImage = null;

}

    async load(categories = ["simple"]) {

    this.images = [];

    for (const category of categories) {

        const response = await fetch(
            `./assets/hands/${category}/index.json`
        );

        const files = await response.json();

        this.images.push(
            ...files.map(file => ({
                file,
                category
            }))
        );

    }

    this.shuffleDeck();

}

    shuffleDeck() {

    this.deck = [...this.images];

    for (let i = this.deck.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [this.deck[i], this.deck[j]] =
            [this.deck[j], this.deck[i]];

    }

    if (
        this.deck.length > 1 &&
        this.deck[0] === this.lastImage
    ) {

        [this.deck[0], this.deck[1]] =
            [this.deck[1], this.deck[0]];

    }

    this.currentIndex = 0;

}

    getRandomImage() {

    if (this.currentIndex >= this.deck.length) {

        this.shuffleDeck();

    }

    const image = this.deck[this.currentIndex];

if (!image) {

    return null;

}

this.currentIndex++;

this.lastImage = image;

return `./assets/hands/${image.category}/${image.file}`;

}

}