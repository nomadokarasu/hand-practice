export class ImageManager {

    constructor() {

        this.images = [];
        this.lastIndex = -1;

    }

    async load() {

        const response = await fetch("./data/images.json");

        this.images = await response.json();

    }

    getRandomImage() {

        if (this.images.length === 1) {

            return "./images/hands/" + this.images[0];

        }

        let index;

        do {

            index = Math.floor(Math.random() * this.images.length);

        } while (index === this.lastIndex);

        this.lastIndex = index;

        return "./images/hands/" + this.images[index];

    }

}