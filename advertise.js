/* =========================================================
   SAPHAH ADVERTISING SERVICE
   Advertisement order page
   ========================================================= */

const ADVERTISING_PRICE = "5.00";
const PAYPAL_BASE = "https://PayPal.me/swdb2018/";
const IMAGE_SIZE = 125;

const form = document.getElementById("advertisement-form");
const imageUrlInput = document.getElementById("image-url");
const verifyImageButton = document.getElementById("verify-image");
const imageVerification = document.getElementById("image-verification");
const customerNameInput = document.getElementById("customer-name");
const paypalLink = document.getElementById("paypal-link");
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
        imageVerification.textContent = "Please enter the advertisement image URL.";
        return;
    }

    const image = new Image();

    image.onload = function () {
        if (image.naturalWidth !== IMAGE_SIZE || image.naturalHeight !== IMAGE_SIZE) {
            imageVerification.textContent =
                "INVALID IMAGE: The advertisement must be exactly 125×125 pixels.";
            return;
        }

        verifiedImageUrl = true;

        const preview = document.createElement("img");
        preview.src = imageUrl;
        preview.alt = "Advertisement preview";
        preview.width = IMAGE_SIZE;
        preview.height = IMAGE_SIZE;

        imageVerification.textContent =
            "IMAGE VERIFIED: 125×125 pixels.";

        imageVerification.appendChild(document.createElement("br"));
        imageVerification.appendChild(preview);
    };

    image.onerror = function () {
        imageVerification.textContent =
            "IMAGE ERROR: The image could not be loaded from the supplied URL.";
    };

    image.src = imageUrl;
}


/* ---------------------------------------------------------
   PAYPAL LINK
   --------------------------------------------------------- */

function updatePayPalLink() {
    const customerName = customerNameInput.value.trim();

    if (!customerName) {
        paypalLink.href = PAYPAL_BASE + ADVERTISING_PRICE + "USD";
        return;
    }

    /*
     * PayPal.Me amount is prepared here.
     * The customer name is also retained for the order data.
     *
     * The exact PayPal.Me INFO/note URL syntax is not added here
     * until the supported PayPal syntax has been confirmed.
     */
    paypalLink.href = PAYPAL_BASE + ADVERTISING_PRICE + "USD";
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
     * The order is not automatically approved.
     *
     * SMTP submission will be connected here through the secure
     * server-side service once that endpoint is established.
     */

    const order = {
        customer_name: customerNameInput.value.trim(),
        customer_email: document.getElementById("customer-email").value.trim(),
        image_url: imageUrlInput.value.trim(),
        destination_url: document.getElementById("destination-url").value.trim(),
        payment_amount: ADVERTISING_PRICE,
        payment_currency: "USD"
    };

    console.log("Advertisement order prepared:", order);

    submissionStatus.textContent =
        "ADVERTISEMENT PENDING APPROVAL — Your order details are ready for submission.";
}


/* ---------------------------------------------------------
   EVENT HANDLERS
   --------------------------------------------------------- */

verifyImageButton.addEventListener("click", verifyImage);

customerNameInput.addEventListener("input", updatePayPalLink);

imageUrlInput.addEventListener("input", function () {
    verifiedImageUrl = false;
    imageVerification.innerHTML = "";
});

form.addEventListener("submit", submitAdvertisement);

updatePayPalLink();
