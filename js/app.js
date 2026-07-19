import { State } from "./state.js";
import { UI } from "./ui.js";

class App {

    constructor() {

    this.ui = new UI();

    this.state = new State();

}

    init() {

        this.showHome();

    }

    showHome() {

        this.ui.showHome();

        document
.getElementById("startButton")
.addEventListener("click", () => {

    this.state.seconds =
        Number(document.getElementById("seconds").value);

    this.state.count =
        Number(document.getElementById("count").value);

    console.log(this.state);

    this.showPractice();

});

    }

    showPractice() {

        this.ui.showPractice();

        document
            .getElementById("finishButton")
            .addEventListener("click", () => {

                this.showFinish();

            });

        document
            .getElementById("backButton")
            .addEventListener("click", () => {

                this.showHome();

            });

    }

    showFinish() {

        this.ui.showFinish();

        document
            .getElementById("retryButton")
            .addEventListener("click", () => {

                this.showPractice();

            });

        document
            .getElementById("homeButton")
            .addEventListener("click", () => {

                this.showHome();

            });

    }

}

const app = new App();

app.init();