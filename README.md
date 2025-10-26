
# Personal Page

A serverless full-stack portfolio built with React, TypeScript, and Sanity CMS, deployed on Vercel.  
The project is designed to be fast, modular, and content-driven — powered by a custom CMS schema that enables dynamic updates without touching the codebase.

---

## Features

- Serverless architecture using Vercel Functions  
- Sanity CMS integration for dynamic content (about, projects, skills, etc.)  
- React + TypeScript front-end with modular architecture  
- Framer Motion animations for smooth transitions  
- SCSS styling and responsive layout for all screen sizes  
- Optimized assets and caching for faster load times  
- Dark mode support  
- Custom hooks, reusable components, and clean data layer  

---

## Tech Stack

**Frontend**
- React 18  
- TypeScript  
- Vite  
- Framer Motion  
- SCSS Modules  

**Backend / CMS**
- Sanity.io (Headless CMS)  
- Vercel Serverless Functions  

**Platform**
- Hosted and deployed via Vercel  

---

## Project Structure

```bash
react_front/
├── api/                     # Serverless API routes (Vercel functions)
│   ├── getAbout.ts
│   ├── getBrand.ts
│   ├── getExperience.ts
│   ├── getSkill.ts
│   ├── getTestimonial.ts
│   ├── getWork.ts
│   └── postContact.ts
│
├── lib/                     # Sanity and Vercel integration clients
│   ├── sanity/
│   ├── sanityPublic/
│   └── vercel/
│
├── public/                  # Public static assets
│   ├── logo-full-color.svg
│   ├── logo.svg
│   └── vite.svg
│
├── src/
│   ├── assets/              # Optimized images and icons
│   ├── components/          # Reusable UI components
│   ├── constants/           # Shared constants and config
│   ├── containers/          # Main page sections (About, Work, Skills, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── wrapper/             # Layout wrappers (AppWrap, MotionWrap)
│   ├── App.tsx
│   ├── App.scss
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
└── README.md
```

----------

## CMS Structure

The Sanity Studio defines the structure of content displayed on the site.  
Each document corresponds to a section in the portfolio.

```bash
backend_sanity/
├── sanity.config.ts          # Sanity Studio configuration
├── sanity.cli.ts             # CLI configuration
├── schemaTypes/              # Document schemas
│   ├── about.ts
│   ├── brands.ts
│   ├── contact.ts
│   ├── experiences.ts
│   ├── skills.ts
│   ├── testimonials.ts
│   ├── workExperience.ts
│   └── works.ts
└── static/                   # Static studio assets
```

All schema files are defined in `backend_sanity/schemaTypes/` and registered in the `schemaTypes` array via `index.ts`.  
The Sanity Studio runs locally within the `backend_sanity` directory and is not published publicly.

----------

## Environment Variables

Create a `.env` file in your project root (or use Vercel’s Environment Variables panel):

```
SANITY_CLIENT_API_ID="your-sanity-api-id"
SANITY_CLIENT_API_TOKEN="your-sanity-api-token"
VITE_SANITY_CLIENT_API_ID="your-public-sanity-api-id"
VITE_CACHE_API_KEY="your-unique-cache-key-prefix"
```

### Variable Notes

-   `SANITY_CLIENT_API_ID` and `SANITY_CLIENT_API_TOKEN` are used for serverless API access (read/write).
    
-   `VITE_SANITY_CLIENT_API_ID` is the public key for client-side fetches via CDN.
    
-   `VITE_CACHE_API_KEY` is an optional unique prefix for API caching on the frontend.
    

----------

## Local Development

During development, use Vercel’s integrated environment instead of the standard Vite server.  
This ensures both the frontend and all serverless API routes work together exactly as they do in production.

```bash
vercel dev
```

The local preview will be available at:  
`http://localhost:3000`

This command emulates the full Vercel setup, including API routes from the `/api` directory.

If you only need to run the frontend (without serverless functions), you can still use:

```bash
npm run dev
```

Note: In this mode, serverless API routes will not be available.

----------

## Build and Deploy

To create a manual production build:

```bash
npm run build
```

Deployment is typically managed automatically through Vercel.  
Each push to the **main** branch triggers:

-   A **build** process
    
-   A **preview deployment** for the branch
    
-   A **production deployment** once merged into `main`
    

Vercel automatically provides unique preview URLs for testing each branch before production.

----------


## Scripts

| Command | Description |
|:--------|:------------|
| `vercel dev` | Runs the full local environment (frontend + serverless functions). |
| `npm run dev` | Starts only the frontend for UI development. |
| `npm run build` | Builds the app for production. |
| `npm run preview` | Serves a locally built production preview. |

----------

## License

MIT License
Copyright (c) 2025 SasadaDev

----------

## Contact

If you would like to discuss ideas, collaborate, or share feedback, feel free to reach out.  
This project is deployed on Vercel as a serverless personal portfolio page.

