const path = require("path");

const projectRoot =
    path.resolve(__dirname, "..");

const sourceDirectory =
    path.join(projectRoot, "source-images");

const outputDirectory =
    path.join(projectRoot, "images", "hands");

const imagesJsonPath =
    path.join(projectRoot, "data", "images.json");

console.log("HandPractice直接更新ツール");
console.log("");
console.log(`プロジェクト：${projectRoot}`);
console.log(`元画像：${sourceDirectory}`);
console.log(`出力先：${outputDirectory}`);
console.log(`JSON：${imagesJsonPath}`);
console.log("");
console.log("準備ができました。");