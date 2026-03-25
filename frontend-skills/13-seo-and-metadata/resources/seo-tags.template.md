# SEO & Social Metadata Reference

This reference outlines the required meta tags needed for rich indexing by Google and proper visual cards in Slack, WhatsApp, Twitter, LinkedIn, and Facebook.

## 1. Primary Tags (HTML Standard)
Always required. Used by all search engines.

```html
<title>Product Name | My Brand</title>
<meta name="description" content="A brief 150-160 character description of this specific page to entice clicks." />
<link rel="canonical" href="https://mybrand.com/products/123" />
```

## 2. Open Graph (OG) Tags
Used by Facebook, LinkedIn, WhatsApp, iMessage, and Slack to generate link previews.

```html
<meta property="og:title" content="Product Name | My Brand" />
<meta property="og:description" content="A brief description for social feeds." />
<!-- og:image MUST be an absolute URL -->
<meta property="og:image" content="https://mybrand.com/assets/product-123-cover.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<!-- Type: 'website' for pages, 'article' for blogs -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://mybrand.com/products/123" />
<meta property="og:site_name" content="My Brand" />
```

## 3. Twitter Cards
Used by Twitter. Twitter normally falls back to OG tags if Twitter tags are missing, but `twitter:card` is strictly required to enable the large image preview.

```html
<!-- Use 'summary_large_image' for the big edge-to-edge photo card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@MyBrandTwitterHandler" />
<meta name="twitter:title" content="Product Name | My Brand" />
<meta name="twitter:description" content="A brief description for social feeds." />
<meta name="twitter:image" content="https://mybrand.com/assets/product-123-cover.jpg" />
```

## 4. JSON-LD (Structured Data)
Used by Google to create "Rich Snippets" (e.g., star ratings, prices, recipe times directly in search results). Do not inject this inside `<meta>`, it requires a script tag in the head or body.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Product Name",
  "image": "https://mybrand.com/assets/product-123-cover.jpg",
  "description": "A detailed JSON-LD description.",
  "sku": "123456",
  "offers": {
    "@type": "Offer",
    "url": "https://mybrand.com/products/123",
    "priceCurrency": "USD",
    "price": "99.99",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

## 5. Critical Edge Cases to Hand to the AI

- **CSR vs Social Crawlers:** Point out that Facebook and WhatsApp bots often **do not execute Javascript**. If your project is CSR (Vite + React without SSR), dynamic `<head>` injection via Javascript will fail on social platforms. Social platforms will only see the fallback `index.html`.
- **Image Aspect Ratio:** Remind the AI that `og:image` files should ideally be 1200x630 (1.91:1) to prevent cropping on social cards.
- **Title Concatenation:** Ensure the SEO logic dynamically appends the brand suffix (e.g., passing "Login" generates "Login | MyApp").
