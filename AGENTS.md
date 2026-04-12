<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Architecture Guidelines

## Architecture Pattern: Feature-based & Structural
- Use **"Colocation"** inside the `app/` directory for components that belong exclusively to a route. E.g., `app/properties/[id]/_components/PropertyGallery.tsx`.
- Place general/shared components in the root `components/` directory.

## Directory Structure Strategy under `components/`
- **`components/ui/`**: Base atomic components (buttons, inputs, cards) that are domain-agnostic.
- **`components/layout/`**: Structural elements (Navbar, Footer, Sidebar, etc.).
- **`components/[feature-domain]/`**: Domain-specific shared components (e.g., `properties/`, `auth/`, `search/`).

## Client vs Server Components
- Use Server Components by default for better performance and data fetching.
- Extract interactividad to smaller components with the `"use client"` directive to keep the parent as a Server Component whenever possible.
