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

    const totalSeconds = Math.max(0, Math.ceil(time));

    const hours =
        Math.floor(totalSeconds / 3600);

    const minutes =
        Math.floor((totalSeconds % 3600) / 60);

    const seconds =
        totalSeconds % 60;

    document.querySelector(".timer span").textContent =
        `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

    updateCounter(current, total) {

        document.querySelector(".counter").textContent =
            `${current} / ${total}`;

    }

    updateProgress(current, total) {

        const percent = (current / total) * 100;

        document.querySelector(".progress-bar").style.width =
            `${percent}%`;

    }

    showFinish() {

        this.app.innerHTML = finishView();

    }

}