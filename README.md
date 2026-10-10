# Housing Matra

Housing Matra is a real-estate website for finding verified, premium apartments in India. Visitors can browse featured and full property listings, filter and search them, read about the company's projects, and get in touch to arrange a site visit.

**Live site:** [housing-matra.vercel.app](https://housing-matra.vercel.app)

## Features

- Home page with a hero section and handpicked featured apartments
- Properties page with search and filters
- Projects page showcasing developments
- Contact page for inquiries
- Simple buying journey: select a location, explore verified homes, connect via WhatsApp, schedule a site visit
- Property data stored in MongoDB
- Image upload and delivery through ImageKit
- Smooth animations with Framer Motion
- Responsive layout styled with Tailwind CSS

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | MongoDB with Mongoose |
| Media | ImageKit |
| UI | Framer Motion, Lucide React |
| Hosting | Vercel |

## Project Structure

```
housing-matra/
├── app/            Pages and layouts (home, properties, projects, contact)
├── backend/        Server-side logic and models
├── components/     Reusable UI components
├── data/           Static data
├── lib/            Helpers and database connection
├── public/         Static assets
├── next.config.ts
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A MongoDB database (local or MongoDB Atlas)
- An ImageKit account (for image uploads)

### 1. Clone and install

```bash
git clone https://github.com/irfanstl/housing-matra.git
cd housing-matra
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root. Never commit it.

```env
MONGODB_URI=your-mongodb-connection-string
IMAGEKIT_PUBLIC_KEY=your-public-key
IMAGEKIT_PRIVATE_KEY=your-private-key
IMAGEKIT_URL_ENDPOINT=your-url-endpoint
```

These names are typical placeholders. Check the files in `lib/` and `backend/` for the exact variable names the code reads, and rename them here to match.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Deployment

The site is deployed on Vercel. To deploy your own copy:

1. Push the repo to GitHub.
2. Import it on [vercel.com](https://vercel.com).
3. Add the same environment variables in **Project Settings → Environment Variables**.
4. Deploy. Every push to `main` redeploys automatically.

## Contributing

Pull requests are welcome. For larger changes, open an issue first to discuss what you would like to change.

## License

No license has been specified yet. Add a `LICENSE` file (for example MIT) to state how others may use this code.
