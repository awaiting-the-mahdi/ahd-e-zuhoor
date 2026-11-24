# Moving the site to Cloudflare Pages, a private repository and your own domain

Do the steps in this order: the site stays online the whole time.

## 1. Buy the domain (Cloudflare)
1. Log in at <https://dash.cloudflare.com> (the account Ask Zahra runs on).
2. **Domain Registration → Register Domains**, search a name (e.g. `ahdezuhoor`), choose one, **Purchase**.
3. Tell Claude the domain name.

## 2. Create the Cloudflare Pages site
1. **Workers & Pages → Create → Pages → Connect to Git**.
2. Connect GitHub when asked, and give Cloudflare access to the repository **awaiting-the-mahdi/ahd-e-zuhoor**
   (choose "Only select repositories"; this access keeps working after the repository becomes private).
3. Settings:
   - Project name: `ahd-e-zuhoor`
   - Production branch: `main`
   - Framework preset: **None**
   - Build command: `sh tools/build-site.sh`
   - Build output directory: `_site`
4. **Save and Deploy**. When it finishes, open the `….pages.dev` address it shows and check the site.
   (Ask Zahra will refuse to answer there until step 4.)

## 3. Put the domain on the site
1. In the Pages project: **Custom domains → Set up a custom domain**, enter the domain (e.g. `ahdezuhoor.com`), **Activate**.
2. Repeat for `www.` + the domain. Cloudflare adds the DNS records itself, because the domain is in the same account.
3. Wait until both show **Active** (usually a few minutes).

## 4. Ask Zahra on the new address (Claude, then you)
- **Claude:** adds the domain and the `pages.dev` address to `ALLOWED_ORIGINS` in both `wrangler.toml` files,
  and changes the links that name `awaiting-the-mahdi.github.io`.
- **You:** merge that change. Cloudflare rebuilds the Ask Zahra worker from the repository; check under
  **Workers & Pages → ahd-fiqh-assistant → Deployments** that the newest build succeeded, then ask Zahra a question on the new domain.

## 5. Make the repository private (GitHub)
Only after the site works on the new domain:
1. GitHub → the repository → **Settings → General → Danger Zone → Change visibility → Make private**.
2. **Settings → Pages**: GitHub Pages stops on a private repository on the free plan. The old address
   `awaiting-the-mahdi.github.io/ahd-e-zuhoor/` will stop working; people who installed the app from it
   need to reinstall from the new domain (there is no app in the store yet, so this affects few people).
3. Do the same for **ahad-e-zuhoor-preview** and **imam-zamana** (make private, or delete if no longer needed).

Claude's access to the repository is not affected by making it private.

## What stays private and what is public
- **Public** (anyone can save it from their browser, as with every website): the pages, scripts, styles,
  images, audio and books in `index.html`, `pages/`, `assets/`, `manifest.webmanifest`, `sw.js`.
- **Private** once the repository is private: the history, `tools/`, `docs/`, the Ask Zahra worker's code
  (`fiqh-assistant-worker/`) and this guide. `tools/build-site.sh` leaves them out of the published site.
- **Never in the repository:** passwords and API keys. Ask Zahra's keys are stored only in Cloudflare.
