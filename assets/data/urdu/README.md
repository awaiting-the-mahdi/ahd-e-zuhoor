# Urdu translation (per surah)

Allama Syed Zeeshan Haider Jawadi's Urdu translation, from the online text (api.alquran.cloud / Tanzil),
with that text's typing and encoding errors corrected and the same corrections that were made in the
Roman Urdu (`../roman/`). Every change is listed in `docs/roman-urdu-review-notes.md`.

One file per surah: `N.json` is a JSON array with one string per verse, in order. The Qur'an school
loads the file for the surah being opened and falls back to the online text if the file can't be loaded.
