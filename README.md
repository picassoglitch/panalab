This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Dominio

El dominio de producción es **https://panalab.mx** y se configura en un solo
lugar: `lib/site.ts`. De ahí lo toman el `metadataBase` del layout, las URLs
canónicas de cada página, `app/sitemap.ts` y `app/robots.ts`.

Para apuntar a otro dominio (staging, pruebas):

```bash
NEXT_PUBLIC_SITE_URL=https://staging.panalab.mx npm run build
```

El despliegue es en Vercel. Para conectar el dominio: en el proyecto de Vercel,
Settings → Domains → agregar `panalab.mx`; Vercel muestra los registros DNS
(un A para el ápice y un CNAME para `www`) que debe capturar quien administre
el DNS del dominio. El CNAME es distinto para cada proyecto de Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
