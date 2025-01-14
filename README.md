# AI Chat Application

A modern chat application built with Next.js that leverages AI capabilities to provide intelligent conversations.

## 🚀 Features

- Real-time chat interface
- AI-powered responses using advanced language models
- Message history persistence
- Responsive design for all devices
- Dark/Light theme support
- Markdown message formatting

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Authentication:** NextAuth.js
- **AI Integration:** OpenAI API
- **Deployment:** Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.0.0 or higher)
- npm or yarn or pnpm
- Git

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ai-chat-app.git
   cd ai-chat-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables in `.env.local`

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key
NEXTAUTH_SECRET=your_nextauth_secret
```

## 📁 Project Structure

```
├── app/
│   ├── api/
│   ├── chat/
│   ├── components/
│   └── layout.tsx
├── lib/
├── public/
└── types/
```

## 🧪 Running Tests

```bash
npm run test
# or
yarn test
# or
pnpm test
```

## 🚀 Deployment

The easiest way to deploy this application is using the [Vercel Platform](https://vercel.com):

1. Push your code to a GitHub repository
2. Import your project into Vercel
3. Add your environment variables
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for the hosting platform
- OpenAI for the AI capabilities

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/ai-chat-app](https://github.com/yourusername/ai-chat-app)
