const { exec } = require("child_process");
const fs = require("fs");

build();

async function build() {
    await buildTypescript();
    await buildSCSS();
    await buildHTML();
}

async function buildTypescript() {
    console.log("Converting Typescript into Javascript...");
    await execCommand("npx tsc");
    console.log("Done building scripts.");
}

async function buildSCSS() {
    console.log("Converting SCSS into CSS...");
    await execCommand("sass src/style.scss build/style.css");
    console.log("Done building styles.");
}

async function buildHTML() {
    console.log("Creating HTML file...");

    const partialHtml = fs.readFileSync("src/index.html");
    const completeHtml = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Felipe Alves - Random Quote Machine</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            />
            <link
                rel="stylesheet"
                href="./style.css"
            />
        </head>
        <body>
            ${partialHtml}
            <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
            <script src="./script.js"></script>
        </body>
    </html>    
    `;
    fs.writeFileSync("build/index.html", completeHtml);
    console.log("Done building HTML.");
}

/** @param {string} command */
function execCommand(command) {
    return new Promise(async (resolve, reject) => {
        try {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log("Error executing command:", command);
                    console.error("Error:", error);
                    console.log("Stderr:", stderr);
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}
