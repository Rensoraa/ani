# DBD 10th Anniversary Cake & Item Tracker

A simple static site me and some friends use to track cakes and item counts during the Dead by Daylight 10th Anniversary event. Nothing fancy, just a page we can check without having to dig through screenshots or ask each other in chat every five minutes.

---

## What it does

Two tables - one for Kevin's group, one for mine - showing how many cakes, flashlights, medkits, and toolboxes each survivor has accumulated. There's a 5-second loading screen when you open the page because we thought it was fun, and the tables start glowing red if the totals hit certain milestones. The higher the milestone, the more unhinged the effect gets.

---

## Files

```
index.html   - the page itself
style.css    - all the styling (dark/red DBD theme)
scripts.js   - loader logic + milestone detection
README.md    - this file
```

That's it. No build step, no dependencies, no npm install. Just open `index.html` in a browser.

---

## Milestone effects

The effects kick in based on the **total** of all numbers in a given table:

| Range       | What happens                                              |
|-------------|-----------------------------------------------------------|
| 100 – 300   | Subtle red glow around the table                          |
| 400 – 600   | Pulsing border, a bit more intense                        |
| 700 – 900   | Scanline overlay + stronger flickering glow               |
| 1,000       | Full aura, scanlines, table header gets dramatic          |
| 2,000–5,000 | Increasingly unhinged - screen-bleeding red, flicker, hue shift |

Individual cells that land exactly on a milestone number (100, 200, 300, etc.) also get highlighted separately from the table-wide effect.

---

## Updating stats

The data is hardcoded in `index.html` inside the `<tbody>` tags. Each cell looks like this:

```html
<td class="stat-cell" data-val="72">72</td>
```

Change both the `data-val` attribute and the number between the tags to update a stat. The milestone effects recalculate automatically when the page loads.

To add a new survivor row, copy an existing `<tr>...</tr>` block and update the name and values.

---

## Hosting

The page is hosted on GitHub Pages at [ani.rensora.online](https://ani.rensora.online) - just push to main and it updates.
To host one yourself, fork this repo, and edit the index.html

---

## Notes

- Respects `prefers-reduced-motion` - all animations are disabled for people who need that
- No data is stored anywhere, no backend, no cookies. It's a static page.
- The font is Cinzel + Share Tech Mono loaded from Google Fonts, so it needs an internet connection to look right (falls back to serif/monospace otherwise)

---

*Dead by Daylight is a trademark of Behaviour Interactive. This is a fan-made tracker, not affiliated with or endorsed by Behaviour Interactive in any way.*