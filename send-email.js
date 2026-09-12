/* =========================================================
   SAPHAH ADVERTISING SERVICE
   Email request processor
   ========================================================= */

const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const REQUESTS_DIR = path.join(__dirname, "requests");
const ARCHIVE_DIR = path.join(__dirname, "archive");
const FAILED_DIR = path.join(__dirname, "failed");

const RECIPIENT = "saphahcentralservices@gmail.com";
const CC_RECIPIENT = "saphahcentralbusiness@outlook.com";

const SENDER = process.env.SAS_EMAIL;
const PASSWORD = process.env.SAS_PASS;


/* ---------------------------------------------------------
   VALIDATE SMTP CREDENTIALS
   --------------------------------------------------------- */

if (!SENDER || !PASSWORD) {
    console.error("ERROR: SAS_EMAIL or SAS_PASS is missing.");
    process.exit(1);
}


/* ---------------------------------------------------------
   FIND REQUEST FILE
   --------------------------------------------------------- */

const requestFiles = fs.readdirSync(REQUESTS_DIR)
    .filter(file => file.endsWith(".md"))
    .filter(file => file !== "0000.md");

if (requestFiles.length === 0) {
    console.log("No advertisement requests to process.");
    process.exit(0);
}

if (requestFiles.length > 1) {
    console.error(
        "ERROR: More than one advertisement request was found:"
    );
    requestFiles.forEach(file => console.error(`- ${file}`));
    process.exit(1);
}

const requestFile = requestFiles[0];
const requestPath = path.join(REQUESTS_DIR, requestFile);


/* ---------------------------------------------------------
   READ REQUEST
   --------------------------------------------------------- */

const requestContent = fs.readFileSync(requestPath, "utf8");


/* ---------------------------------------------------------
   CREATE SMTP TRANSPORT
   --------------------------------------------------------- */

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SENDER,
        pass: PASSWORD
    }
});


/* ---------------------------------------------------------
   SEND EMAIL
   --------------------------------------------------------- */

async function sendRequest() {
    const mailOptions = {
        from: SENDER,
        to: RECIPIENT,
        cc: CC_RECIPIENT,
        subject: `SAS ADVERTISEMENT REQUEST — ${requestFile}`,
        text: requestContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        console.log("EMAIL SENT SUCCESSFULLY.");
        console.log(`Message ID: ${info.messageId}`);

        moveRequest(ARCHIVE_DIR);

    } catch (error) {
        console.error("EMAIL SEND FAILED.");
        console.error(error);

        moveRequest(FAILED_DIR);

        process.exitCode = 1;
    }
}


/* ---------------------------------------------------------
   MOVE PROCESSED REQUEST
   --------------------------------------------------------- */

function moveRequest(destinationDir) {
    const destinationPath = path.join(destinationDir, requestFile);

    fs.renameSync(requestPath, destinationPath);

    console.log(
        `Request moved to: ${path.relative(__dirname, destinationPath)}`
    );
}


/* ---------------------------------------------------------
   START PROCESSING
   --------------------------------------------------------- */

sendRequest();
