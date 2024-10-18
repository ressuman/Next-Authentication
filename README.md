# Next.js Authentication

This project is a Next.js 14 application utilizing NextAuth for authentication. It includes user login, signup, and password change functionalities, integrated with a MongoDB database.

## Table of Contents

- [Next.js Authentication](#nextjs-authentication)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Folder Structure](#folder-structure)
  - [Setup](#setup)
  - [Usage](#usage)
  - [API Routes](#api-routes)
  - [Contributing](#contributing)
  - [Getting Started](#getting-started)
  - [Learn More](#learn-more)
  - [Deploy on Vercel](#deploy-on-vercel)

## Features

- User registration with email and password.
- User login with session management.
- Password change functionality for logged-in users.
- Responsive layout with Next.js pages.

## Technologies Used

- **Next.js** - A React framework for server-side rendering and static site generation.
- **NextAuth.js** - Authentication library for Next.js.
- **MongoDB** - NoSQL database for storing user data.
- **bcryptjs** - Library for hashing passwords.

## Folder Structure

```plaintext
components/
├── auth/
│   └── auth-form.js
│   └── auth-form.module.css
├── layout/
│   └── layout.js
│   └── main-navigation.js
│   └── main-navigation.module.css
├── profile/
│   ├── profile-form/
│   │   └── profile-form.js
│   │   └── profile-form.module.css
│   ├── user-profile/
│   │   └── user-profile.js
│   │   └── user-profile.module.css
└── starting-page/
    └── starting-page.js
    └── starting-page.module.css

helpers/
├── user/
│   ├── changePassword.js
│   ├── createUser.js
│   └── logInUser.js
└── hash.js

lib/
└── db.js

pages/
├── api/
│   ├── auth/
│   │   └── [...nextauth].js
│   │   └── signUp.js
│   └── user/
│       └── change-password.js
├── auth/
│   └── index.js
├── profile/
│   └── index.js
├── _app.js
├── _document.js
└── index.js

public/
└── favicon.ico

styles/
└── globals.css
```

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   MONGO_DB_URL=<your_mongodb_connection_string>
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<your_nextauth_secret>
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

   Your app will be available at `http://localhost:3000`.

## Usage

- Navigate to `/auth` to log in or create a new account.
- After logging in, users will be redirected to their profile page, where they can change their password.

## API Routes

- **POST** `/api/auth/signUp` - Register a new user.
- **PATCH** `/api/user/change-password` - Change the current user's password.
- **GET** `/api/auth/[...nextauth]` - Handle authentication using NextAuth.js.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features or improvements you'd like to suggest.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
