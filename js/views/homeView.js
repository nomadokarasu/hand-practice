export function homeView() {

    return `
        <main class="container">

            <h1>手が描けーる</h1>

            <p class="subtitle">
                練習設定
            </p>

            <section class="card">

                <label>
                    表示時間（秒）

                    <input
                        id="seconds"
                        type="number"
                        min="5"
                        max="300"
                        value="30"
                    >

                </label>

                <label>

                    表示枚数

                    <input
                        id="count"
                        type="number"
                        min="1"
                        max="1000"
                        value="20"
                    >

                </label>

                <button
                    id="startButton"
                    type="button"
                >
                    スタート
                </button>

            </section>

            <section class="ad">
                Advertisement
            </section>

        </main>
    `;

}