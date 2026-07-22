const fs = require("fs");
const path = require("path");

const projectRoot =
    path.resolve(__dirname, "..");

const sourceDirectory =
    path.join(projectRoot, "source-images");

const outputDirectory =
    path.join(projectRoot, "images", "hands");

const imagesJsonPath =
    path.join(projectRoot, "data", "images.json");

const supportedExtensions =
    new Set([
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp"
    ]);

function compareFileNames(fileA, fileB) {

    return fileA.localeCompare(
        fileB,
        "ja",
        {
            numeric: true,
            sensitivity: "base"
        }
    );

}

function getSourceImages() {

    if (!fs.existsSync(sourceDirectory)) {

        throw new Error(
            "source-imagesフォルダが見つかりません。"
        );

    }

    return fs
        .readdirSync(
            sourceDirectory,
            {
                withFileTypes: true
            }
        )
        .filter((entry) => {

            if (!entry.isFile()) {

                return false;

            }

            const extension =
                path.extname(entry.name).toLowerCase();

            return supportedExtensions.has(extension);

        })
        .map((entry) => entry.name)
        .sort(compareFileNames);

}

try {

    const sourceImages =
        getSourceImages();

    if (sourceImages.length === 0) {

        throw new Error(
            "source-imagesフォルダに画像がありません。"
        );

    }

    fs.mkdirSync(
        outputDirectory,
        {
            recursive: true
        }
    );

    console.log("HandPractice直接更新ツール");
    console.log("");
    console.log(
        `${sourceImages.length}枚の画像を読み込みました。`
    );
    console.log("");
    console.log("出力予定");
    console.log("");

    sourceImages.forEach(
        (fileName, index) => {

            const number =
                String(index + 1).padStart(3, "0");

            const outputName =
                `hand${number}.webp`;

            console.log(
                `${fileName} → ${outputName}`
            );

        }
    );

    console.log("");
    console.log(
        `出力先：${outputDirectory}`
    );

} catch (error) {

    console.error(error.message);
    process.exitCode = 1;

}