# SAPHAH ADVERTISING SERVICE

Saphah Advertising Service (SAS) is a low-cost 125×125 advertising placement service operated as part of SCSS6027.

The service provides fixed 125×125 advertising placements in the Saphah Advertising Directory.

SAS sells **advertising placement only**.

It does not promise or guarantee traffic, clicks, visitors, sales, conversions, or any other advertising result.

---

## DIRECTORY

The main directory is a responsive advertising grid containing up to:

**6 columns × 8 rows = 48 advertising positions**

Advertisements remain at their original **125×125 pixel** size.

The grid may scroll vertically when required.

The first six advertising positions are always the first row of the directory.

The directory uses `advertisers.json` as its advertising record.

---

## CUSTOMER / AD NUMBERING

A single permanent numbering system is used.

Customer numbers and advertisement numbers are never reused.

| Customer | Advertisement | Purpose                         |
| -------- | ------------: | ------------------------------- |
| `000000` |           `0` | Filler/template record          |
| `000001` |          `#1` | ADVERTISE HERE NOW              |
| `000002` |          `#2` | THE TRAFFIC PLATFORM            |
| `000003` |          `#3` | First external paying customer  |
| `000004` |          `#4` | Second external paying customer |
| etc.     |          etc. | Further customers               |

### Customer `000000`

`000000` is not a customer and does not occupy a permanent advertising number.

It is the standard filler record used whenever an available advertising position has no active advertisement.

The directory may use the `000000` record or its associated asset when displaying:

**YOUR AD HERE**

---

## PERMANENT ADVERTISEMENTS

### AD #1 — CUSTOMER `000001`

**ADVERTISE HERE NOW**

This is the permanent SAS sales advertisement.

It:

* Always appears first.
* Is always active.
* Is never cancelled.
* Is always clickable.
* Leads to the SAS advertising information/request page.

### AD #2 — CUSTOMER `000002`

**THE TRAFFIC PLATFORM**

This is a permanent Saphah advertisement promoting The Traffic Platform and its associated email services.

It:

* Is always active.
* Is never cancelled.
* Is part of the same numbering system.
* Is always clickable.

---

## EXTERNAL CUSTOMER ADVERTISEMENTS

External customer advertisements begin at:

**CUSTOMER `000003` / AD #3**

Each customer supplies:

1. A link to their 125×125 JPG advertisement.
2. A link to the website or page that the advertisement should open.

Saphah Central does not need to host the customer's advertisement image.

The JPG may already be hosted by another advertising or traffic-exchange service.

Google Drive or OneDrive may also be used, provided the file is shared as:

**Anyone with the link — Viewer**

---

## ADVERTISEMENT STATUS

External advertisements use their record status to determine whether they appear in the live directory.

Typical statuses include:

* `pending`
* `active`
* `cancelled`

Only active advertisements are displayed.

The two permanent advertisements use:

**`permanent`**

Cancelled advertisements remain in `advertisers.json` as historical records.

A cancelled advertisement is skipped by the directory and is not replaced by a newly assigned customer number.

---

## CANCELLED ADVERTISEMENTS

Customer numbers are never reused.

For example, if:

* AD #16 is active
* AD #17 is cancelled
* AD #18 is active

the directory displays:

**#16 → #18**

It does not display #17.

If the next new customer arrives, that customer receives the next unused number:

**#19**

not #17.

After an advertisement is cancelled, its customer email address may be removed from the JSON record while the historical advertising record itself remains.

---

## FILLER POSITIONS

After all active advertisements have been rendered, remaining positions are filled with:

**YOUR AD HERE**

The filler does not require a separate database record for every empty position.

The directory code can simply use the `000000` filler record whenever an advertising position has no active advertisement.

---

## VISUAL DESIGN

The directory is intentionally minimal.

### Header

* Text only.
* Maximum font size: **24px**.
* No large logo.
* No banner.
* No navigation bar.

### Background

Primary page background:

**Cornsilk / Corn**

Suggested colour:

`#FFF8DC`

### Typography

* Primary text: black.
* Secondary text: grey.
* Links: blue.

### Advertisements

Every advertisement remains exactly:

**125×125 pixels**

Clickable advertisements have a **blue border**.

Non-clickable filler advertisements do not have a blue link border.

Customer artwork is not modified, recoloured, filtered, enlarged, or otherwise altered.

