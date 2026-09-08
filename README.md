# aeastecology.github.io

Personal academic site for Alyson East. Plain HTML and CSS, no build step, no
dependencies. Hosted free on GitHub Pages.

## Pages

| File | What it is |
|------|------------|
| `index.html` | Home: about, selected highlights, research overview, full news feed, contact |
| `publications.html` | Full publication and conference-paper list |
| `teaching.html` | Teaching philosophy, courses (from CV), and mentorship |
| `research-forest-scaling.html` | In-depth project page, with live metrics |
| `research-beetles.html` | In-depth project page, with live metrics |
| `style.css` | All styling for every page (edit once, changes everywhere) |
| `assets/` | Images and files (CV PDF, photos, gallery images) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

Navigation: **About · Research · Publications · Teaching · News · Contact**.
About, Research, News, and Contact are sections of the home page; Publications and
Teaching are their own pages; the two project pages are reached from the Research
section on the home page.

---

## Put it online (one time)

The cleanest URL comes from a **user site** repo named after your GitHub account.

1. On GitHub, create a new **public** repo named exactly **`AlysonEast.github.io`**.
2. Upload every file in this folder to the repo root:
   - **Web:** repo → *Add file* → *Upload files* → drag everything in → *Commit*.
   - **Command line:**
     ```bash
     cd site
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/AlysonEast/AlysonEast.github.io.git
     git push -u origin main
     ```
3. Repo → *Settings* → *Pages* → *Source* = **Deploy from a branch**, branch
   **main**, folder **/ (root)**, *Save*.
4. After about a minute the site is live at **https://alysoneast.github.io**.

Custom domain later? *Settings → Pages → Custom domain* walks you through the DNS.

---

## Updating the site

Every update is editing a text file and committing. Edit on github.com (pencil
icon) or locally then `git push`.

### Add a news item
On `index.html`, find the month inside the `id="news"` section, copy one
`<li>…</li>`, paste it at the **top** of that month, and edit the text.

**Bold a key phrase** the way the feed already does by wrapping it in `<strong>`:
```html
<li>Delivered an <strong>invited talk</strong> at the ESA Annual Meeting.</li>
```
Keep it to one bold phrase per item so the emphasis stays meaningful. New months
or years follow the pattern already in the file (`<h3 class="news-year">` for a
year, `<div class="news-month">` for a month).

### Add a publication
On `publications.html`, find the year's `<ul class="pub-list">` and copy an entry:
```html
<li>
  <span class="pub-authors">Author, A., <span class="me">A. East</span>, et al. (2026).</span>
  <span class="pub-title">Title of the paper.</span>
  <span class="pub-venue">Journal Name.</span>
</li>
```
`<span class="me">` bolds your name. Wrap the content in `<a href="…">…</a>` to link it.

### Add a course or mentee
On `teaching.html`, copy a `<div class="course">` block (title, a
`<div class="role-line">` for role · level · years, and a description), or a
`<div class="mentor">` block under Mentorship.

### Add your CV
Drop a PDF at `assets/cv.pdf`, then add a CV link to the nav on each page:
```html
<a href="assets/cv.pdf">CV</a>
```

---

## The live metrics on the project pages

Each project page shows an **Altmetric** attention badge (the coloured donut) and
a **Dimensions** citation count. These are official embed widgets: they load live
numbers in the visitor's browser based on a paper's DOI. Two things make them work:

1. The badge element carries the DOI, e.g.
   ```html
   <div class="altmetric-embed" data-doi="10.1111/2041-210X.70140" data-badge-type="donut"></div>
   <span class="__dimensions_badge_embed__" data-doi="10.1111/2041-210X.70140" data-style="small_circle"></span>
   ```
2. Two script tags at the bottom of the page load the widgets (already included):
   ```html
   <script async src="https://badge.dimensions.ai/badge.js"></script>
   <script async src="https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js"></script>
   ```

**To feature a different paper**, change the `data-doi` values to that paper's DOI.
**To add another paper's metrics**, copy a whole `<div class="metric">` block and
give it the new DOI. A badge only appears once the DOI is indexed by the service,
so brand-new papers may show nothing for a little while, and a paper with no online
attention yet will show an empty Altmetric donut — that's expected.

The **downloads figure** (e.g. "13,000+") is a plain number you type in, not a live
badge. Update it by editing the `<div class="metric-num">` value when it changes.

> Note: the metric badges do not render in a local file preview or in the editor —
> they only populate once the page is served over the web (including GitHub Pages).

---

## Photos

The site never shows a broken image: any missing photo simply hides itself.

### Project page banner
Add `assets/beetles-hero.jpg` or `assets/forest-hero.jpg` and it appears at the top
of that project page automatically (wide 21:9 crop looks best).

### Project galleries
1. Put square images in `assets/beetles/` (or `assets/forest/`), named `01.jpg`,
   `02.jpg`, and so on.
2. In the project page, delete the `<!--` and `-->` around the `<div class="gallery">`
   block and adjust the filenames/count.

### Home page portrait (optional)
To place a photo beside your bio, add `assets/portrait.jpg`, then in `index.html`
change the hero's `<div class="wrap hero-inner">` to `<div class="wrap hero-grid">`
and add, before its closing `</div>`:
```html
<div><img class="hero-photo" src="assets/portrait.jpg" alt="Alyson East in the field"></div>
```

### Moving your Wix photos over
Run this on your own machine (Wix images can be hotlink-blocked elsewhere), then
commit the files:
```bash
mkdir -p assets/beetles assets/forest
curl -L -o assets/portrait.jpg "PASTE_WIX_IMAGE_URL"
```
Right-click any image on your current Wix site → *Copy image address* for the URL.

---

## Preview locally
```bash
cd site
python3 -m http.server 8000
# open http://localhost:8000
```

## Change the whole look
Colours and fonts are defined once at the top of `style.css` under `:root`
(`--paper`, `--ink`, `--accent`, `--serif`, `--sans`). Change a value there and it
updates across every page.
