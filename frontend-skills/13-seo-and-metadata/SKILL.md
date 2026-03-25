---
name: seo-and-metadata
description: Implement dynamic SEO, Open Graph, Twitter Cards, canonical URLs, and JSON-LD schema.
risk: medium
universal: true
source: external
date_added: 2026-03-25
---

# 1. Skill Description

**Description (EN):**
This skill orchestrates dynamic insertion of SEO meta tags, Open Graph (OG) social sharing properties, Twitter Cards, canonical links, and JSON-LD structured data. It ensures search engines and social platforms can rich-index modern applications properly without fragile hardcoded `<head>` values.

**Descripción (ES):**
Esta skill orquesta la inserción dinámica de etiquetas meta SEO, propiedades de Open Graph (OG) para compartir en redes sociales, Twitter Cards, enlaces canónicos y datos estructurados JSON-LD. Garantiza que los motores de búsqueda y las plataformas sociales indexen correctamente la aplicación con tarjetas enriquecidas, sin valores frágiles "hardcodeados" en el `<head>`.

**Related resources:**
- Reference: [seo-tags.template.md](./resources/seo-tags.template.md)

---

# 2. Skill Objective

**Objective (EN):**
Ensure that every route (especially dynamic routes like `/:productId`) correctly defines title, description, sharing images, and structured metadata for Google and social previews.
- Use this skill when: Building public-facing pages, blogs, e-commerce products, or any route meant to be indexable.
- Do not use this skill when: Working inside private dashboards completely blocked by authentication (unless you only need a basic title).

**Objetivo (ES):**
Garantizar que cada ruta (especialmente dinámicas como `/:productId`) defina correctamente su título, descripción, imágenes para compartir y metadata estructurada para vistas previas de Google y redes sociales.
- Úsese cuando: Se construyen páginas públicas, blogs, productos de e-commerce, o cualquier ruta que deba ser indexable.
- No se use cuando: Se trabaja dentro de dashboards privados completamente bloqueados por autenticación (a menos que solo se necesite el título básico).

---

# 3. Inputs / Entradas

1. `Target Framework`: React, Angular, Vue, Astro, Next.js, Nuxt, etc.
2. `Rendering Mode`: CSR, SSR, SSG (affects how metadata requires hydration).
3. `Base URL`: The public URL (e.g., `https://myapp.com`) to generate absolute OG image paths.

---

# 4. Outputs / Salidas

- A reusable wrapper, service, or abstract layout that accepts dynamic SEO props (title, description, image, schema, type).
- Explicit `og:image` and `twitter:image` logic ensuring images appear in link previews.
- Implementation of Canonical URLs to prevent duplicate content penalties.
- Configuration for `robots.txt` and `sitemap.xml` boundaries.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Understand rendering limits:** Determine if the framework is SSR, SSG, or CSR. Social crawlers (like WhatsApp or Twitter) do not execute JavaScript. If the app is CSR, establish that OG tags might need a proxy or Edge rendering to work fully for social sharing.
2. **Create the SEO Primitive:** Build a component (like `<SeoHead />`) or a service (like `SeoService`) that manages document metadata centrally.
3. **Accept standard props:** The primitive must accept: `title`, `description`, `image`, `url`, `type` (website/article), and `jsonLd`.
4. **Generate default fallbacks:** If a route omits `image` or `description`, fallback to generic global values defined in an environment variable or constants file.
5. **Enforce absolute URLs:** `og:url` and `og:image` must be absolute paths (e.g., `https://domain.com/assets/og.png`). Relative paths fail in social crawlers.
6. **Inject canonical links:** Prevent duplicate content by always printing `<link rel="canonical" href="..." />` based on the current location without query parameters.
7. **Verify structural configuration:** Ensure `robots.txt` allows crawling for public routes and blocks private domains. Check `sitemap.xml` generating logic if applicable.
8. **Adapt the pattern, not the literal example:** Do not import `react-helmet` or similar if the framework already has native head manipulation (e.g., Next.js `generateMetadata` or Nuxt `useHead`).

**Instrucciones (ES):**
1. **Comprender los límites de renderizado:** Determina si el framework es SSR, SSG o CSR. Los crawlers sociales (como WhatsApp o Twitter) no ejecutan JavaScript. Si la app es CSR, establece que las etiquetas OG pueden necesitar un proxy o Edge rendering para funcionar al compartir.
2. **Crear la Primitiva SEO:** Construye un componente (como `<SeoHead />`) o un servicio (como `SeoService`) que administre la metadata del documento centralizadamente.
3. **Aceptar props estándar:** La primitiva debe aceptar: `title`, `description`, `image`, `url`, `type` (website/article) y `jsonLd`.
4. **Generar fallbacks por defecto:** Si una ruta omite `image` o `description`, usa valores genéricos globales definidos en constantes.
5. **Forzar URLs absolutas:** `og:url` y `og:image` deben ser rutas absolutas (ej. `https://domain.com/assets/og.png`). Las rutas relativas fallan en los crawlers.
6. **Inyectar enlaces canónicos:** Previene el contenido duplicado imprimiendo siempre `<link rel="canonical" href="..." />` basado en la ubicación actual sin query parameters.
7. **Verificar configuración estructural:** Asegura que `robots.txt` permita rastrear rutas públicas y bloquee dominios privados.
8. **Adapta el patrón, no el ejemplo literal:** No instales dependencias como `react-helmet` si el framework ya maneja `<head>` nativamente (ej. Next.js `generateMetadata`, Nuxt `useHead`, o Angular `Meta`).

---

# 6. Example Usage (Prompt)

### English
> "Use the @13-seo-and-metadata skill to create a reusable SEO primitive for our Next.js pages. Ensure it requires a title and description, supports an optional standard OG image cover, and correctly sets canonical URLs. Apply it to the `[productSlug]` dynamic route using JSON-LD for product data."

### Español
> "Usa la skill @13-seo-and-metadata para crear una primitiva SEO reutilizable para nuestras páginas en Next.js. Asegúrate de que requiera título y descripción, soporte una imagen OG estándar y configure URLs canónicas. Aplícalo a la ruta dinámica `[productSlug]` usando JSON-LD para la información del producto."

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── ui/
    ├── components/
    │   └── common/
    │       ├── SeoHead.tsx      # Central configuration for meta, OG, and Twitter tags
    │       └── JsonLd.tsx       # Helper for structured schema scripts
    ├── pages/
    │   └── public/
    │       └── ProductView.tsx  # Injects local product data into SeoHead
public/
├── robots.txt
└── sitemap.xml
```

### Checklist for adaptation / Lista de Adaptación
- [ ] SEO component/service accepts standard properties (`title`, `description`, `image`).
- [ ] Open Graph and Twitter Card tags use absolute URLs for images.
- [ ] Canonical URLs are correctly injected.
- [ ] The solution respects the framework's native head injection mechanism.
- [ ] JSON-LD structured data is properly formatted or omitted cleanly.
