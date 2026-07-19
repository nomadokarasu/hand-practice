import { State } from "./state.js";
import { UI } from "./ui.js";
import { ImageManager } from "./imageManager.js";
import { Timer } from "./timer.js";

class App {

    constructor() {

    this.ui = new UI();
    this.state = new State();
    this.imageManager = new ImageManager();
    this.timer = new Timer();

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

    async showPractice() {

    // images.json を読み込む
    await this.imageManager.load();

    // 最初の画像を取得
    const image = this.imageManager.getRandomImage();

    // 画像を表示
    this.ui.showPractice(image);

this.timer.start(

    this.state.seconds,

    (time) => {

        this.ui.updateTimer(time);

    },

    () => {

        this.showFinish();

    }

);

document
    .getElementById("finishButton")

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