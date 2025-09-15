# Ferias de Montevideo

A modern web application showcasing the vibrant markets and fairs of Montevideo, Uruguay. Built with Next.js, TypeScript, and Tailwind CSS.

## 🏪 About

This project provides an interactive guide to Montevideo's traditional markets and fairs, featuring detailed information about each location, operating hours, specialties, and more. Discover the cultural richness and local flavors that make Montevideo's markets unique.

## ✨ Features

- **Interactive Market Directory**: Browse through various markets and fairs in Montevideo
- **Detailed Information**: Get comprehensive details about each market including location, hours, and specialties
- **Modern UI/UX**: Clean, responsive design built with Tailwind CSS
- **TypeScript Support**: Fully typed for better development experience
- **Mobile Responsive**: Optimized for all device sizes

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/feriasdemontevideo.git
cd feriasdemontevideo
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Runtime**: [React 19](https://react.dev/)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable React components
│   ├── Header.tsx      # Site header
│   └── MarketsSection.tsx # Markets display component
└── data/              # Data and types
    ├── markets.ts     # Market data
    ├── types.ts       # TypeScript type definitions
    └── index.ts       # Data exports
```

## 🎨 Development

The page auto-updates as you edit files. You can start editing by modifying `src/app/page.tsx`.

### Available Scripts

- `bun dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server

## 📱 Features in Development

- [ ] Interactive map integration
- [ ] Market search and filtering
- [ ] User reviews and ratings
- [ ] Event calendar
- [ ] Multi-language support (Spanish/English)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with ❤️ for Montevideo's market community
