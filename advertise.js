/* =========================================================
   SAPHAH ADVERTISING SERVICE
   Advertisement order page
   ========================================================= */

const IMAGE_SIZE = 125;

const form = document.getElementById("advertisement-form");
const imageUrlInput = document.getElementById("image-url");
const verifyImageButton = document.getElementById("verify-image");
const imageVerification = document.getElementById("image-verification");
const submissionStatus = document.getElementById("submission-status");

let verifiedImageUrl = false;


/* ---------------------------------------------------------
   IMAGE VERIFICATION
   --------------------------------------------------------- */

function verifyImage() {
    const imageUrl = imageUrlInput.value.trim();

    verifiedImageUrl = false;
    imageVerification.innerHTML = "";

    if (!imageUrl) {
        imageVerification.textContent =
            "Please enter the advertisement image URL.";
        return;
    }

    const image = new Image();

    image.onload = function () {
        if (
            image.naturalWidth !== IMAGE_SIZE ||
            image.naturalHeight !== IMAGE_SIZE
        ) {
            imageVerification.textContent =
                "INVALID IMAGE: The advertisement must be exactly 125×125 pixels.";
            return;
        }

        verifiedImageUrl = true;

        const message = document.createElement("div");
        message.textContent = "IMAGE VERIFIED: 125×125 pixels.";

        const preview = document.createElement("img");
        preview.src = imageUrl;
        preview.alt = "Advertisement preview";
        preview.width = IMAGE_SIZE;
        preview.height = IMAGE_SIZE;

        imageVerification.appendChild(message);
        imageVerification.appendChild(preview);
    };

    image.onerror = function () {
        imageVerification.textContent =
            "IMAGE ERROR: The image could not be loaded from the supplied URL.";
    };

    image.src = imageUrl;
}


/* ---------------------------------------------------------
   FORM VALIDATION
   --------------------------------------------------------- */

function validateForm() {
    if (!verifiedImageUrl) {
        submissionStatus.textContent =
            "Please verify your advertisement image before submitting the order.";
        return false;
    }

    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    return true;
}


/* ---------------------------------------------------------
   FORM SUBMISSION
   --------------------------------------------------------- */

function submitAdvertisement(event) {
    event.preventDefault();

    submissionStatus.textContent = "";

    if (!validateForm()) {
        return;
    }

    /*
     * The secure SMTP submission service will be connected here.
     * No SMTP credentials or private server details belong in
     * this public JavaScript file.
     */

    submissionStatus.textContent =
        "ADVERTISEMENT PENDING APPROVAL";
}


/* ---------------------------------------------------------
   EVENT HANDLERS
   --------------------------------------------------------- */

verifyImageButton.addEventListener("click", verifyImage);

imageUrlInput.addEventListener("input", function () {
    verifiedImageUrl = false;
    imageVerification.innerHTML = "";
});

form.addEventListener("submit", submitAdvertisement);
