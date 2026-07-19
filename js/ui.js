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

    showPractice() {
        this.app.innerHTML = practiceView();
    }

    showFinish() {
        this.app.innerHTML = finishView();
    }

}