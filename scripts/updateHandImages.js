const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

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
    console.log(`出力先: ${outputDirectory}`);

const maximumFileSize =
    400 * 1024;

async function convertImage(
    inputPath,
    outputPath
) {

    let minimumQuality = 20;
    let maximumQuality = 95;

    let bestBuffer = null;
    let bestQuality = null;

    while (minimumQuality <= maximumQuality) {

        const quality =
            Math.floor(
                (minimumQuality + maximumQuality) / 2
            );

        const convertedBuffer =
            await sharp(inputPath)
                .resize({
                    width: 1400,
                    height: 1400,
                    fit: "inside",
                    withoutEnlargement: true
                })
                .webp({
                    quality
                })
                .toBuffer();

        if (
            convertedBuffer.length <=
            maximumFileSize
        ) {

            bestBuffer = convertedBuffer;
            bestQuality = quality;
            minimumQuality = quality + 1;

        } else {

            maximumQuality = quality - 1;

        }

    }

    if (bestBuffer === null) {

        throw new Error(
            `${path.basename(inputPath)}を400KB以下にできませんでした。`
        );

    }

    fs.writeFileSync(
        outputPath,
        bestBuffer
    );

    return {
        quality: bestQuality,
        fileSize: bestBuffer.length
    };

}

(async () => {

    for (
        let index = 0;
        index < sourceImages.length;
        index += 1
    ) {

        const fileName =
            sourceImages[index];

        const number =
            String(index + 1).padStart(3, "0");

        const outputName =
            `hand${number}.webp`;

        const inputPath =
            path.join(
                sourceDirectory,
                fileName
            );

        const outputPath =
            path.join(
                outputDirectory,
                outputName
            );

        const result =
            await convertImage(
                inputPath,
                outputPath
            );

        const fileSizeKilobytes =
            Math.ceil(
                result.fileSize / 1024
            );

       console.log(
    `変換完了: ${outputName} ` +
    `（品質${result.quality}・${fileSizeKilobytes}KB）`
);

}

const imageList =
    sourceImages.map((_, index) => {

        const number =
            String(index + 1).padStart(3, "0");

        return `hand${number}.webp`;

    });

fs.writeFileSync(
    imagesJsonPath,
    JSON.stringify(
        imageList,
        null,
        2
    ) + "\n"
);

console.log("");
console.log(
    `${imagesJsonPath} を更新しました。`
);

})().catch((error) => {

    console.error(error.message);
    process.exitCode = 1;

});

} catch (error) {

    console.error(error.message);
    process.exitCode = 1;

}