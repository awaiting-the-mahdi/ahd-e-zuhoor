# AHD-E-ZUHOOR on Google Play

Everything needed to publish the website as an Android app, built as a Trusted Web
Activity (TWA): the app opens the live website full-screen, so every change to the
site appears in the app at once, with no new app release.

## Files in this folder

| File | Use in the Play Console |
|---|---|
| `screenshots/01-home.png` … `08-marefat.png` | Phone screenshots (1080 × 1920). Use 4–8. |
| `feature-graphic.png` | Feature graphic (1024 × 500). |
| `../../assets/icons/icon-512.png` | App icon (512 × 512). |
| `feature-graphic.html` | Source of the feature graphic, to change it later. |

A real screenshot of the Prophetic Blueprint from a phone will look better than
`05-prophetic-blueprint.png` (that one was rendered without a graphics card).

## Steps

Who does each step is marked: **You**, or **Claude** (in a session on this repo).

1. **You:** buy the domain (e.g. from Namecheap, Cloudflare or Porkbun), then tell Claude its name.
2. **Claude:** move the site to the domain: a `CNAME` file, the Ask Zahra worker's allowed
   origins (`ALLOWED_ORIGINS` in both `wrangler.toml` files), the few links that name
   `awaiting-the-mahdi.github.io`, and a `.well-known/` folder that GitHub Pages will publish.
3. **You:** at the domain seller, add the DNS records GitHub gives for custom domains
   (four `A` records for the bare domain, and a `CNAME` for `www` pointing to
   `awaiting-the-mahdi.github.io`). Then in GitHub: repo **Settings → Pages → Custom domain**,
   enter the domain, wait for the check, and tick **Enforce HTTPS**.
4. **You:** redeploy the Ask Zahra worker on Cloudflare so it accepts the new address
   (Cloudflare rebuilds it from the repo; check that the build succeeds).
5. **You:** create a Google Play developer account (one-time US$25, with identity
   verification) at <https://play.google.com/console>.
6. **You:** build the Android package at <https://www.pwabuilder.com>: enter the new address,
   choose **Package for stores → Android**, and use:
   - Package ID: `com.ahdezuhoor.app` (it can never change after the first upload)
   - App name: `Ahd-e-Zuhoor`, launcher name: `Ahd-e-Zuhoor`
   - Signing key: **Create new**. Download the zip and **keep the signing key file and its
     passwords safe and private** (never put them in this repo). Losing them means you cannot
     update the app.
7. **You:** in the Play Console, create the app, fill in the listing (below), and upload the
   `.aab` file from the zip to **Internal testing** first.
8. **You → Claude:** in the Play Console, open **Setup → App integrity → App signing** and copy the
   **SHA-256 certificate fingerprint** of the *App signing key*. Send it to Claude, who adds
   `.well-known/assetlinks.json` with it (and the one in PWABuilder's zip, for your own key).
   Without this file the app works but shows a browser bar at the top.
9. **You:** test the internal build on a phone, then promote it to **Production** and submit for review.

## Store listing

**App name** (30 characters max): `Ahd-e-Zuhoor: Imam of Our Time`

**Short description** (80 max):
> Know the Imam of our time: Qur'an, duas, books and courses in English and Urdu.

**Full description:**
> AHD-E-ZUHOOR is a guided journey of knowledge towards recognising the Imam of our time,
> Imam al-Mahdi (ATFS). It is free, with no adverts and no accounts, in English, Urdu and Roman Urdu.
>
> • Who is Imam al-Mahdi: his life, the occultation, and our duties in this era, with a family tree back to Adam (a.s.).
> • The Qur'an: every surah with Arabic in Indo-Pak and Uthmani script, English, Urdu and Roman Urdu translations, five reciters, tajweed colours, memorisation and recitation practice.
> • Duas & Hadiths: Dua al-'Ahd, al-Faraj, Nudba, Ziyarat Aal-e-Yasin and more, with translations and sources; hadiths about the Imam and in his own words.
> • Prophetic Blueprint: a sky of 124,013 stars, showing how the prophets (a.s.) and the Fourteen Infallibles are reflected in the Imam, quoted from the books.
> • Knowledge Library: Kamal al-Din, al-Ghayba, Mikyal al-Makarim, Hayat al-Qulub and more, with chapter summaries and the full books.
> • Learning Academy: schools of Theology, Fiqh (according to Ayatullah al-Sistani), the Qur'an and Marefat, and language courses in Arabic, Persian, Urdu and English with Zahra and Ali.
> • Research Archive: the Imam's letters, the four deputies, the signs of the reappearance and the sacred places.
> • Ask Zahra: ask a fiqh question; she explains Ayatullah al-Sistani's published answers from sistani.org with a link to the source. Not a fatwa.

**Urdu listing** (add under *Store presence → Main store listing → Manage translations → Urdu*):
- App name: `عہدِ ظہور: معرفتِ امامِ زمانہ`
- Short description: `امامِ زمانہ (عج) کی معرفت: قرآن، دعائیں، کتابیں اور کورس، اردو اور انگریزی میں۔`
- Full description: translate the English above, or ask Claude for it.

**Category:** Education. **Tags:** Education, Religion & spirituality (choose the closest offered).
**Contact email:** required by Google and shown publicly (the same address as the site's Contact).
**Privacy policy URL:** `https://<your-domain>/pages/about.html#privacy`

## App content answers (Play Console → Policy → App content)

These match what the site does today (see the privacy section of `pages/about.html`).
Check them again if the site changes.

- **Ads:** No.
- **App access:** All functionality is available without special access (no login).
- **Target audience:** 13–15, 16–17 and 18+ (not under 13). The app is not designed for children,
  though families may use it together. Do not tick "appeals to children" options.
- **Content rating questionnaire:** Category *Reference, News, or Educational*. No violence,
  sexual content, profanity, drugs or gambling. User interaction: users can send questions to
  Ask Zahra, which are not shared with other users (answer "No" to sharing user content between users).
- **News app:** No. **Government app:** No. **Financial features:** None. **Health:** No.
- **Data safety:**
  - *Does the app collect or share user data?* **Yes**, it collects (it does not share).
  - **App activity → Other user-generated content** (the question typed into Ask Zahra):
    collected, **processed ephemerally** (the question text is not stored), not shared,
    required for that feature, purpose **App functionality**.
  - **App info and performance → Diagnostics**: technical records of each Ask Zahra answer
    (language, search words, sources used, time taken), purpose **App functionality** /
    **Analytics** (answer quality), not linked to the user.
  - Abuse prevention uses a scrambled, daily-changing code made from the connection; no IP
    address is stored. Google does not ask for this separately; it is covered by the privacy policy.
  - **Location, Audio:** not collected by the app. The Qibla compass uses the location only on the
    phone; Qur'an *Recite* uses the phone's own speech recognition (Google's, on Android), and the
    tajweed recordings stay on the phone.
  - **Data is encrypted in transit:** Yes (HTTPS). **Users can request deletion:** nothing
    personal is stored; say so, or point to the contact email.

## Before each review

Google reviewers open every section. Check that Ask Zahra answers (the Cloudflare worker is
running) and that the privacy page is reachable at the URL given above.
