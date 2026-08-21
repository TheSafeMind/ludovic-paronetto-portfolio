# Ludovic Paronetto — Personal umbrella brand

A premium, multilingual portfolio for Ludovic Paronetto: author, entrepreneur and business transformation lead.

## Stack

- Next.js 16 (App Router, patched Active LTS)
- TypeScript
- Tailwind CSS
- Framer Motion
- Inter Variable

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/nl`. The English and French versions are available at `/en` and `/fr`.

## Production build

```bash
npm run build
npm run start
```

## Pre-publish checks

```bash
npm run check
npm run audit:prod
```

With the production server running, verify every localized and metadata route:

```bash
npm run test:smoke
```

Set `NEXT_PUBLIC_SITE_URL` to the canonical public origin. The committed example points to `https://ludovicparonetto.com`.

## Content structure

- `lib/i18n.ts` contains all Dutch, English and French copy and external links.
- `components/` contains shared navigation, footer, motion and visual components.
- `app/[lang]/` contains the seven localized page routes.
- `public/book-cover.jpg` is the book artwork used on the book page.

Before the public release, confirm and add the official business name, registered address, enterprise number and VAT number where applicable. These details are intentionally not guessed.

Before publishing, confirm the public contact email in `lib/i18n.ts`.
