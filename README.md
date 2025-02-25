# 🚀 Seekr-board

Welcome to **Seekr-board** – your go-to job posting and management platform! Whether you're a recruiter looking to post jobs or a job seeker searching for opportunities, Seekr-board has got you covered.

This project is built with **Next.js**, ensuring fast performance, server-side rendering, and a seamless user experience.

---

## 🛠 Installation Guide

Before you begin, make sure you have the following installed:
- **Node.js** (>= 18.x recommended) → [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** (optional)
- **Git** (optional, but recommended) → [Download here](https://git-scm.com/)

### 1️⃣ Clone the Repository
First, open your terminal and clone the repository:
```sh
 git clone https://github.com/yourusername/seekr-board.git
```

### 2️⃣ Navigate to the Project Directory
```sh
 cd seekr-board
```

### 3️⃣ Install Dependencies
Run one of the following commands to install the required packages:
```sh
# Using npm
 npm install

# OR using yarn
 yarn install
```

---

## 🚀 Running the Application

### 4️⃣ Start the Development Server
Once dependencies are installed, start the Next.js development server:
```sh
# Using npm
 npm run dev

# OR using yarn
 yarn dev
```
This will start the application at **http://localhost:3000/**. Open this URL in your browser to see Seekr-board in action!

### 5️⃣ Running in Production Mode
For a production-ready build, run:
```sh
 npm run build
 npm start
```
This will optimize and serve the application for production use.

---

## 🎯 Features
- 🌟 **Post & Manage Job Listings** – Create, edit, and delete job posts effortlessly.
- 🔍 **Search & Apply** – Browse job listings and apply with ease.
- ⚡ **Fast Performance** – Powered by Next.js for optimized speed and efficiency.
- 🔄 **Server Actions & Revalidation** – Ensures fresh and updated job listings.

---

## ⚙️ Environment Variables
To run the project smoothly, you may need to set up environment variables. Create a `.env.local` file in the root directory and add your API keys or database URLs:
```sh
NEXT_PUBLIC_API_URL=https://your-api-url.com
DATABASE_URL=your_database_connection_string
```

---

## 📌 Additional Commands

### ✅ Linting & Formatting
```sh
 npm run lint   # Check for linting issues
 npm run format # Auto-format the code
```

### 🧪 Running Tests (if applicable)
```sh
 npm test
```

---

## 🤝 Contributing
We’d love your contributions! Feel free to open issues, suggest improvements, or submit pull requests. Let’s build something great together. 💡🚀

---

## 🛠 Tech Stack
- **Next.js** – Frontend framework
- **React** – UI library
- **TailwindCSS** – Styling framework
- **ShadCN/UI** – Component library
- **PostgreSQL / MongoDB** – Database (choose as per your setup)

---

Happy coding! 🎉

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Database design:

-- Table for storing job listings

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100),
  location VARCHAR(100),
  salary_range VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing job applications

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  resume_link TEXT,
  cover_letter TEXT,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Backend architecture:

Server actions for - creatingNew job, applying job.
api routes - updateJob, deleteJob 
db actions - getJobs, getJobById, createApplication, getApplicationsByJobId, createJob

Frontend implementation:

actions - have db action code
components - have ui and project related components
other folders follow typical app router structure

Challenges faced:

1. Faced issue with params handling both in client and server components:

Solved them by reading the doc: https://nextjs.org/docs/messages/sync-dynamic-apis

2. Redirect err cathcing issue:

Solved them by reading doc: https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirect-function

3. Wanted to add some good notification, so converted some
components from server to client based components

Had issues changing from async to sync, adding directives
and some others - nextjs logs helped here

4. Type check issue for nextjs type system

Solved it adding updated expected types:

<!-- API Routes: Use context: { params: Promise<{ id: string > } and await context.params. -->

This was very strange as in locally running fine, but when
i try to build. Issue araised.
It was something like at runtime it resolves automatically to value, but type check time is is expected to be promise

5. Had issue reflecting the uptodate data in UI for both new job / delete job in production.
Similarly it was working fine locally, but not in production.

Solved it by reading / getting to know that nextjs by default heavily caches server components for optimization. so, i used revalidatePath()
and also added router refresh as well.

## Getting Started useful links for nextjs

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Seekr-job-board
Seekr-job-board - Seek your future
