export function homeView() {

    return `
        <main class="container">

            <h1>手が描けーる</h1>

            <p class="subtitle">
                練習設定
            </p>

            <section class="card settings-card">

    <div class="setting-group">

        <label for="seconds">
            表示時間（秒）
        </label>

        <input
            id="seconds"
            type="number"
            min="5"
            max="300"
            value="30"
        >

    </div>

    <div class="setting-group">

        <label for="count">
            表示枚数
        </label>

        <input
            id="count"
            type="number"
            min="1"
            max="1000"
            value="20"
        >

    </div>

    <div class="setting-group situation-settings">

        <p class="setting-title">
            シチュエーション
        </p>

        <div
    id="situationOptions"
    class="situation-options"
>

    <button
        type="button"
        class="situation-button is-selected"
        data-situation="simple"
    >
        シンプルな手
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="study"
    >
        勉強
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="cooking"
    >
        料理
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="smartphone"
    >
        スマホ
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="instrument"
    >
        楽器
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="sports"
    >
        スポーツ
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="battle"
    >
        バトル
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="reading"
    >
        読書
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="pinch"
    >
        つまむ
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="grip"
    >
        握る
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="wrap"
    >
        包む
    </button>

    <button
        type="button"
        class="situation-button"
        data-situation="rock-paper-scissors"
    >
        じゃんけん
    </button>

</div>

    </div>

    <button
        id="startButton"
        type="button"
    >
        練習を始める
    </button>

</section>

            <section class="ad" aria-label="広告">

    <p class="ad-label">
        広告
    </p>

    <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-8435618945656642"
        data-ad-slot="5757685134"
        data-ad-format="auto"
        data-full-width-responsive="true">
    </ins>

</section>

        </main>
    `;

}