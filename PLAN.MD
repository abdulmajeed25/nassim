You are an expert full-stack architect. Generate a production-ready React (TypeScript) + Vite project with a full Arabic RTL admin dashboard so I can manage my site without writing code.

### Tech Stack:
- React + TypeScript
- Vite as build tool and dev server
- Tailwind CSS via CDN
- shadcn/ui components for UI elements
- lucide-react for icons
- Optional: Firebase or Supabase for backend (CRUD APIs, auth, storage)
- Hosting: GitHub Pages with base path /nasim/

### Features:

#### 1. Arabic RTL UI:
- All UI RTL by default with Arabic translations
- Beautiful, clean, responsive dashboard UI

#### 2. Authentication:
- Email/password login (via Firebase Auth or Supabase)
- Role-based access: Admin, Editor, Viewer
- Store session state in localStorage or via backend service

#### 3. Content Models:
- Pages: { slug, title, SEO fields, openGraph image, blocks[] }
- Posts: { title, slug, excerpt, content (rich-text), cover image, categories[], tags[] }
- Media Library: Upload images, preview, automatic optimization
- Menus: Editable header/footer menus
- Settings: Site name, logo, colors, social links, analytics id

#### 4. Page Builder (Drag & Drop + AI):
- Predefined blocks: Hero, FeatureGrid, ContentRichText, ImageGallery, FAQ, CTA, Testimonial, PricingTable
- Each block has:
  - JSON schema
  - React renderer
  - Props validation
- Blocks reorderable via drag & drop
- Live preview on the right, form controls on the left
- AI Mode: Input text prompt (Arabic) → generate block JSX + Tailwind CSS using OpenAI API

#### 5. Editor:
- Rich-text editor with markdown toolbar, image upload, code blocks, tables
- Image uploads stored locally in /public/uploads in dev, Firebase Storage/S3 in prod

#### 6. API / Data Layer:
- CRUD endpoints via Firebase Functions or Supabase
- Public read-only JSON endpoints: /data/pages.json, /data/posts.json, /data/menus.json
- Admin endpoints protected by auth

#### 7. SEO:
- Manage SEO fields from dashboard
- Generate sitemap.xml & robots.txt automatically
- OpenGraph/Twitter meta tags

#### 8. Performance:
- Code splitting by route
- Lazy loading blocks
- Image optimization & WebP

#### 9. Developer Experience:
- pnpm or npm
- ESLint + Prettier config
- .env.example with required keys
- README-AR.md explaining setup in Arabic

### Deliverables:
1. /src/admin → Full dashboard UI & logic
2. /src/components → Site components for each block
3. /data/sample.json → Seed data (Arabic demo)
4. AI integration service to generate blocks dynamically from text prompts
5. Example page rendering system that reads JSON + renders blocks
6. Fully working drag & drop builder
7. Authentication & role-based routing
8. Beautiful Arabic RTL UI with search, filters, pagination

### Nice-to-have:
- Draft/Publish toggle
- Revision history for pages
- Simple analytics widget (mock data)

Generate all necessary files, directories, and example code now.
