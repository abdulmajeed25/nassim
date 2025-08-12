You are an expert full-stack architect. Upgrade an existing React (TypeScript) + Vite + Tailwind (via CDN) project hosted on GitHub Pages (base path /nasim/) by generating a production-ready, Arabic RTL Admin Dashboard that gives me FULL, frictionless control over the entire site (homepage and additional pages) with instant live reflection of changes. No external edits; all customization is done inside the admin UI.

## Tech & Constraints
- Framework: React + TypeScript + Vite (keep existing structure; generate new code under /src and /public only).
- Styling: Tailwind CSS via CDN; Arabic RTL by default.
- Base path: All routes/assets must respect /nasim/ for GitHub Pages.
- No SSR required. Provide a local-first data layer that can later swap to cloud.
- Do NOT switch to Next.js. Stay in Vite.

## Core Goals
1) **Instant Live Reflection**: Changes in the Admin should update the live site preview immediately using the SAME render pipeline.
   - Implement a single source of truth store (Zustand or Redux Toolkit).
   - Use a shared “renderer” for both site and admin preview.
   - In dev: mirror updates via BroadcastChannel and localStorage events across tabs.
   - Provide a toggle: “Preview Local Data” vs “Preview Production Data”.

2) **Full-Page Customization (Everything editable)**
   - Global Design System controlled from Admin: theme colors, typography scale, spacing, radii, shadows, container width.
   - Header/Footer editable (menus, logo, contact info, CTA buttons).
   - Page-level layout controls: section padding, background (color/gradient/image), container width, per-block overrides.
   - All text content is inline-editable with WYSIWYG (RTL-friendly), with markdown toolbar, tables, code blocks, mentions, image paste.

3) **Pages & Routing**
   - Visual page tree (list + nested routes). Create/rename/duplicate/delete pages.
   - Page schema: { id, slug, title, seo { title, description, ogImage }, layout { header/footer visibility, containerWidth }, blocks[] }.
   - Home page is just another page (slug="/") but can be pinned as default.

4) **AI Page Builder (Arabic)**
   - “AI Mode” text box (Arabic prompt) → generate one or more blocks as valid JSON + JSX renderers with Tailwind classes and proper RTL.
   - Support intent detection: “أضف قسم خدمات بثلاث بطاقات”، “نقل قسم التسعير للأعلى”، “حدّث نص الهيرو”.
   - Guardrails: validate generated block schema; if invalid, auto-fix and show diff.
   - Offer 1-click “Insert”, “Replace selection”, “Append to page”.
   - Record AI ops in the revision history for undo/redo.

5) **Blocks Library (drag & drop, reorder, clone)**
   - Built-in blocks (each has JSON schema + React renderer + zod validation):
     - Hero, FeatureGrid, ContentRichText, ImageGallery, FAQ, CTA, Testimonial, PricingTable, Stats/KPIs, LogoCloud, Steps/Process, ContactCTA.
   - Business presets for AC maintenance:
     - ServiceCards (تشخيص أعطال، تنظيف عميق، تركيب وصيانة دورية)
     - KPIs (عدد العملاء، الشركاء، العملاء الكبار)
     - WorkShowcase (قبل/بعد، معرض مشاريع)
     - BookingCTA (زر واتساب/اتصال سريع)
   - Block Inspector: edit props with smart defaults; per-breakpoint controls (sm/md/lg).

6) **Media Library**
   - Local dev: /public/uploads (auto-generate webp + thumbnails).
   - Production adapter: S3-compatible (e.g., R2). Provide interface + mock; easy swap later.
   - Drag/drop upload, crop, alt text, lazy loading.

7) **Menus & Settings**
   - Menus (header/footer) editor with drag/drop, links internal/external, open in new tab, icons (lucide-react).
   - Settings: siteName, logo, brand colors, social links, analytics id, contact info.
   - All settings applied instantly to both preview and site renderer.

8) **Data Layer (Local-first, Cloud-ready)**
   - Local mode: store JSON under /public/data/*.json (pages.json, posts.json, menus.json, settings.json, media.json).
   - Provide a DataGateway abstraction with two drivers:
     - LocalJsonDriver (read/write to /public/data in dev; commit-ready files).
     - CloudDriver interface (stub + example for Supabase/Firebase).
   - Autosave + manual Save with dirty state.
   - Simple migrations for JSON versions (bump schemaVersion and apply transforms).

9) **Posts & Editor**
   - Posts: { id, title, slug, excerpt, content (rich-text JSON/markdown), coverImage, categories[], tags[], status: draft|published, scheduleAt? }
   - Rich editor with tables/code/mentions, image upload, inline link manager.
   - Draft/Publish + Schedule Publish (local cron mock in dev; no background jobs in prod).
   - Revisions per post/page; compare & restore diff.

10) **Admin UX**
    - Arabic RTL UI, keyboard shortcuts (/, cmd+s, cmd+z/cmd+shift+z).
    - Global search (pages, posts, media) with filters, pagination, bulk actions.
    - Undo/Redo stack, per-entity revisions.
    - Template gallery: ready-made page templates (Home, Services, Pricing, Contact).
    - Onboarding wizard to create the first homepage in < 2 minutes.

11) **Auth (Optional, pluggable)**
    - Local dev: simple passcode or email/password stub.
    - Adapter for real auth later (Supabase/Firebase). Role-based: Admin, Editor, Viewer.
    - Route guards on /admin/** and write ops.

12) **Performance & DX**
    - Code splitting per route, lazy block renderers.
    - Image optimization, webp thumbnails, intersection-based lazy load.
    - ESLint + Prettier; pnpm lockfile.
    - .env.example for base path, storage, auth keys.
    - Vite config honoring base: "/nasim/".

13) **SEO**
    - From Admin: edit seo per page; generate sitemap.xml & robots.txt in /public.
    - Canonical URLs using base path; OpenGraph/Twitter meta via page data.

14) **Testing**
    - Basic Playwright smoke tests (admin loads, create page, add block, save; renderer shows block).

15) **Deliverables**
    - /src/admin: full dashboard (pages, posts, media, menus, settings, AI builder, templates).
    - /src/renderer: shared block renderers used by both site and admin preview.
    - /src/blocks: schemas (zod) + components + examples + presets for AC services.
    - /src/store: global store (Zustand/RTK) + BroadcastChannel sync.
    - /src/dataGateway: drivers (LocalJsonDriver, CloudDriver interface).
    - /public/data: sample Arabic seed (home page with AC-service presets).
    - /public/uploads: sample images + generated thumbs.
    - README-AR.md: Arabic steps to run locally, seed, deploy to GitHub Pages, and how to add a new Block.
    - Scripts: build, preview, format, test.
    - Note: Provide an “AdminOnlyBanner” in preview mode; never ship admin UI to the public bundle unintentionally.

16) **Quality Bars**
    - Beautiful Arabic RTL UI using shadcn/ui + Tailwind (no external styles).
    - Every block has props validation and example JSON.
    - Zero external manual edits needed for common tasks. All from admin.
    - Clear error states, toasts, progress indicators, and confirm modals.

Generate all folders/files, with working examples and seed content in Arabic. Keep code cohesive and production-minded.
