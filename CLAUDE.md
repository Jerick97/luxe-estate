@AGENTS.md

# Luxu Estate — Project Context

## Overview
Luxu Estate is a premium real estate web application built with **Next.js 16 (App Router)** and **Tailwind CSS v4**. The goal is to implement a modern, premium, and minimalist property listing platform following exact design references located in `docs/design/`.

## Tech Stack
- **Framework**: Next.js 16.2.2 (App Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`
- **Icons**: lucide-react ^1.7.0
- **Language**: TypeScript 5
- **Linting**: ESLint 9 with `eslint-config-next` (core-web-vitals + typescript)
- **Font**: SF Pro Display (local, loaded via `next/font/local` with `--font-sf-pro` CSS variable)

## Project Structure

```
luxu-estate/
├── app/                          # Next.js App Router
│   ├── fonts/                    # SF Pro Display .woff2 files (Regular, Medium, SemiboldItalic, Bold, BlackItalic)
│   ├── globals.css               # Tailwind v4 import + @theme config (custom colors, shadows, fonts)
│   ├── layout.tsx                # Root layout (font config, Navbar, metadata)
│   ├── page.tsx                  # Home Discover screen (hero, search, featured, new in market)
│   └── favicon.ico
├── components/                   # Shared reusable components
│   ├── ui/                       # Base atomic components (buttons, inputs, modals) — domain-agnostic
│   ├── layout/                   # Structural components
│   │   └── Navbar.tsx            # Top navigation bar (sticky, responsive)
│   └── properties/               # Domain-specific shared components
│       ├── FeaturedCollectionCard.tsx  # Large featured property card with badge + gradient overlay
│       └── PropertyCard.tsx           # Standard property listing card
├── data/                         # Mock data and type definitions
│   └── properties.mock.ts       # Property interface + featuredProperties + newInMarketProperties arrays
├── docs/                         # Project documentation and design references
│   ├── guidelines.md             # Color palette, typography rules, development priorities
│   ├── instructions.md           # Project objective and scope
│   └── design/                   # Design references by screen (10 screens planned)
│       ├── home_discover_screen/
│       ├── property_details_screen/
│       ├── search_filters_screen/
│       ├── favorites_list_screen/
│       ├── user_profile_screen/
│       ├── social_login_and_registration/
│       ├── schedule_visit_screen/
│       ├── add_edit_property_form/
│       ├── property_management_dashboard/
│       └── admin_user_directory_cards/
├── public/                       # Static assets (SVGs: file, globe, next, vercel, window)
├── next.config.ts                # Image remote patterns (lh3.googleusercontent.com)
├── postcss.config.mjs            # PostCSS with @tailwindcss/postcss plugin
├── eslint.config.mjs             # ESLint flat config
├── tsconfig.json                 # TypeScript config (path alias: @/* → ./*)
└── package.json
```

## Design System (Tailwind v4 `@theme`)

### Color Palette (defined in `globals.css`)
| Token                | Value      | Usage                                |
|----------------------|------------|--------------------------------------|
| `primary`            | `#06f9d0`  | Accent / highlights                  |
| `background-light`   | `#EEF6F6`  | Main app background (Clear Day)      |
| `background-dark`    | `#0f231f`  | Dark mode background                 |
| `nordic-dark`        | `#19322F`  | Primary text, headers, nav           |
| `nordic-muted`       | `#5C706D`  | Secondary/muted text                 |
| `mosque`             | `#006655`  | Primary action buttons, active links |
| `hint-of-green`      | `#D9ECC8`  | Featured card backgrounds            |

### Shadows
- `shadow-soft`: `0 10px 40px -10px rgba(0,0,0,0.05)`
- `shadow-card`: `0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02)`

### Typography
- Font family: `--font-display` → SF Pro Display (variable: `--font-sf-pro`)
- Weights available: 400 (Regular), 500 (Medium), 600 (Semibold Italic), 700 (Bold), 900 (Black Italic)

### Custom Utilities
- `.hide-scroll` — Hides scrollbars cross-browser (webkit + Firefox + IE)
- Dark mode variant: `@custom-variant dark (&:is(.dark *))` (class-based)

## Data Models

### `Property` (defined in `data/properties.mock.ts`)
```ts
interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  period?: '/mo';
  beds: number;
  baths: number;
  area: number;
  imageUrl: string;
  imageAlt: string;
  status: 'FOR SALE' | 'FOR RENT';
  type: 'House' | 'Apartment' | 'Villa' | 'Penthouse' | 'Studio';
  featuredBadge?: 'Exclusive' | 'New Arrival' | null;
}
```

## Implemented Screens
- [x] **Home Discover** (`app/page.tsx`) — Hero search, filter pills, Featured Collections grid (2-col), New in Market grid (responsive 1–4 cols), "Load more" button

## Pending Screens (references in `docs/design/`)
- [ ] Property Details
- [ ] Search Filters
- [ ] Favorites List
- [ ] User Profile
- [ ] Social Login & Registration
- [ ] Schedule Visit
- [ ] Add/Edit Property Form
- [ ] Property Management Dashboard
- [ ] Admin User Directory Cards

## Architecture & Conventions

### Component Organization
- **`components/ui/`** — Base atomic components (Button, Input, Modal, etc.) — domain-agnostic
- **`components/layout/`** — Structural elements (Navbar, Footer, Sidebar)
- **`components/[domain]/`** — Domain-specific shared components (e.g., `properties/`)
- **Route-specific components** — Use colocation: `app/[route]/_components/ComponentName.tsx`

### Server vs Client Components
- Default to **Server Components** for better performance
- Extract interactivity into the smallest possible `"use client"` leaf components
- Keep parent layout/page components as Server Components whenever possible

### Import Alias
- Use `@/*` for absolute imports from project root (e.g., `@/components/layout/Navbar`)

### Image Handling
- Remote images from `lh3.googleusercontent.com` are allowed via `next.config.ts`
- Use `next/image` with `fill` prop and `object-cover` for responsive images

### Development Rules (from `docs/guidelines.md`)
- Use the exact color palette defined above — do not deviate
- SF Pro Display is mandatory
- Prioritize component reusability
- **Do not install libraries without consulting first**
- Organize folders/subfolders according to the pages being worked on

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
