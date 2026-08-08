# The 18 House — MERN Stack (with Admin Dashboard)

A full MERN (MongoDB, Express, React, Node) build of the restaurant site,
now with a secure admin dashboard for managing content and viewing
customer data, Cloudinary-backed image uploads, and automatic booking
emails.

## What's included

| Area | Details |
|---|---|
| Public site | Home page, Menu page — same design, layout, copy, and animations as the original |
| Admin auth | Email + password login (JWT), credentials seeded manually into MongoDB — no public signup |
| Stories manager | Admin uploads images (via Cloudinary) to control the homepage/menu "Stories" marquee |
| Menu manager | Admin creates/edits/deletes menu categories and dishes, each category has its own Cloudinary image |
| Bookings | Every reservation form submission is saved to MongoDB, visible/manageable in the dashboard, and emailed |
| Subscribers | Every footer newsletter signup is saved to MongoDB and visible in the dashboard |
| Email | Booking submissions send a notification to the restaurant + a confirmation copy to the guest, via Gmail/Nodemailer |
| Images | All uploads (stories, category photos) go to Cloudinary — no local file storage needed |

## Project structure

```
the18house-mern/
├── server/                       Express + Mongoose API
│   ├── config/
│   │   ├── db.js                  MongoDB connection
│   │   └── cloudinary.js          Cloudinary config + upload/delete helpers
│   ├── middleware/
│   │   ├── requireAdmin.js        JWT auth guard for /api/admin/* routes
│   │   └── upload.js              Multer (memory storage) for image uploads
│   ├── models/
│   │   ├── Admin.js                Admin login (bcrypt-hashed password)
│   │   ├── Category.js             Menu category + embedded dishes
│   │   ├── Story.js                 Homepage "Stories" marquee images
│   │   ├── Booking.js               Table reservations
│   │   └── Subscriber.js            Newsletter emails
│   ├── routes/
│   │   ├── auth.js                  POST /api/auth/login, GET /api/auth/me
│   │   ├── menu.js                  Public menu read endpoints
│   │   ├── stories.js               Public stories read endpoint
│   │   ├── bookings.js              Public booking submission (+ triggers email)
│   │   ├── subscribe.js             Public newsletter signup
│   │   └── admin/                   All protected, require a valid admin JWT
│   │       ├── upload.js             POST image -> Cloudinary
│   │       ├── stories.js            Stories CRUD
│   │       ├── categories.js         Category + dish CRUD
│   │       ├── bookings.js           List/update-status/delete bookings
│   │       └── subscribers.js        List/delete subscribers
│   ├── utils/
│   │   ├── jwt.js                    Sign/verify admin session tokens
│   │   └── mailer.js                 Nodemailer booking notification emails
│   ├── data/menuSeedData.js         Starter menu content
│   ├── seed.js                       Seeds the menu (npm run seed)
│   ├── seedAdmin.js                  Seeds the admin login (npm run seed:admin)
│   └── server.js                     App entry point
└── client/                       React + Vite frontend
    ├── public/images/             Original images + vid.mp4
    └── src/
        ├── api/client.js          fetch() wrapper (public + admin endpoints, auth token handling)
        ├── context/AuthContext.jsx Admin session state
        ├── components/            Public site components + components/admin/* (uploader, modal, dish form, route guard)
        ├── pages/                  Home.jsx, Menu.jsx + pages/admin/* (login, layout, overview, stories, menu, bookings, subscribers)
        ├── hooks/                  Ported script.js animation behaviors
        └── styles/                 style.css (public site) + admin.css (dashboard)
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB instance (local `mongod`, or a free MongoDB Atlas cluster)
- A Cloudinary account (free tier is fine)
- A Gmail account to send booking emails from (with an **App Password** — see below)

## 2. Backend setup

```bash
cd server
cp .env.example .env
npm install
```

Now edit `server/.env`:

- **`MONGO_URI`** — your MongoDB connection string.
- **`JWT_SECRET`** — replace with a long random string (this signs admin login sessions).
- **`CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY`** — already filled in from your dashboard. **`CLOUDINARY_API_SECRET`** — copy this from your Cloudinary dashboard's *Product Environment Credentials* panel (click the eye icon to reveal it) and paste it in; it's masked in dashboard screenshots so it isn't something anyone else can read off a screen.
- **`EMAIL_USER`** — `thehouseof18th@gmail.com` (already set).
- **`EMAIL_APP_PASSWORD`** — a Gmail **App Password**, not the account's normal password:
  1. On the `thehouseof18th@gmail.com` account, turn on 2-Step Verification (Google Account → Security).
  2. Go to Google Account → Security → App Passwords.
  3. Create one for "Mail", copy the 16-character password, and paste it here.
- **`ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` / `ADMIN_SEED_NAME`** — the login you want for the dashboard. Change the password to something strong before seeding.

Then seed the menu and create the admin login:

```bash
npm run seed          # loads the starter menu into MongoDB
npm run seed:admin    # creates the admin user from ADMIN_SEED_* in .env
npm run dev            # starts the API on http://localhost:5000
```

`seed:admin` is safe to re-run — if the email already exists it just updates the password/name instead of duplicating the account. There is no admin signup route on purpose; the only way to create or reset an admin login is this script, run directly against your database.

## 3. Frontend setup

In a second terminal:

```bash
cd client
cp .env.example .env    # VITE_API_URL can stay blank in dev (Vite proxy handles /api)
npm install
npm run dev              # starts React on http://localhost:5173
```

- Public site: http://localhost:5173
- Admin login: http://localhost:5173/admin/login — sign in with the `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` you set above.

## 4. Using the admin dashboard

Once logged in you land on **Overview**, with a sidebar for:

- **Stories** — upload an image (goes straight to Cloudinary), give it a title and display order, and it appears in the homepage/menu-page marquee immediately. Toggle "Visible on site" to hide without deleting.
- **Menu & Categories** — create a category (name, slug, description, image position, featured image), then add/edit/delete individual dishes inside it. Deleting a category removes its dishes and its Cloudinary image.
- **Bookings** — every reservation submitted on the site shows up here with contact details, requested date/time, and message. Change status between Pending/Confirmed/Cancelled, or delete a record.
- **Subscribers** — every footer newsletter signup, with the ability to remove one.

## 5. How booking emails work

When a guest submits the reservation form:
1. The booking is saved to MongoDB (visible instantly in the admin dashboard).
2. An email with the full booking details is sent to `ADMIN_NOTIFICATION_EMAIL` (defaults to `thehouseof18th@gmail.com`).
3. A confirmation copy is sent to the guest's own email address.

If `EMAIL_USER` / `EMAIL_APP_PASSWORD` aren't set, the booking still saves successfully — the server just logs a warning and skips sending email, so local development never breaks over missing email credentials.

## 6. Production build

```bash
cd client
npm run build            # outputs static files to client/dist
```

Serve `client/dist` with any static host, and set `VITE_API_URL` (in `client/.env`, before building) to your deployed API's base URL if the frontend and backend aren't on the same origin. Also update `CLIENT_ORIGIN` in `server/.env` to your deployed frontend's URL so CORS allows it.

## API reference

**Public**

| Method | Route | Description |
|---|---|---|
| GET | `/api/menu` | All categories with their dishes |
| GET | `/api/menu/:id` | A single category by slug |
| GET | `/api/stories` | Active stories, in display order |
| POST | `/api/bookings` | Create a reservation (triggers emails) |
| POST | `/api/subscribe` | Add an email to the newsletter list |
| POST | `/api/auth/login` | Admin login → returns a JWT |
| GET | `/api/health` | Health check |

**Admin** (all require `Authorization: Bearer <token>`)

| Method | Route | Description |
|---|---|---|
| GET | `/api/auth/me` | Confirm current session |
| POST | `/api/admin/upload` | Upload an image to Cloudinary (`multipart/form-data`, field `image`) |
| GET/POST | `/api/admin/stories` | List / create stories |
| PUT/DELETE | `/api/admin/stories/:id` | Update / delete a story |
| GET/POST | `/api/admin/categories` | List / create menu categories |
| PUT/DELETE | `/api/admin/categories/:id` | Update / delete a category |
| POST | `/api/admin/categories/:id/dishes` | Add a dish |
| PUT/DELETE | `/api/admin/categories/:id/dishes/:dishId` | Update / delete a dish |
| GET | `/api/admin/bookings` | List all bookings |
| PATCH | `/api/admin/bookings/:id` | Update booking status |
| DELETE | `/api/admin/bookings/:id` | Delete a booking |
| GET | `/api/admin/subscribers` | List all subscribers |
| DELETE | `/api/admin/subscribers/:id` | Remove a subscriber |

## Notes

- All animations from the original `script.js` (hero zoom intro, scroll-reveal, video play/pause + scroll-expand, menu filter/search) are preserved as React hooks — nothing was dropped in the MERN conversion.
- Admin passwords are hashed with bcrypt before storage; sessions are stateless JWTs stored in the browser's `localStorage`.
- Multer stores uploads in memory (never touches disk) and streams them straight to Cloudinary; deleting a story/category also deletes its Cloudinary asset.
