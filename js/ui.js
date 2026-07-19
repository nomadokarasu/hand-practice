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

    document.getElementById("practiceImage").src = imagePath;

}

    showFinish() {
        this.app.innerHTML = finishView();
    }

}