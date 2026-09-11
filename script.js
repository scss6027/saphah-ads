const MAX_ADS = 48;
const FILLER_IMAGE = "https://scss6027.github.io/saphah-ads/assets/SAS000000.png";

async function loadAdvertisements() {
    const directory = document.getElementById("ad-directory");

    try {
        const response = await fetch("advertisers.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Unable to load advertisers.json");
        }

        const data = await response.json();
        const advertisers = data.advertisers;

        const activeAds = advertisers
            .filter(ad =>
                ad.status !== "cancelled" &&
                ad.status !== "CANCELLED" &&
                ad.status !== "deleted" &&
                ad.status !== "DELETED" &&
                ad.status !== "filler"
            )
            .sort((a, b) => Number(a.ad_number) - Number(b.ad_number));

        const adsToDisplay = activeAds.slice(0, MAX_ADS);

        directory.innerHTML = "";

        adsToDisplay.forEach(ad => {
            addAd(ad);
        });

        while (directory.children.length < MAX_ADS) {
            addFiller();
        }

    } catch (error) {
        console.error(error);

        directory.innerHTML = "";

        for (let i = 0; i < MAX_ADS; i++) {
            addFiller();
        }
    }
}

function addAd(ad) {
    const slot = document.createElement("div");
    slot.className = "ad-slot";

    const image = document.createElement("img");
    image.src = ad.image;
    image.alt = ad.name || ("Advertisement #" + ad.ad_number);
    image.width = 125;
    image.height = 125;

    if (ad.url) {
        const link = document.createElement("a");

        link.href = ad.url;
        link.className = "ad-linked";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        link.appendChild(image);
        slot.appendChild(link);
    } else {
        slot.appendChild(image);
    }

    directory.appendChild(slot);
}

function addFiller() {
    const slot = document.createElement("div");
    slot.className = "ad-slot filler";

    const image = document.createElement("img");
    image.src = FILLER_IMAGE;
    image.alt = "YOUR AD HERE";
    image.width = 125;
    image.height = 125;

    slot.appendChild(image);

    document.getElementById("ad-directory").appendChild(slot);
}

loadAdvertisements();
