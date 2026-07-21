const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");

const imagesDirectory = path.join(
    projectRoot,
    "images",
    "hands"
);

const outputFile = path.join(
    projectRoot,
    "data",
    "images.json"
);

const supportedExtensions = new Set([
    ".webp",
    ".jpg",
    ".jpeg",
    ".png"
]);

const imageFiles = fs
    .readdirSync(imagesDirectory, {
        withFileTypes: true
    })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) =>
        supportedExtensions.has(
            path.extname(fileName).toLowerCase()
        )
    )
    .sort((firstFile, secondFile) =>
        firstFile.localeCompare(
            secondFile,
            undefined,
            {
                numeric: true,
                sensitivity: "base"
            }
        )
    );

fs.writeFileSync(
    outputFile,
    `${JSON.stringify(imageFiles, null, 4)}\n`,
    "utf8"
);

console.log(
    `${imageFiles.length} images written to data/images.json`
);