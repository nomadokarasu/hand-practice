export function practiceView() {
    return `
        <main class="container">

            <div class="top-bar">
                <button id="backButton">← 設定へ戻る</button>
                <button id="pauseButton">⏸ 一時停止</button>
            </div>

            <section class="image-area">

                <div class="image-placeholder">
                    画像表示エリア
                </div>

            </section>

            <div class="progress">

                <div class="progress-bar"></div>

            </div>

            <p class="timer">

                残り時間
                <br>
                <span>30.0</span>

            </p>

            <p class="counter">

                1 / 20

            </p>

            <button id="finishButton">

                （開発用）終了画面へ

            </button>

        </main>
    `;
}