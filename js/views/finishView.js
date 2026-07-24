export function finishView() {
    return `
        <main class="container">

            <h1>お疲れさまでした！</h1>

            <p>
                練習が終了しました。
            </p>

            <button id="retryButton">

                もう一回やる

            </button>

            <button id="homeButton">

                設定画面へ戻る

            </button>

            <section class="ad" aria-label="広告">

    <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-8435618945656642"
        data-ad-slot="3131521796"
        data-ad-format="auto"
        data-full-width-responsive="true">
    </ins>

</section>

        </main>
    `;
}