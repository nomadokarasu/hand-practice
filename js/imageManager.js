export class ImageManager {

    constructor() {

        this.images = [];
        this.deck = [];
        this.currentIndex = 0;

    }

    async load() {

        if (this.images.length > 0) {

            return;

        }

        const response = await fetch("./data/images.json");

        this.images = await response.json();

        this.shuffleDeck();

    }

    shuffleDeck() {

        this.deck = [...this.images];

        for (let i = this.deck.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [this.deck[i], this.deck[j]] =
                [this.deck[j], this.deck[i]];

        }

        this.currentIndex = 0;

    }

    getRandomImage() {

        if (this.currentIndex >= this.deck.length) {

            this.shuffleDeck();

        }

        const image = this.deck[this.currentIndex];

        this.currentIndex++;

        return "./images/hands/" + image;

    }

}