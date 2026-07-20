import { homeView } from "./views/homeView.js";
import { practiceView } from "./views/practiceView.js";
import { finishView } from "./views/finishView.js";

export class UI {

    constructor() {
        this.app = document.getElementById("app");
    }

    showHome() {
        this.app.innerHTML = homeView();
    }

    showPractice(imagePath) {

    this.app.innerHTML = practiceView();

    this.updateImage(imagePath);

}

updateImage(imagePath) {

    document.getElementById("practiceImage").src = imagePath;

}

updateTimer(time) {

    document.querySelector(".timer span").textContent = time.toFixed(1);

}

updateCounter(current, total) {

    document.querySelector(".counter").textContent =
        `${current} / ${total}`;

}

showFinish() {

    this.app.innerHTML = finishView();

}

}