### Footer

The footer remains small and unobtrusive.

It provides links to:

* Saphah Central index page
* Customer Care index page

---

## PAGES

### Page 1 — Advertising Directory

`index.html`

Displays the active 125×125 advertising directory.

The first six positions are immediately visible on a normal desktop display.

The directory is responsive and may reduce the number of columns on narrower screens while retaining the 125×125 advertisement size.

### Page 2 — Advertise Here Now

`advertise.html`

Explains the advertising service and allows prospective customers to submit:

* Their 125×125 advertisement image URL.
* Their destination URL.

Payment is made through PayPal.me.

### Page 3 — Information

`info.html`

Optional service information page.

A small, unobtrusive link may be placed beneath the directory header.

The information page may explain the service, advertising placement, cancellation, and limitations without cluttering the main directory.

---

## PAYMENT

PayPal.me is used as the primary payment mechanism.

Each advertising request receives a unique request/advertisement reference so that the submitted advertisement details can be matched with the corresponding payment.

The customer's email address does not need to be collected through the advertising form if it can be obtained from the PayPal payment.

Payment must be verified before an external advertisement is activated.

---

## REQUEST RECORDS

Advertising requests are stored separately from the main advertising directory records.

The request directory is:

`/requests/`

The permanent placeholder file:

`/requests/000000.md`

is a filler/template record only.

`000000.md` must never be processed as a real customer request.

Future request records will use the corresponding customer/request numbering system.

---

## ADVERTISERS.JSON

`advertisers.json` is the main advertising record.

It contains the permanent advertisements, external customer advertisements, and cancelled advertising history.

Typical fields include:

* `customer_id`
* `ad_number`
* `name`
* `email`
* `image`
* `url`
* `status`
* `created`
* `cancelled`
* `request_id`
* `payment_reference`

The public directory uses this data to determine which advertisements should currently be displayed.

---

## CUSTOMER EMAIL

The customer email address is operational information rather than a public advertising field.

It may be retained while an advertisement is active so the customer can be identified if the advertisement is cancelled.

When a customer cancels:

1. The record status is changed to `cancelled`.
2. The cancellation date is recorded.
3. The customer email address may be removed.
4. The historical record remains.
5. The customer number remains permanently retired.

---

## EXTERNAL HOSTING

SAS does not require customers to upload their advertisement JPG to the SAS repository.

Customers may provide an externally hosted image.

If Google Drive or OneDrive is used, the file must be accessible as:

**Anyone with the link — Viewer**

The supplied image URL must be suitable for direct display as the 125×125 advertisement.

---

## GITHUB

SAS is designed as a lightweight GitHub-based service.

The public website can be hosted using GitHub Pages.

Internal processing and notification can be handled through GitHub repository mechanisms and GitHub Actions where appropriate.

Sensitive credentials and secrets must not be committed to the public repository.

---

## SERVICE PRINCIPLE

SAS sells a place for an advertisement to be displayed.

It does not sell guaranteed performance.

No promise is made regarding:

* Traffic
* Clicks
* Visitors
* Leads
* Sales
* Conversions
* Search-engine ranking
* Advertising results

The customer purchases the advertising placement itself.

---

## PROJECT STRUCTURE

The initial project structure is:

```text
/
├── index.html
├── advertise.html
├── info.html
├── style.css
├── advertisers.json
├── README.md
├── assets/
│   ├── .nomedia
│   ├── ad-000000.jpg
│   └── ad-000001.jpg
└── requests/
    └── 000000.md
```

`info.html` may be omitted from the initial release if Page 3 is not activated.

The temporary `/assets/.nomedia` file is only required during initial asset preparation and may be removed after the permanent advertising assets have been uploaded.

---

## SCSS6027

Saphah Advertising Service is part of the SCSS6027 service family.

**SAS — Saphah Advertising Service**

is intended to operate alongside:

**SES — Saphah Email Services**

SAS uses its own lightweight internal JSON advertising record rather than the SES/Firefox-based data architecture.

---

## FUTURE ADVERTISING ROTATION

Once SAS is operational, it may be added to the Monday Saphah Central advertising rotation:

**MONDAY**

1. RHODESIAN MEMORIES
2. SEEKERS HUB
3. 125×125 ADVERTISING DIRECTORY

This is a future addition and does not affect the operation of the SAS directory itself.

```
```
