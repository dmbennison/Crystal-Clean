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
   index.html, robots.txt, sitemap.xml and llms.txt.

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
