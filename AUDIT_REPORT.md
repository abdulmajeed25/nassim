# Nassim Project — Audit Report (Take 2)

**Date:** 2026-06-04
**Repo:** abdulmajeed25/nassim
**Pre-audit HEAD:** `f48b965` — *Remove ice from favicon, use clean N, and add cache busting to index.html*
**Post-audit HEAD:** `c0c149a` — *seo: add &lt;noscript&gt; fallback so the static HTML carries indexable content*
**Auditor:** Claude Code (autonomous, scoped)
**Scope:** SEO + indexability hardening on the current production snapshot. No source restoration, no rebuilds, no remote pushes.

---

## 0. Confirmation of clean baseline

The session started by deleting any local `nassim/`, `nassim-deploy-staging/`, and prior session zip artifacts, then cloning fresh from `origin/main`. The very first commit on `HEAD` was verified to be `f48b965` *"Remove ice from favicon, use clean N, and add cache busting to index.html"* by *AIAssistant* on *2026-06-04 01:05:16 +0300* — the user's force-pushed production snapshot, NOT any "restore source tree" / "build: commit dist/" / "feat: restore" commit. The reflog confirms the only operations performed in this session were `clone`, `commit` (×2), and read-only inspection: no `git checkout <old-commit>`, no `git show <old>:file`, no `git reset --hard`, no `git revert`, no `git rebase`, no `git cherry-pick`, no `git restore --source`, and no `git push`. The working tree is clean at the end of the session.

---

## 1. Stack Summary

