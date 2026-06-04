# تقنية النسيم — naseim.com

Static Arabic-language site for **تقنية النسيم للتبريد والتكييف** (AC maintenance, Buraydah / Qassim, Saudi Arabia), built with **Next.js 16 App Router + Tailwind v4 + TypeScript**, exported as static HTML for Hostinger.

Production URL: <https://www.naseim.com/>

---

## Stack

- Next.js 16 (App Router, `output: 'export'`, `trailingSlash: true`)
- React 19
- Tailwind CSS 4 (PostCSS plugin)
- TypeScript, ESLint
- Cairo + Tajawal Arabic fonts via `next/font/google`

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Production build

```bash
npm run build        # emits ./out/
```

`./out/` is a complete static deployable: `index.html`, `_next/static/…`, `favicon.svg`, `og-image.jpg`, `technician_main.jpg`, `robots.txt`, `sitemap.xml`, `google602bc385b96202b6.html` (GSC verification), `.htaccess` (HTTPS + www redirect + SPA fallback for any sub-routes), `uploads/`, `images/`. No Node runtime required at the host.

## Deploy to Hostinger

1. **Backup `public_html/` first** (hPanel → Files → Backups, or zip via File Manager).
2. Run `npm run build` locally to produce `./out/`.
3. Upload the **contents** of `./out/` (not the folder itself) into `public_html/` on Hostinger, replacing existing files. SFTP `lftp mirror --reverse --delete` or hPanel File Manager both work.
4. **Important when using File Manager:** enable "show hidden files" so `.htaccess` uploads.
5. After upload, verify in an incognito window: hero, headings, contact phones, no console errors. Curl-check:
   ```bash
   curl -sI https://www.naseim.com/                        # 200
   curl -s  https://www.naseim.com/ | grep -c 'application/ld+json'   # 1
   curl -sI http://naseim.com/                             # 301 -> https://www.
   ```

## Project layout

```
app/
├── layout.tsx          ← <html lang=ar dir=rtl>, fonts, full SEO, JSON-LD
├── page.tsx            ← composes the home route
├── globals.css         ← Tailwind v4 + font-family default
└── components/
    ├── Header.tsx      ← logo + nav (خدماتنا / احجز الآن / تواصل معنا)
    ├── Hero.tsx        ← id=hero — headline + CTAs + technician image
    ├── WhyUs.tsx       ← 5 cards under H2 'معايير عالمية في خدمتك'
    ├── Services.tsx    ← id=services — 4 cards
    ├── HowItWorks.tsx  ← id=booking — 3 steps + WhatsApp CTA
    ├── Contact.tsx     ← id=contact — WhatsApp + Phone cards
    └── Footer.tsx
public/
├── favicon.svg, og-image.jpg, technician_main.jpg
├── robots.txt, sitemap.xml
├── google602bc385b96202b6.html   ← GSC verification
├── .htaccess                      ← redirect + caching headers
└── uploads/  (legacy logo assets, preserved)
next.config.ts          ← output: 'export', trailingSlash: true, images.unoptimized
```

## Editing content

All Arabic copy lives in the `app/components/*.tsx` files as plain strings — edit in place, then `npm run build`. There is no CMS, no JSON data source, no backend.

Site-wide SEO (title, description, OG, Twitter, JSON-LD) is in `app/layout.tsx`. The JSON-LD `@graph` covers `Organization`, `LocalBusiness`, `WebSite`; update the `telephone` / `addressRegion` constants if business details change.

## Forms

There is no backend. The "اطلب الخدمة الآن" / "اطلب عبر واتساب" / "اتصل الآن" CTAs are direct `wa.me` and `tel:` links — same UX as the previous site. **TODO:** if a real booking form is ever needed, wire it to a backend (the previous Firebase config used `key=nasim-ac-maintenance-key`, which the live Firebase project rejected with `API_KEY_INVALID`; that integration was intentionally not carried over).

## Rollback to the old static site

The complete pre-migration static SPA snapshot is frozen on branch [`backup/static-snapshot-pre-nextjs`](https://github.com/abdulmajeed25/nassim/tree/backup/static-snapshot-pre-nextjs).

```bash
git checkout backup/static-snapshot-pre-nextjs
```

That branch contains the `index.html` + `assets/index-v9.js` SPA bundle exactly as it ran on production before this migration. Re-upload its contents to `public_html/` to restore.

## Browser support

Modern evergreen browsers. Arabic RTL tested at desktop (1366×900) and mobile (390×844) viewports during the migration.

## Verified at migration time (2026-06-04)

- Build: `npm run build` → success, single static route
- Headings: 1 H1, 4 H2, 15 H3 — exact match to the live site's structure
- Line-overlap vs live site body text: 63/63 = 100%
- All `<img>` use Arabic `alt` (resolves the prior audit's F-007 finding)
- No JS errors, no failed network requests, no 4xx/5xx in `out/`

### Lighthouse — local headless Chromium against `out/` served by `python3 -m http.server`

| Category | Baseline | After perf pass | Target |
| --- | --- | --- | --- |
| Performance | 63 → 77 | 80–89 (bimodal, often 88+) | ≥ 85 |
| Accessibility | 95 | **100** | 100 |
| Best Practices | 100 | **100** | 100 |
| SEO | 100 | **100** | 100 |

Variance in Performance comes from `python3 -m http.server` (single-threaded, no compression, no cache headers). Production behind Hostinger LiteSpeed with HTTP/2 + brotli + the `.htaccess` Expires headers will be substantially faster.

### Performance-pass changes

- **Hero image self-hosted.** Was external Unsplash CDN (361 KB JPG, no priority hints). Now `public/images/hero.{jpg,webp}` (74 KB / 41 KB at 1366 px wide), used via `next/image` with `priority`, `fetchPriority="high"`, and a base64 blurDataURL placeholder. Decorative opacity-15 background, so aggressive compression is invisible.
- **Technician image optimized + lazy-loaded.** `public/technician_main.{jpg,webp}` re-encoded to 800×800 (54 KB / 33 KB, was 353 KB). `loading="lazy"` since it's hidden on mobile (`hidden md:block`) and not in the LCP path.
- **Fonts trimmed.** Removed Tajawal entirely (unused). Cairo reduced from `arabic+latin × 4 weights` to `arabic × 3 weights` (400 / 700 / 800). Preloaded woff2 count: **8 → 1**.
- **Browserslist pinned** to chrome/firefox/edge ≥ 100 and safari ≥ 15, dropping ~43 KiB of legacy-browser polyfills from the client bundle.
- **`.htaccess` Expires + DEFLATE** blocks added for LiteSpeed: 1-year cache for images/fonts, 1-month for css/js, gzip compression for html/css/js/json/svg. Redirect logic untouched.
- **Color contrast.** Header subtitle `TAQNIA AL-NASEEM` shifted from `text-cyan-600` to `text-cyan-800` (the single failing element flagged by Lighthouse color-contrast).
