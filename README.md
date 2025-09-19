# Ferias en Montevideo 🏪

A modern, interactive web application showcasing the vibrant markets and fairs of Montevideo, Uruguay. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

### 🗺️ Interactive Map & Navigation
- **Interactive Map**: Explore markets on an interactive map with custom markers
- **Location-based Filtering**: Filter markets by neighborhood with smart day selection
- **Address Input**: Enter your location to see distances to all markets
- **Current Location**: Use your device's GPS to find nearby markets

### 📅 Smart Day & Neighborhood Filtering
- **Contextual Day Selection**: When you select a neighborhood, only days with markets in that area are active
- **Automatic Day Switching**: If your selected day has no markets in the chosen neighborhood, it automatically switches to the first available day
- **Visual Feedback**: Days without markets are clearly marked as "Sin ferias"

### 🏪 Market Information
- **Detailed Market Pages**: Comprehensive information for each market including location, neighborhood, and operating days
- **Related Markets**: Discover similar markets in the same neighborhood or on the same day
- **Distance Calculation**: See how far each market is from your location
- **Google Maps Integration**: Get directions directly to any market

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Sidebar Navigation**: Clean, organized interface with collapsible sidebar
- **Card & Map Views**: Switch between card grid and interactive map views
- **Smooth Animations**: Polished interactions and transitions

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/codeplaygroundspace/feriasdemontevideo.git
cd feriasdemontevideo
```

2. **Install dependencies:**
```bash
bun install
```

3. **Run the development server:**
```bash
bun dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Maps**: [Leaflet](https://leafletjs.com/) with React Leaflet
- **Icons**: [Lucide React](https://lucide.dev/)
- **Runtime**: [React 19](https://react.dev/)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with sidebar
│   ├── page.tsx           # Home page with main interface
│   ├── market/            # Market detail pages
│   │   ├── layout.tsx     # Market-specific layout
│   │   └── [slug]/        # Dynamic market pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── AddressInput.tsx  # Location input component
│   ├── MarketsMap.tsx    # Interactive map component
│   ├── MarketsCardGrid.tsx # Market cards grid
│   ├── MarketPage.tsx    # Individual market page
│   └── NeighborhoodDropdown.tsx # Neighborhood selector
├── data/                 # Data and types
│   ├── markets.ts        # Market data
│   ├── neighborhoods.ts  # Neighborhood data
│   ├── days.ts          # Day names and colors
│   └── types.ts         # TypeScript definitions
├── hooks/               # Custom React hooks
│   ├── useMarkets.ts    # Market-related logic
│   └── useAddressGeocoding.ts # Location services
└── lib/                 # Utility functions
    ├── distance.ts      # Distance calculations
    ├── market-utils.ts  # Market utilities
    └── utils.ts         # General utilities
```

## 🎯 Key Features Explained

### Smart Filtering System
The application features an intelligent filtering system that adapts based on your selections:
- Select a **neighborhood** → Only days with markets in that area become active
- Select a **day** → See all markets operating on that day
- Enter your **location** → View markets sorted by distance

### Interactive Map
- **Custom Markers**: Each market has a colored marker based on its operating day
- **Clickable Popups**: Click any marker to see market details and get directions
- **Distance Visualization**: See how far each market is from your location
- **Responsive Design**: Works seamlessly on all device sizes

### Market Detail Pages
- **Comprehensive Information**: Location, neighborhood, operating days
- **Related Markets**: Discover similar markets nearby
- **Google Maps Integration**: One-click directions
- **Full-width Layout**: Optimized for detailed information display

## 🎨 Development

### Available Scripts

- `bun dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

### Development Workflow

1. **Start the development server**: `bun dev`
2. **Make changes**: Edit files in `src/`
3. **See updates**: The page auto-updates as you edit
4. **Test features**: Use the interactive map and filtering system

## 🌟 Recent Updates

- ✅ **Interactive Map Integration**: Full Leaflet integration with custom markers
- ✅ **Smart Neighborhood Filtering**: Context-aware day selection
- ✅ **Location Services**: Address input and GPS location support
- ✅ **Market Detail Pages**: Comprehensive individual market information
- ✅ **Responsive Design**: Mobile-optimized interface
- ✅ **Distance Calculations**: Real-time distance from user location

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Test on multiple devices and browsers
- Follow the existing code structure and naming conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/codeplaygroundspace/feriasdemontevideo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/codeplaygroundspace/feriasdemontevideo/discussions)

## 🙏 Acknowledgments

- **Montevideo Markets**: For providing the inspiration and data
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **shadcn/ui**: For the beautiful component library
- **Leaflet**: For the interactive mapping capabilities

---

Built with ❤️ for Montevideo's vibrant market community

*Discover the cultural richness and local flavors that make Montevideo's markets unique.*