- **Project type:** Pure static deployed snapshot. No `package.json`, no `vite.config.*`, no `next.config.*`, no `tsconfig.json`, no `src/`, no `node_modules/`. The pre-built React/Vite bundle at `assets/index-v9.js` is served as-is. The repo IS the deploy artifact.
- **Tracked files at HEAD:** started at 25; ended at 16 after the user approved deletion of 5 legacy bundles and 5 stale data JSON files. One existing file modified across this audit (`index.html`); one file added (`AUDIT_REPORT.md`); ten files deleted with explicit user approval (per mission rule #5).
- **Live host (out-of-band info):** Hostinger / LiteSpeed / hPanel. `.htaccess` is honored natively; redirect logic verified live.
- **SEO assets present:** `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.jpg`, `technician_main.jpg`, `google602bc385b96202b6.html` (GSC verification), full OG + Twitter Card + canonical + meta robots + meta description + meta keywords + viewport + charset in `index.html`.
- **SEO assets ADDED by this audit:** one `<script type="application/ld+json">` block (Organization + LocalBusiness + WebSite) and one `<noscript>` fallback block. Both inside `index.html`. Nothing else touched.
- **Cache-busting:** `?v=3` query string on `/favicon.svg` references preserved exactly.

---

## 2. Issues Found

| ID | Area | Sev | Finding | Fix-allowed | Final status |
|---|---|---|---|---|---|
| F-001 | Structured data | **P1** | No JSON-LD anywhere — missed eligibility for LocalBusiness / Organization / WebSite rich results. | YES (ALLOWED EDIT #2) | ✅ FIXED in `19de448`; 8 `TODO_VERIFY` placeholders left for user to fill. |
| F-002 | SPA render delay | **P1** | Initial 3.8 KB HTML carries empty `<div id="root">`; static `<h1>` = 0. Googlebot defers SPA pages in render queue → indexing latency. | YES (ALLOWED EDIT #3) | ✅ MITIGATED in `c0c149a`; `<noscript>` fallback uses only existing `<title>` + `<meta description>` text + canonical-URL CTA. Full SSR/prerender remains out of scope. |
| F-003 | Runtime API auth | **P1** | Bundle calls Firebase identitytoolkit with `key=nasim-ac-maintenance-key` → HTTP 400 `API_KEY_INVALID`. Reproducible console error on live site. | NO (bundle-only; rebuild prohibited by mission rule #7) | ⏸ DEFERRED — see § 5. |
| F-004 | Tailwind production CDN | P2 | `cdn.tailwindcss.com` prints production-use warning; render-blocking. | NO (would require new tooling; mission rule #8) | ⏸ DEFERRED. |
| F-005 | Image weight | P2 | `technician_main.jpg` 353 KB, `og-image.jpg` 173 KB, `uploads/logo-new.png` 173 KB; no WebP/AVIF alternates. | NO (asset replacement prohibited; mission rule #9) | ⏸ DEFERRED. |
| F-006 | `<img>` attrs (in bundle) | P2 | No `width`/`height`/`loading` on either rendered `<img>` → CLS + LCP risk. | NO (bundle-only; rule #7) | ⏸ DEFERRED. |
| F-007 | English `alt` text | P2 | Bundle renders `alt="AC Maintenance"`, `alt="AC Technician"` on an Arabic page. | NO (bundle-only; rule #7) | ⏸ DEFERRED. |
| F-008 | Mobile tap target | P3 | 1 control under 48 px at 320 px viewport. | NO (bundle-only; rule #7) | ⏸ DEFERRED. |
| F-009 | `theme-color` meta | P3 | Missing. | NO (no canonical brand color extractable from HEAD; mission "report > modify" bias) | ⏸ DEFERRED. |
| F-010 | Dead bundles | P3 | `assets/index-v{2,5,6,7,8}.js` — 5 files, ~5 MB, unreferenced by `index.html` (only `v9` is referenced). | YES (after user approval) | ✅ FIXED in `84a8adf`. |
| F-011 | Stale data files | P3 | `data/{settings,pages,menus,media,templates}.json` reference a different brand (`ac-maintenance.sa`, Riyadh address); bundle never fetches `/data/*.json` at runtime. | YES (after user approval) | ✅ FIXED in `43e1df6`. |
| F-012 | Multiple font requests | P3 | 3 separate `fonts.googleapis.com` URL imports. | NO (would mean editing existing tags, not just adding; rule scope) | ⏸ DEFERRED. |
| F-013 | sitemap `<lastmod>` | INFO | `2026-06-03` is 1 day behind current HEAD `f48b965` (2026-06-04). Not invalid; `<lastmod>` reflects last content change — content didn't materially change. | Optional | Left as-is. |

---

## 3. Fixes Applied

### Commit `19de448` — `seo: add JSON-LD @graph (Organization/LocalBusiness/WebSite) to index.html`

**File touched:** `index.html` (head only; +53 lines).

**Rationale:** F-001. Adds a single `<script type="application/ld+json">` block inside `<head>` with three nodes:

1. **`Organization`** — `name`, `url`, `logo`, `image`, `telephone` (`TODO_VERIFY`), `sameAs` (`["TODO_VERIFY"]`).
2. **`LocalBusiness`** — `name`, `description` (verbatim from existing `<meta description>`), `url`, `image`, `inLanguage: "ar"`, `telephone` (`TODO_VERIFY`), `address` (`addressCountry: "SA"`; region/locality = `TODO_VERIFY`), `areaServed`/`openingHoursSpecification`/`priceRange` (`TODO_VERIFY`).
3. **`WebSite`** — `name`, `url`, `inLanguage: "ar"`, `publisher: { @id: "#org" }`.

Every value either copied verbatim from `index.html`'s existing `<title>`, `<meta description>`, `<link rel="canonical">`, or OG tags, OR is the universally-safe `inLanguage: "ar"` / `addressCountry: "SA"` allowed by the mission. **Eight `TODO_VERIFY` placeholders** mark every field that could not be derived from HEAD. The block parses cleanly (`json.loads` round-trip + Playwright `script[type="application/ld+json"]` count = 1).

**Verification after commit:** Googlebot-UA Playwright render → `title`, `canonical`, `metaRobots`, `h1Count`, `jsonLdBlocks=1` all match expected; no new console errors; no failed network requests; no 4xx/5xx beyond the pre-existing F-003 mobile-pass Firebase error.

### Commit `c0c149a` — `seo: add <noscript> fallback so the static HTML carries indexable content`

**File touched:** `index.html` (body only; +8 lines).

**Rationale:** F-002. Adds a single `<noscript>` block outside `<div id="root">`, so React mount/hydration is not affected. The block's visible content uses ONLY:
- The brand string from `<title>` (`تقنية النسيم للتبريد والتكييف`) as the `<h1>` inside `<noscript>`.
- The existing `<meta name="description">` text verbatim as the body `<p>`.
- One `<a href="https://www.naseim.com/" rel="canonical">انتقل إلى الموقع الرئيسي</a>` CTA pointing at the canonical homepage URL.
- One trailing "enable JavaScript" note in Arabic.

**No service list, phone number, address, hours, marketing copy, or any other value not already in `index.html` was introduced.** Verified by script: noscript contents contain no `<ul>`, no `<li>`, no `+966...` patterns. The block is invisible when JS is enabled (Googlebot still parses it during its HTML-first crawl phase).

**Verification after commit:** raw HTML response from `python3 -m http.server` contains `<noscript>` and the "لعرض الموقع بالكامل" sentinel; Googlebot-UA Playwright render shows `h1Count=1` (JS-injected h1 from the SPA, not the noscript one), `jsonLdBlocks=1` (still present), title/canonical/meta robots unchanged; no new errors.

---

## 4. GSC URL Inspection Readiness Checklist

| Criterion | Result | Notes |
|---|---|---|
| Crawl status | **PASS** | `robots.txt` declares sitemap, no `Disallow`, no blocked critical resources; canonical `/` returns 200; no login wall, no soft 404. |
| Indexing status | **PASS** | `<meta robots>` = `index, follow`; `.htaccess` sets no `X-Robots-Tag`. |
| Canonical | **PASS** | Self-referencing `https://www.naseim.com/`, absolute HTTPS. |
| Discovery | **PASS** | Sitemap declared in robots.txt; GSC verification file present at root; sitemap URL absolute HTTPS, `<lastmod>` W3C-valid. |
| Rendered HTML & loaded resources | **PASS (improved)** | Was a hard FAIL (empty initial HTML) at Phase 2; the `<noscript>` fallback now ships the brand + description in the initial HTML response. Full SSR/prerender would be a further upgrade (remains DEFERRED). |
| Mobile usability | **PASS w/ caveat** | No horizontal overflow at 320 px. 1 tap target < 48 px (DEFERRED F-008 — in bundle). |
| Structured data validity | **PASS** | JSON-LD `@graph` parses cleanly; 3 typed nodes. **Note:** 8 `TODO_VERIFY` strings remain — rich-results eligibility is partial until the user fills them. Validate post-fill at <https://search.google.com/test/rich-results>. |
| Video indexing | **N/A** | No `<video>`. |
| AMP validity | **N/A** | No AMP. |
| Page experience & quality | **DEPLOY-CHECK** | Run PageSpeed Insights against live URL after deploy; watch LCP (Unsplash hero `<img>` is a candidate), CLS (no width/height on `<img>` — F-006), INP. |
| Manual actions / security / legal | **DEPLOY-CHECK** | Monitor GSC for 7 days after submission. |

---

## 5. DEFERRED — Items requiring user decision or out-of-scope work

| ID | Item | Recommended next step |
|---|---|---|
| **F-001 follow-up** | Fill the 8 `TODO_VERIFY` placeholders in the JSON-LD block of `index.html`: `telephone` (×2), `sameAs` array (real social URLs), `address.addressRegion`, `address.addressLocality`, `areaServed`, `openingHoursSpecification`, `priceRange`. | `grep -n TODO_VERIFY index.html` → edit in place. After filling, retest at the Rich Results URL above. |
| **F-003** | Firebase `API_KEY_INVALID` HTTP 400 on every page load. The bundle ships `key=nasim-ac-maintenance-key` which the live Firebase project rejects. Source for the bundle is not in the repo. | Two paths: (a) restore a Firebase config with a valid `apiKey` in whatever build pipeline produces `assets/index-v9.js`, then redeploy; (b) if Firebase auth isn't actually used by the public site, remove the initialization call from source and rebuild. Cannot be fixed by editing the minified bundle directly. |
| **F-004** | Tailwind via `cdn.tailwindcss.com`. | Outside this audit. Requires a real build pipeline (PostCSS plugin or Tailwind CLI) feeding into the deployed `assets/`. |
| **F-005** | Re-encode large images (`technician_main.jpg`, `og-image.jpg`, `uploads/logo-new.png`) to WebP/AVIF; produce responsive sizes. | Asset replacement — do offline with visual QA, then upload. |
| **F-006** | Add `width`, `height`, `loading="lazy"` (and `loading="eager" fetchpriority="high"` on the LCP image) to the two `<img>` tags. | Lives in the React source for the bundle; not in this repo. |
| **F-007** | Replace English `alt` text on the two `<img>` tags with Arabic equivalents. | Same — bundle source. |
| **F-008** | Resize the one mobile tap target under 48 px. | Bundle source. |
| **F-009** | Add `<meta name="theme-color">`. | Needs a canonical brand color decision (not derivable from HEAD). Once decided, one-line add inside `<head>`. |
| ~~**F-010**~~ | ~~Delete the 5 unreferenced legacy bundles~~ | ✅ DONE in `84a8adf`. |
| ~~**F-011**~~ | ~~Clean up `data/*.json`~~ | ✅ DONE in `43e1df6` (deleted the directory). |
| **F-012** | Combine the 3 separate `fonts.googleapis.com` URL imports into 1, or self-host. | Editing existing tags is outside this audit's ALLOWED EDITS. Trivial follow-up. |
| **F-013** | Bump `sitemap.xml <lastmod>` if/when material content changes. | No action needed for this audit (content unchanged). |

---

## 6. Post-Deploy Checklist for Abdulmajeed

1. **Take Hostinger backup BEFORE any change goes live.** hPanel → Files → Backups → create manual backup of `public_html` (or zip & download via File Manager).
2. **Apply the audit's three deploy-affecting changes to `public_html/`:**
   - Upload the modified `index.html` (replaces the live copy).
   - Delete `assets/index-v2.js`, `assets/index-v5.js`, `assets/index-v6.js`, `assets/index-v7.js`, `assets/index-v8.js` from `public_html/assets/` — they are no longer in the repo and are unreferenced; ~5 MB of dead deploy weight.
   - Delete the `public_html/data/` directory (5 stale JSON files referring to an unrelated brand; bundle never reads them at runtime).
   - All other files in `public_html/` (`assets/index-v9.js`, `assets/index-BwZ0IibB.css`, `.htaccess`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.jpg`, `technician_main.jpg`, `uploads/`, GSC verification) remain unchanged.
3. **Fill the 8 `TODO_VERIFY` placeholders** in the deployed `index.html` BEFORE submitting for rich-results validation. Either fill them locally first and upload, or edit in hPanel File Manager directly.
4. **Submit the sitemap.** GSC → Sitemaps → submit `https://www.naseim.com/sitemap.xml`.
5. **URL-Inspect `https://www.naseim.com/`** and request indexing. Confirm: Crawl allowed YES, Indexing allowed YES, user-declared canonical matches Google-selected canonical, and "View Crawled Page → HTML" shows the JSON-LD block.
6. **Validate JSON-LD** at <https://search.google.com/test/rich-results> against the live URL. Expected: `LocalBusiness` + `Organization` + `WebSite` detected with no errors (after `TODO_VERIFY` fields are filled).
7. **Monitor Coverage report** in GSC for 7 days. Expected: 1 indexed page, 0 errors.
8. **Investigate F-003 (Firebase API key)** independently. The live site is currently logging a real HTTP 400 on every page load. This won't directly block indexing but is a code-health red flag visible to anyone opening DevTools.

---

*Report generated 2026-06-04 by Claude Code (autonomous, scoped). Two commits added on top of `f48b965`. No remote push performed; no history rewrites.*
