# UH Consulting — Static Website

Modern static marketing website for **UH Consulting**, a Vancouver-based systems engineering and digital engineering consultancy specializing in outsourced MBSE work using SysML 2.0, with complementary SolidWorks and AutoCAD capabilities.

Built with plain HTML, CSS, and JavaScript — no build step or backend required.

## Project structure

```
/
├── index.html              Home
├── services.html           Services
├── industries.html         Industries
├── case-studies.html       Case studies
├── about.html              About
├── resources.html          Resources
├── contact.html            Contact
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/logo-mark.svg
```

## Run locally

Any static file server works. Examples:

```bash
# Node (npx)
npx serve .

# Python
python -m http.server 8080
```

Then open `http://localhost:8080` (or the port shown).

VS Code **Live Server** extension also works — open the project folder and launch Live Server on `index.html`.

## Deploy

### GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch** → `main` / `/ (root)`.
4. `.nojekyll` is included so GitHub serves static files without Jekyll processing.

For a custom domain (`uh-consulting.ca`), add a `CNAME` file or configure the domain under Pages settings and point DNS to GitHub Pages.

### Netlify

1. Connect the repo or drag-and-drop the project folder.
2. Build command: *(none)*
3. Publish directory: `/` (root)
4. For the contact form, add `data-netlify="true"` to the form in `contact.html` (see comments in that file).

### Cloudflare Pages

1. Connect the repo.
2. Build command: *(none)*
3. Build output directory: `/` (root)

## Contact form integration

The contact form uses client-side validation only. To enable real submissions, update `contact.html`:

- **Formspree**: set `action="https://formspree.io/f/YOUR_ID"` and `method="POST"`.
- **Netlify Forms**: add `data-netlify="true"` and `name="contact"` to the form.
- **Custom backend**: POST to your API endpoint and adjust `assets/js/main.js` accordingly.

## License

© UH Consulting. All rights reserved.
