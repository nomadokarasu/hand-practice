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

    this.handleKeydown = this.handleKeydown.bind(this);

}

    init() {

    document.addEventListener(
        "keydown",
        this.handleKeydown
    );

    this.showHome();

}

    showHome() {

    this.timer.stop();

    this.state.isPaused = false;

    this.ui.showHome();

    document
        .getElementById("startButton")
        .addEventListener("click", () => {

            this.state.seconds =
                Number(document.getElementById("seconds").value);

            this.state.count =
                Number(document.getElementById("count").value);

            this.startPractice();

        });

}

    
    startPractice() {

    this.timer.stop();

    this.state.currentIndex = 1;

    this.state.isPaused = false;

    this.imageHistory = [];

    this.showPractice();

}

    async showPractice() {

    // images.json を読み込む
    await this.imageManager.load();


// 最初の画面を表示
const image = this.imageManager.getRandomImage();

this.imageHistory[0] = image;

this.ui.showPractice(image);

this.ui.updateTimer(
    this.state.seconds
);

this.ui.updateCounter(
    this.state.currentIndex,
    this.state.count
);

this.ui.updateProgress(
    this.state.currentIndex,
    this.state.count
);

const countdown =
    document.getElementById("countdown");

const pauseButton =
    document.getElementById("pauseButton");

countdown.hidden = false;

pauseButton.disabled = true;

let countdownValue = 3;

countdown.textContent = countdownValue;

const countdownTimer = setInterval(() => {

    if (!countdown.isConnected) {

        clearInterval(countdownTimer);

        return;

    }

    countdownValue--;

    if (countdownValue > 0) {

        countdown.textContent = countdownValue;

        return;

    }

    clearInterval(countdownTimer);

countdown.hidden = true;

pauseButton.disabled = false;

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

}, 1000);

document
    .getElementById("backButton")
    .addEventListener("click", () => {

        this.timer.stop();

        this.state.isPaused = false;

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


}

handleKeydown(event) {

    const pauseButton =
        document.getElementById("pauseButton");

    if (!pauseButton) {

        return;

    }

    const countdown =
        document.getElementById("countdown");

    if (countdown && !countdown.hidden) {

        return;

    }

    if (event.code === "Space") {

        event.preventDefault();

        pauseButton.click();

        return;

    }

    if (event.code === "ArrowRight") {

        event.preventDefault();

        this.timer.stop();

        this.state.isPaused = false;

        pauseButton.textContent = "⏸ 一時停止";

        this.state.currentIndex++;

        this.nextImage();

        return;

    }

   if (event.code === "ArrowLeft") {

    event.preventDefault();

    this.timer.stop();

    this.state.isPaused = false;

    pauseButton.textContent = "⏸ 一時停止";

    if (this.state.currentIndex > 1) {

        this.state.currentIndex--;

    }

    this.nextImage();

}

}

nextImage() {

    if (this.state.currentIndex > this.state.count) {

        this.showFinish();

        return;

    }

   const historyIndex =
    this.state.currentIndex - 1;

let image =
    this.imageHistory[historyIndex];

if (!image) {

    image = this.imageManager.getRandomImage();

    this.imageHistory[historyIndex] = image;

}

this.ui.updateImage(image);

this.ui.updateCounter(
    this.state.currentIndex,
    this.state.count
);

this.ui.updateProgress(
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

    this.timer.stop();

    this.state.isPaused = false;

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