# ShutterSnap / FunFotos

A full-stack web app for designing custom photo books. ShutterSnap is a fictional photo-print company with a marketing splash page; **FunFotos** is its web-based photo book builder, where a signed-in user builds a book from their own photo library, flips through it page by page, and edits layout, colors, and images in real time.

Built for **COMP 212: Web Development** (Wheaton College, Fall 2023) by Ethan Perry and Jeffrey Stewart. See `project_description.pdf` for initial project details

## Features

**Splash page (`index.html`)**
- Storefront-style landing page with a product showcase (mugs, framed prints, blankets, calendars, cards) and a sale anchor link
- Login modal over a blurred page; unfinished product links open a "Feature in Progress" notice
- Successful login opens FunFotos with the user's own library

**FunFotos app (`FunFotos.html`)**
- **Build a default book** from a search-filtered subset of the user's photos, with a chosen layout and background color
- **1, 2, 3, or 4 photos per page**, switchable at any time while editing
- **Page-turning book view** with a cover page, two-page spreads, fade transitions, and a page indicator
- **Per-page background color** via a color picker, saved per page
- **Fit to Box** and **Image Borders** toggles
- **Click-to-place editing:** pick a thumbnail, then a slot (or the reverse), with highlighted selection state; remove an image from any slot
- **Live search** over photo metadata (description, date), updating thumbnails on every keystroke, with a "No Results" state
- **Warning dialog** before any destructive reset, plus a built-in FAQ modal
- Disabled-looking upload button, per the spec's "non-working upload" requirement

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3: Flexbox, custom properties, pure-CSS gradient background pattern, viewport-relative sizing |
| Client logic | JavaScript, jQuery 3.7.1 (AJAX, event delegation, animations) |
| Server | PHP (procedural, one small endpoint per action) |
| Database | MySQL via `mysqli` |
| Hosting | LAMP stack on the college's CS server |

## Architecture

```
index.html          Splash page + login
FunFotos.html       Photo book editor
css/                One stylesheet per page
js/                 Client code split by concern
  book.js             build / clear / confirm flow
  images.js           selecting, placing, removing images; borders and fit toggles
  layoutANDfaq.js     layout switching, background color, FAQ modal
  searchANDturn.js    live search, page turning
  load.js             initial load, cover and page rendering
  index.js            splash page modals and login
php/                One endpoint per action (buildBook, updateBook, removeImage, search, ...)
images/             Assets and UI icons
```

The browser holds only UI state. Every meaningful change is saved through a small AJAX call to a PHP endpoint, so the book survives reloads and logouts.

## Design Decisions Worth Highlighting

**1. The book is stored as a flat, ordered list, and pages are computed.**
Each placed photo is a row with an index (`ind`) and a URL. Which photos appear on which spread is calculated from the current photos-per-page value (`2 × perPage × (page − 1) + slot`). That means switching from 2 to 4 photos per page reflows the whole book instantly with no data migration and no rewriting of rows.

**2. Per-user data isolation.**
Each user gets their own set of tables: photo library, book contents, per-page colors, and layout preference. Users can't see or affect each other's books, as the spec required.

**3. Password hashing.**
Credentials are checked with PHP's `password_verify()` against hashed passwords in a `users` table, and the username comparison is case-sensitive (`BINARY`). Passwords are never stored or compared in plaintext.

**4. Event delegation for dynamic content.**
Thumbnails and page slots are injected into the DOM by AJAX, so handlers are bound with `$(document).on("click", ...)` rather than to elements that may not exist yet. This is the conventional jQuery pattern for dynamic UIs, and it avoids re-binding handlers after every render.

**5. A two-way selection model.**
Users can select a thumbnail and then a slot, or a slot and then a thumbnail. Selection is highlighted and toggles off on a second click, which makes placing and swapping photos feel natural without drag-and-drop.

**6. Server-rendered fragments, client-rendered state.**
PHP returns ready-to-insert HTML for thumbnails and page slots, and JSON for page contents. The client stays thin, and each endpoint has a single responsibility.

**7. Safe handling of destructive actions.**
Building over an existing book and clearing a book both go through a confirmation dialog. Empty slots render a transparent placeholder, so a partially filled book never shows broken-image icons.

**8. Search drives both browsing and building.**
The same search used to filter thumbnails also determines which photos go into a newly built book, so there is one mental model for "subset of photos." The page count and per-page color rows are generated from the result size.

**9. Went beyond the spec.**
The brief asked for 1 to 3 photos per page and a hard-coded color dropdown. We shipped 1 to 4 layouts, a full color picker saved per page, fit-to-box and border toggles, an in-app FAQ, and a click-outside-to-dismiss modal.

**10. Organized, separable code.**
Front-end JavaScript is split by responsibility rather than piled into one file, backend endpoints are one-action-per-file, and each page has its own stylesheet.


## Running Locally

Requires a PHP and MySQL environment (e.g. XAMPP or MAMP). Create a database and the tables the endpoints expect (`users`, plus per-user photo, book, color, and layout tables), set connection details in `php/login.php`, and serve the project root.