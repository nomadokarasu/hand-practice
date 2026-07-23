export function landingView() {

    return `
        <main class="landing-screen">

            <section class="landing-card">

                <h1 class="landing-title">
                    手が描けーる
                </h1>

                <p class="landing-subtitle">
                    手が描けるようになるための練習アプリ
                </p>

                <p class="landing-copy">
                    「手を描くのって難しいなぁ……」
                </p>

                <p class="landing-description">
                    そんな悩みから生まれた、<br>
                    毎日少しずつ手を描くための練習アプリです。
                </p>

                <ul class="landing-features">
    <li>✓ 商用利用OK</li>
    <li>✓ トレースOK</li>
    <li>✓ クレジット表記不要</li>
    <li>✓ 無料で利用できます</li>
</ul>

                                <button
                    class="landing-start-button"
                    id="landingStartButton"
                    type="button"
                >
                    練習を始める
                </button>

                <nav
                    class="landing-links"
                    aria-label="サイト案内"
                >
                    <a href="./guide/">
                        使い方・利用について
                    </a>

                    <a href="./privacy/">
                        プライバシーポリシー
                    </a>

                    <a href="./contact/">
                        お問い合わせ
                    </a>
                </nav>

            </section>

        </main>
    `;

}