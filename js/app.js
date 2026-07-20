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

    
    startPractice() {

    this.state.currentIndex = 1;

    this.state.isPaused = false;

    this.showPractice();

}

    async showPractice() {

    // images.json を読み込む
    await this.imageManager.load();


// 最初の画面を表示
const image = this.imageManager.getRandomImage();

this.ui.showPractice(image);

this.ui.updateCounter(
    this.state.currentIndex,
    this.state.count
);

this.timer.start(

    this.state.seconds,

    (time) => {

        this.ui.updateTimer(time);

    },

    () => {

    if (this.state.currentIndex >= this.state.count) {

        this.showFinish();

        return;

    }

    this.state.currentIndex++;

    this.nextImage();

}

);

document
    .getElementById("backButton")
    .addEventListener("click", () => {

        this.showHome();

    });

document
    .getElementById("pauseButton")
    .addEventListener("click", (event) => {

        if (!this.state.isPaused) {

            this.timer.pause();

            this.state.isPaused = true;

            event.target.textContent = "▶ 再開";

        } else {

            this.timer.resume(

                (time) => {

                    this.ui.updateTimer(time);

                },

                () => {

                    this.state.currentIndex++;

                    this.nextImage();

                }

            );

            this.state.isPaused = false;

            event.target.textContent = "⏸ 一時停止";

        }

    });

document
    .getElementById("finishButton")

    document
        .getElementById("backButton")
        .addEventListener("click", () => {

            this.showHome();

        });

}

nextImage() {

    if (this.state.currentIndex > this.state.count) {

        this.showFinish();

        return;

    }

   const image = this.imageManager.getRandomImage();

this.ui.updateImage(image);

this.ui.updateCounter(
    this.state.currentIndex,
    this.state.count
);

    this.timer.start(

        this.state.seconds,

        (time) => {

            this.ui.updateTimer(time);

        },

        () => {

            this.state.currentIndex++;

            this.nextImage();

        }

    );

}


    showFinish() {

        this.ui.showFinish();

        document
    .getElementById("retryButton")
    .addEventListener("click", () => {

        this.startPractice();

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