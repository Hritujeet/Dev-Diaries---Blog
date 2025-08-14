# Dev Diaries
https://youtu.be/K8uNYGyINE0?si=5sVVy1btBbWBEO-x

A personal blog + portfolio website built with Next.js, NextAuth, Express, Prisma, and PostgreSQL.
It combines a professional portfolio with a dynamic blogging platform, enabling readers to interact through comments, likes, and saved posts while giving the admin full control over content and profile presentation.

## 🚀 Features

### Public Features
- 📰 **View Blog Posts** – Browse all published blog posts
- ❤️ **Like Posts** – Show appreciation for your favorite articles
- 💬 **Comment on Posts** – Engage with the author and other readers
- 🔖 **Save Posts** – Bookmark articles for later reading (requires login)
- 📂 **View Projects** – Explore the portfolio of showcased projects
- 📜 **About Page** – Learn more about the author

### User Features
- 🔑 **Authentication** – Secure login/signup with NextAuth
- 📌 **Personal Saved Posts** – Access your bookmarked articles anytime
- 💬 **Comment Management** – Add and view your own comments on blog posts

### Admin Features
- ✍️ **Create, Edit, Delete Blog Posts**
- 📂 **Manage Projects** – Add or update portfolio projects
- 📝 **Update About Info** – Keep personal details up to date
- 🔍 **Moderate Comments** – Remove unwanted or inappropriate comments

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Authentication**: NextAuth.js
- **Backend**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: [Your CSS framework - Tailwind CSS/Styled Components/etc.]
- **Deployment**: [Your deployment platform - Vercel/Netlify/etc.]

## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

## ⚡ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dev-diaries.git
   cd dev-diaries
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/devdiaries"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # OAuth Providers (if using)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
dev-diaries/
├── components/           # Reusable React components
├── pages/               # Next.js pages and API routes
│   ├── api/            # API endpoints
│   ├── auth/           # Authentication pages
│   ├── blog/           # Blog-related pages
│   └── admin/          # Admin dashboard pages
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── styles/             # Global styles
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── lib/                # Configuration files
```

## 🔧 Configuration

### Database Schema

The application uses the following main models:
- **User**: User accounts and authentication
- **Post**: Blog posts with metadata
- **Comment**: User comments on posts
- **Like**: Post likes/reactions
- **SavedPost**: User's bookmarked posts
- **Project**: Portfolio projects

### Authentication

NextAuth is configured to support:
- Email/password authentication
- OAuth providers (Google, GitHub, etc.)
- JWT tokens for session management

## 🚀 Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set up your production database
3. Run database migrations in production
4. Start the application:
   ```bash
   npm start
   ```

## 📝 Usage

### For Readers
1. Visit the homepage to browse blog posts
2. Click on any post to read the full article
3. Like posts and leave comments
4. Sign up to save posts for later reading

### For Admin
1. Log in with admin credentials
2. Access the admin dashboard
3. Create new blog posts with markdown support
4. Manage projects in your portfolio
5. Moderate comments and update site content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

⭐ **Star this repo if you find it helpful!**
