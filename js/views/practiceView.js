export function practiceView() {
    return `
        <main class="container practice-screen">

            <div class="top-bar">
                <button id="backButton">← 設定へ戻る</button>
                <button id="pauseButton">⏸ 一時停止</button>
            </div>

                                    <section class="image-area">

                <div class="image-wrapper">

                    <img
                        id="practiceImage"
                        class="practice-image"
                        src=""
                        alt="練習画像">

                    <div
                        id="countdown"
                        class="countdown"
                        hidden>
                        3
                    </div>

                </div>

            </section>

                        <p class="timer">

                <span>30.0</span>

            </p>

            <div class="progress">

                <div class="progress-bar"></div>

            </div>

            <p class="counter">

                0 / 0

            </p>


        </main>
    `;
}