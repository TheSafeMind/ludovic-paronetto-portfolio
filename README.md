# Ludovic Paronetto — Personal umbrella brand

A premium, multilingual portfolio for Ludovic Paronetto: author, entrepreneur and business transformation lead.

## Stack

- Next.js 14 (App Router)
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

## Content structure

- `lib/i18n.ts` contains all Dutch, English and French copy and external links.
- `components/` contains shared navigation, footer, motion and visual components.
- `app/[lang]/` contains the seven localized page routes.
- `public/book-cover.jpg` is the book artwork used on the book page.

Before publishing, confirm the public contact email in `lib/i18n.ts`.
