# Urdu corrections

How `assets/data/urdu/*.json` was made from the online Jawadi Urdu (api.alquran.cloud, `ur.jawadi`):

1. `rules.py`: general rules for the encoding glitches in the online text (for example `اللرُ` → `اللہ`,
   `مفِدہ` → `مردہ`, `ً` used as a comma, Arabic `ه` used as the izafat mark).
2. `verses.py`: verse-by-verse corrections that match the Roman Urdu, plus whole-verse replacements
   (5:110 note, the split verses 38:39–40 and 44:27–28, the truncated 55:30).

To add a correction, add it to `verses.py` and to the Roman Urdu file, and record it in
`docs/roman-urdu-review-notes.md`.
