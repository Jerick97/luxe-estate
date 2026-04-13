# LuxuEstate — Best Practices & Roadmap

## 🛠️ Desarrollo (Next.js 16)
- Usar **Server Components** por defecto, `"use client"` solo donde haya interactividad
- **ISR** para páginas de propiedades individuales (rápido + actualizable)
- **SSR** para búsquedas con filtros dinámicos
- `next/image` con WebP/AVIF en todas las fotos
- `next/font` para evitar layout shifts
- Lazy loading en galerías (cargar solo las 2-3 primeras imágenes)
- Prefetching con `<Link>` en tarjetas de propiedades
- Estado de filtros/búsqueda en la URL (`searchParams`), no en estado local
- Transiciones fluidas con View Transitions API o Framer Motion

## 🔍 SEO Técnico
- **JSON-LD** con schema `RealEstateListing` en cada propiedad (precio, ubicación, beds, baths, m²)
- `generateMetadata` dinámico por propiedad (título, descripción, Open Graph image)
- `app/sitemap.ts` dinámico leyendo propiedades activas de Supabase
- `robots.txt` configurado correctamente
- URLs canónicas en páginas con filtros para evitar contenido duplicado
- Alt text descriptivo y con keywords en todas las imágenes
- Heading hierarchy: un solo `<h1>` por página
- HTML semántico (`<main>`, `<section>`, `<article>`, `<nav>`)
- **Slugs descriptivos** en URLs: `/propiedades/villa-beverly-hills-5-recamaras` en vez de `/propiedades/a3f2-uuid`. Genera el slug automáticamente desde título + ubicación + beds al crear la propiedad en Supabase (columna `slug` única)

## 📍 SEO Local (Clave en Real Estate)
- Landing pages por vecindario/ciudad (`/neighborhoods/[slug]`)
- Contenido hiperlocal: colegios, transporte, seguridad, estilo de vida
- Optimizar para long-tail: "Villas de lujo en Beverly Hills" > "Casas en venta"
- Google Business Profile activo con listings y reseñas
- NAP (Name, Address, Phone) consistente en todo el sitio

## ⚡ Performance
- Core Web Vitals como prioridad (LCP, INP, CLS)
- Minimizar JavaScript del cliente
- Caché agresivo en queries de Supabase con `revalidate`
- Comprimir assets estáticos
- CDN para imágenes de propiedades (Supabase Storage o Cloudinary)

## 💡 Diferenciadores de Producto
- **Búsqueda por estilo de vida** ("pet-friendly", "luz natural", "cerca de colegios") con IA/embeddings
- **Modo Inversor vs Familia**: toggle que cambia métricas visibles (ROI vs escuelas)
- **Calculadora hipotecaria** integrada en cada tarjeta de propiedad
- **Tours virtuales 360°** embebidos sin redirecciones externas
- **Chatbot IA** conectado a la DB para responder dudas de ubicación
- **Compartir por WhatsApp/redes** con preview rico (Open Graph bien configurado)
- **Alertas personalizadas** por email cuando aparezcan propiedades que coincidan con criterios guardados
- **Comparador de propiedades** side-by-side
- **Mapa interactivo** con clusters y filtros en tiempo real
- **Dark mode premium** como señal de exclusividad

## 🎯 Conversión y UX
- CTA claros: "Agendar visita", "Contactar agente", "Calcular hipoteca"
- Formularios cortos (nombre + teléfono + mensaje, máximo)
- Testimonios y reseñas de clientes visibles
- Fotos profesionales de alta calidad como estándar mínimo
- Tiempos de carga < 2s en mobile
- Diseño mobile-first (la mayoría busca propiedades desde el teléfono)
