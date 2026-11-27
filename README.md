# Crystal Clean Services website

Static site for GitHub Pages. No build step.

Live address: https://dmbennison.github.io/Crystal-Clean/

1. Upload everything in this folder to the root of the `main` branch of the `Crystal-Clean` repo
   (include the hidden `.nojekyll` file).
2. Repo Settings > Pages > Deploy from branch > `main` / root.
3. Add the site to Google Search Console (URL prefix) and Bing Webmaster Tools, then submit
   https://dmbennison.github.io/Crystal-Clean/sitemap.xml
4. When you buy a domain: add a `CNAME` file containing the domain, point DNS at GitHub Pages,
   and replace `https://dmbennison.github.io/Crystal-Clean` with the new address in
   index.html, robots.txt, sitemap.xml, llms.txt and every page in `areas/` (each has its address in the canonical link,
   the social-sharing tags and the structured data; a find-and-replace across the whole folder does it).

## Enquiry form (sends encrypted enquiries into the Round Book app)

The form in the "Send us an enquiry" section stays hidden until it is set up, so the site works as before until then.
Each enquiry is encrypted in the visitor's browser with a public key, and only the Round Book app can read it.

1. **Update the Cloudflare worker** with the newest `worker.js` (it gains the enquiry inbox) and Deploy.
2. **Turnstile (stops bots, free):** Cloudflare dashboard > Turnstile > Add widget. Hostname `dmbennison.github.io`
   (add your own domain too when you buy one). Copy the **Site key** and the **Secret key**.
   - Worker > Settings > Variables and Secrets > add a **Secret** called `TURNSTILE_SECRET` with the secret key.
   - The site key goes in `enquiry-config.js` (step 4).
3. **Round Book:** Sales > Enquiries > Set up website enquiries, then **Copy settings for the website**.
4. **GitHub:** open `enquiry-config.js` in this folder, replace everything with what you copied, put the Turnstile site key
   between the quotes after `turnstileSiteKey:`, and commit. The form appears on the site a minute or so later.
5. If the worker has `ALLOWED_ORIGIN` set, it must include this website's address (and your domain later), separated by commas.

When you buy a domain, also add it to the Turnstile widget's hostnames and to `ALLOWED_ORIGIN`.

**Important:** `enquiry-config.js` holds your own settings (the inbox and the public key from Round Book, and the Turnstile site
key). It is left out of the zips of website updates so that uploading an update can't overwrite it. If the enquiry form ever
disappears from the site, that file has been replaced by the empty one: copy the settings again from Round Book (Sales >
Enquiries > the cog > Website settings > Copy settings for the website), paste them over everything in the file, and put the
Turnstile site key back between the quotes.

## Area pages

Every area has its own page, linked from the "Areas" section of the home page and listed in `sitemap.xml` and `llms.txt`:

| Page | Postcodes |
|---|---|
| `areas/south-tyneside/` | NE31–NE36, SR6 |
| `areas/south-shields/` | NE33, NE34 |
| `areas/jarrow/` | NE32 |
| `areas/hebburn/` | NE31 |
| `areas/cleadon/` | SR6 (Cleadon is SR6 7; Cleadon Park is NE34 and is on the South Shields page) |
| `areas/boldon/` | NE35, NE36 |
| `areas/washington/` | NE37, NE38 |
| `areas/newcastle/` | NE1–NE7, NE12, NE13, NE15 |
| `areas/sunderland/` | SR1–SR6 |
| `areas/seaham/` | SR7 |
| `areas/murton/` | SR7 (Murton is SR7 9) |

- `areas/area.css` and `areas/area.js` are shared by all the pages. The look is the same as the home page.
- Each page shows its postcodes in the heading area, the page title and a table of the places in each postcode district.
  The districts and places come from Royal Mail postcode district listings.
- The special offer banner (set from Round Book) shows on the area pages too, and the "Get a free quote" buttons take the visitor
  to the home page's enquiry form with their area already chosen. Both use `enquiry-config.js` in the main folder, so there is
  nothing extra to set up. Without it, the buttons go to the contact box on the page.
- The enquiry form's area list (the dropdown on the home page) is unchanged, so enquiries still arrive in Round Book with the
  same area names.
- **Check the postcode lists match where you really work**, especially Newcastle and Sunderland, which are big. Anything you
  don't cover should be taken out of that page's table, its postcode badges and its page title.

## Change log

- **2026-11-27** Added a page for each area (11 in all) with its postcodes, and added the postcodes to the area tiles on the home
  page (the tiles now link to the pages). Sitemap and `llms.txt` list the new pages. The enquiry form can now start with an
  area already chosen (`?area=Jarrow`), which the area pages' quote buttons use.
