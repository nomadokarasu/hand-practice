export class Timer {

    constructor() {

        this.time = 0;
        this.interval = null;

    }

    start(seconds, onTick, onFinish) {

        this.time = seconds;

        onTick(this.time);

        this.interval = setInterval(() => {

            this.time -= 0.1;

            if (this.time <= 0) {

                clearInterval(this.interval);

                this.time = 0;

                onTick(this.time);

                onFinish();

                return;

            }

            onTick(Number(this.time.toFixed(1)));

        }, 100);

    }

    pause() {

    clearInterval(this.interval);

}

resume(onTick, onFinish) {

    this.interval = setInterval(() => {

        this.time -= 0.1;

        if (this.time <= 0) {

            clearInterval(this.interval);

            this.time = 0;

            onTick(this.time);

            onFinish();

            return;

        }

        onTick(Number(this.time.toFixed(1)));

    }, 100);

}

}