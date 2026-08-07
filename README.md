# The 18 House — MERN Stack

A full MERN (MongoDB, Express, React, Node) conversion of the original
PHP/static site (`index.php`, `menu.php`, `data.js`, `script.js`,
`style.css`). The visual design, copy, animations, and layout are
preserved exactly — only the stack underneath changed:

| Before (PHP)                          | After (MERN)                                   |
|----------------------------------------|-------------------------------------------------|
| `index.php`, `menu.php`, `footer.php`  | React components + React Router pages           |
| `data.js` (hardcoded menu)             | MongoDB `categories` collection, served via API |
| Reservation `<form action="#">`        | `POST /api/bookings` saved to MongoDB           |
| Footer subscribe `<form action="#">`   | `POST /api/subscribe` saved to MongoDB          |
| `script.js` (vanilla JS, DOM queries)  | React hooks (`useHeroZoom`, `useScrollAnimations`, etc.) |
| `style.css`                            | Same file, imported unchanged into React        |

## Project structure

```
the18house-mern/
├── server/                 Express + Mongoose API
│   ├── config/db.js        MongoDB connection
│   ├── models/              Category, Booking, Subscriber schemas
│   ├── routes/              /api/menu, /api/bookings, /api/subscribe
│   ├── data/menuSeedData.js Menu content (converted from data.js)
│   ├── seed.js              Seeds MongoDB from menuSeedData.js
│   └── server.js            App entry point
└── client/                 React + Vite frontend
    ├── public/images/       All original images + vid.mp4
    └── src/
        ├── api/client.js    fetch() wrapper for the API
        ├── components/      Nav, Hero, About, VideoShowcase, Menu cards,
        │                    Stories marquee, Testimonials, Booking form,
        │                    Footer, WhatsApp float, etc.
        ├── hooks/            Ported script.js behaviors as React hooks
        ├── pages/            Home.jsx (index.php) and Menu.jsx (menu.php)
        └── styles/style.css  Original stylesheet, unchanged
```

## Prerequisites

- Node.js 18+
- A MongoDB instance (local `mongod`, or a free MongoDB Atlas cluster)

## 1. Backend setup

```bash
cd server
cp .env.example .env       # then edit MONGO_URI if needed
npm install
npm run seed                # loads the menu into MongoDB (one-time / re-run to reset)
npm run dev                  # starts the API on http://localhost:5000
```

## 2. Frontend setup

In a second terminal:

```bash
cd client
cp .env.example .env         # VITE_API_URL can stay blank in dev (Vite proxy handles /api)
npm install
npm run dev                  # starts React on http://localhost:5173
```

Open http://localhost:5173 — the homepage and `/menu` page will now be
served by React, with the menu content and booking/subscribe forms backed
by MongoDB through the Express API.

## 3. Production build

```bash
cd client
npm run build                # outputs static files to client/dist
```

Serve `client/dist` with any static host (Nginx, Vercel, Netlify, or
Express's own `express.static`), and point `VITE_API_URL` at your deployed
API's base URL before building if the API isn't on the same origin.

## API reference

| Method | Route              | Description                              |
|--------|--------------------|-------------------------------------------|
| GET    | `/api/menu`        | All categories with their dishes          |
| GET    | `/api/menu/:id`     | A single category by slug (`starters`, `chinese`, ...) |
| POST   | `/api/bookings`     | Create a table reservation                |
| GET    | `/api/bookings`     | List all reservations (admin/back-office) |
| POST   | `/api/subscribe`    | Add an email to the newsletter list       |
| GET    | `/api/health`       | Health check                              |

## Notes

- All animations from `script.js` (hero zoom-in intro, scroll-reveal
  sections, video play/pause + scroll-expand, and the menu filter/search)
  were ported 1:1 into React hooks/components — no behavior was dropped.
- The 5 menu categories and every dish from the original `data.js` are
  preserved in `server/data/menuSeedData.js`.
- `images/` and `vid.mp4` are copied as-is into `client/public/images/`.
