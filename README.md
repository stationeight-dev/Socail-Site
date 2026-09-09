# Station Eight Labs

Marketing site for Station Eight Labs: custom software services plus a product waitlist. Next.js App Router, English / French, light and dark theme.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). French lives at `/fr`.

## Brand

Logo and colours in `DESIGN.md` and `src/app/globals.css` are a **working Hut 8 / paper-and-signal system**. Swap them when the official files arrive. The 8-dot mark is in `src/components/logo.tsx`.

## Stack

- Next.js 16, React 19, Tailwind v4
- `next-intl` (`/en` omitted, `/fr` prefixed)
- `next-themes`
- Motion for React
- Content as typed catalogs in `src/content/` so new service or industry pages are data, not new templates

## Contact

The enquiry form validates and logs on the server. Wire email (Resend/SMTP) in `src/lib/actions.ts` when ready. Optional Calendly URL: `NEXT_PUBLIC_CALENDLY_URL`.
