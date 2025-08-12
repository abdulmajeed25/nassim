You are an expert full-stack architect. Evolve an existing React (TypeScript) + Vite + Tailwind (via CDN) project hosted on GitHub Pages (base /nasim/) by adding a modern Arabic RTL Admin Dashboard with a LARGE, editable templates library and multi-level customization (Basic / Medium / Advanced). No external edits; all changes happen in the Admin and reflect instantly on the live preview and renderer.

## Tech constraints
- Keep React + TS + Vite. Respect Vite base="/nasim/" for routes/assets.
- Tailwind via CDN (ship today). Provide an optional path to switch to Tailwind build later for advanced theming.
- Use a shared block/page renderer between site and admin preview. Global store (Zustand/RTK).
- Icon packs: lucide-react by default + an extensible IconRegistry supporting Tabler/Phosphor (tree-shakeable dynamic import).

## Templates Library (massive, modern)
- Provide **40+ ready page templates** (Home, Services, Pricing, About, Contact, FAQ, Case Study, Portfolio, Blog Index, Post, Landing, Careers, Team, 404, Legal, etc.), all RTL-first and Arabic.
- Provide **100+ section templates (blocks)** grouped by purpose:
  Hero, FeatureGrid, ContentRichText, ImageGallery, FAQ, CTA, Testimonial, PricingTable, Stats/KPIs, LogoCloud, Steps/Process, ContactCTA, Comparison, Timeline, Tabs, Accordion, Steps Cards, Before/After, Award/Badges, Newsletter, Map/Locations.
- Include **vertical presets for AC maintenance** (خدمات صيانة المكيفات): ServiceCards, Packages, Guarantees, Booking CTA (WhatsApp/Call), WorkShowcase (قبل/بعد), Partners/Enterprise Clients, Emergency Notice.
- Each template/section has:
  - JSON schema + zod validation
  - Accessible Arabic copy with placeholders
  - RTL spacing/flow and responsive breakpoints
  - Design tokens-aware (colors, radius, shadows, typography scale)

## Customization Levels
- **Basic**: content only (texts, images, icons, links). Safe defaults. One-click apply/reset.
- **Medium**: switch section variants, change layout density, choose theme tokens (brand color, surface, radius, shadows, borders), per-block backgrounds (solid/gradient/pattern), icon style (stroke width, size), alignment (start/center/end), spacing scale.
- **Advanced (Precise)**: grid designer + per-breakpoint controls (cols/gaps/areas), reorder/drag across regions, per-block CSS vars, show/hide elements, custom corner shapes (rounded/pill/squircle), separators (dividers/waves/curves), motion toggles.
- Show a **scope switcher** (Global / Page / Block) so edits can be applied globally, to this page only, or to a single block.

## Icon & Shape System
- IconRegistry with categories and live search; support strokeWidth/size/flip/rotate.
- Placement controls: choose slot, order, and alignment per breakpoint.
- Shape presets: straight/rounded/pill/squircle; background decorations (grid dots, noise, gradient, subtle blobs) via CSS only.

## Admin UX
- Templates Gallery with filters (Page vs Section, category, “AC maintenance” vertical, popularity).
- “Customize Level” toggle (Basic / Medium / Advanced).
- Live preview (right) + form/inspector (left). Drag & drop reorder, clone, and move between sections.
- Global search, pagination, bulk apply to multiple pages.
- Undo/Redo + Revisions history. Compare before/after and restore.
- Import/Export template JSON (shareable), plus “Save as My Template”.

## AI Page Builder (Arabic)
- Arabic prompt → propose: (a) best-fit sections from library, (b) optionally generate a **new** section variant if not found.
- Validate AI output against schemas; auto-fix minor issues; show diff.
- AI actions: Insert, Replace, Append, Move section “above/below”, “convert style to cards”, “swap to minimal pricing”.
- Teach the model the vertical (AC maintenance) so suggested content/CTA fits the business (WhatsApp/Call actions, packages, guarantees).

## Data Layer (local-first)
- JSON under /public/data: pages.json, menus.json, settings.json, media.json, templates.json (and myTemplates.json).
- DataGateway with LocalJsonDriver + CloudDriver interface (Supabase/Firebase) for later.
- Autosave + manual Save; schemaVersion with migration helpers.

## Menus & Settings
- Menus editor (header/footer) with drag/drop and icon support.
- Settings: siteName, logo, brand colors, typography scale, radii, shadows, social links, analytics id.
- Theme tokens editor (global + per-page override).

## Media
- /public/uploads in dev; generate webp + thumbnails. Lazy loading. Alt text required. Crop & focal point.

## Performance & SEO
- Route-based code splitting; lazy-load heavy blocks.
- Next-gen images, responsive sizes.
- Generate sitemap.xml & robots.txt from data. Canonicals respect /nasim/.
- Accessibility: keyboard navigation, focus states, ARIA, color-contrast checks.

## Testing & DX
- ESLint + Prettier; Playwright smoke for: admin loads, add template, customize (3 levels), save, render on site.
- .env.example; Vite config base="/nasim/".
- README-AR.md: how to add/extend templates, create variants, manage tokens, switch to Tailwind build if needed.

## Deliverables
- /src/admin (gallery, inspector, AI builder, revisions)
- /src/renderer (shared renderers)
- /src/blocks (schemas + renderers + variants + AC presets)
- /src/store (global store + BroadcastChannel sync)
- /src/dataGateway (drivers)
- /public/data (seed: many templates + example pages)
- /public/uploads (sample media)
- Quality bar: beautiful Arabic RTL UI, modern patterns, zero external edits for common tasks.
Generate all code, seed data, and examples now.
