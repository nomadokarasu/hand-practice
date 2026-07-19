export class ImageManager {

    constructor() {
        this.images = [];
    }

    async load() {

        const response = await fetch("./data/images.json");

        this.images = await response.json();

    }

    getRandomImage() {

    const index = Math.floor(Math.random() * this.images.length);

    return "./images/hands/" + this.images[index];

}

}