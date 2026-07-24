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

    this.showLanding();

}

    showLanding() {

    this.timer.stop();

    this.state.isPaused = false;

    this.ui.showLanding();

    document
        .getElementById("landingStartButton")
        .addEventListener("click", () => {

            this.showHome();

        });

}

showHome() {

    this.timer.stop();

    this.state.isPaused = false;

    this.ui.showHome();

this.loadAds();

document
    .getElementById("startButton")
        .addEventListener("click", () => {

            this.state.seconds =
                Number(
                    document.getElementById("seconds").value
                );

            this.state.count =
                Number(
                    document.getElementById("count").value
                );

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
    .addEventListener("click", () => {

        this.togglePause();

    });

this.setupPracticeTouchControls();


}

togglePause() {

    const pauseButton =
        document.getElementById("pauseButton");

    const countdown =
        document.getElementById("countdown");

    if (
        !pauseButton ||
        pauseButton.disabled ||
        (countdown && !countdown.hidden)
    ) {

        return;

    }

    if (!this.state.isPaused) {

        this.timer.pause();

        this.state.isPaused = true;

        pauseButton.textContent = "▶ 再開";

        return;

    }

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

    pauseButton.textContent = "⏸ 一時停止";

}

loadAds() {

    if (
        location.hostname === "127.0.0.1" ||
        location.hostname === "localhost"
    ) {

        return;

    }

    const ad =
        document.querySelector(
            ".adsbygoogle:not([data-adsbygoogle-status])"
        );

    if (!ad) {
        return;
    }

    try {

        (window.adsbygoogle =
            window.adsbygoogle || []).push({});

    } catch (error) {

        console.warn("AdSense:", error);

    }

}


setupPracticeTouchControls() {

    const practiceImage =
        document.getElementById("practiceImage");

    if (!practiceImage) {

        return;

    }

    const swipeThreshold = 50;
    const tapThreshold = 12;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isTouching = false;

    const isCountdownActive = () => {

        const countdown =
            document.getElementById("countdown");

        return Boolean(
            countdown &&
            !countdown.hidden
        );

    };

    practiceImage.addEventListener(
        "touchstart",
        (event) => {

            if (
                isCountdownActive() ||
                event.touches.length !== 1
            ) {

                return;

            }

            const touch = event.touches[0];

            startX = touch.clientX;
            startY = touch.clientY;

            currentX = startX;
            currentY = startY;

            isTouching = true;

        },
        {
            passive: true
        }
    );

    practiceImage.addEventListener(
        "touchmove",
        (event) => {

            if (
                !isTouching ||
                event.touches.length !== 1
            ) {

                return;

            }

            const touch = event.touches[0];

            currentX = touch.clientX;
            currentY = touch.clientY;

            const deltaX =
                currentX - startX;

            const deltaY =
                currentY - startY;

            if (
                Math.abs(deltaX) >
                Math.abs(deltaY)
            ) {

                event.preventDefault();

            }

        },
        {
            passive: false
        }
    );

    practiceImage.addEventListener(
        "touchend",
        (event) => {

            if (!isTouching) {

                return;

            }

            isTouching = false;

            if (isCountdownActive()) {

                return;

            }

            const touch =
                event.changedTouches[0];

            if (touch) {

                currentX = touch.clientX;
                currentY = touch.clientY;

            }

            const deltaX =
                currentX - startX;

            const deltaY =
                currentY - startY;

            const absoluteX =
                Math.abs(deltaX);

            const absoluteY =
                Math.abs(deltaY);

            if (
                absoluteX >= swipeThreshold &&
                absoluteX > absoluteY
            ) {

                const pauseButton =
                    document.getElementById(
                        "pauseButton"
                    );

                this.timer.stop();

                this.state.isPaused = false;

                if (pauseButton) {

                    pauseButton.textContent =
                        "⏸ 一時停止";

                }

                if (deltaX < 0) {

                    this.state.currentIndex++;

                    this.nextImage();

                    return;

                }

                if (this.state.currentIndex > 1) {

                    this.state.currentIndex--;

                    this.nextImage();

                } else {

                    this.nextImage();

                }

                return;

            }

            if (
                absoluteX <= tapThreshold &&
                absoluteY <= tapThreshold
            ) {

                this.togglePause();

            }

        },
        {
            passive: true
        }
    );

    practiceImage.addEventListener(
        "touchcancel",
        () => {

            isTouching = false;

        }
    );

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

this.loadAds();

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