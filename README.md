# Screenshot Tool - Frontend

A modern, professional website screenshot tool built with Next.js 15, TypeScript, and Tailwind CSS. This frontend application provides an intuitive interface for capturing high-quality screenshots of websites with customizable options and batch processing capabilities.

## Features

- **Single Screenshot Capture** - Take screenshots of individual websites with full customization
- **Batch Processing** - Process up to 10 URLs simultaneously and download as ZIP
- **Customizable Options** - Viewport size, image format, quality, full page capture
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode Support** - Built-in theme switching with system preference detection
- **Real-time Validation** - URL validation and error handling with user-friendly messages
- **Progress Tracking** - Visual feedback during screenshot processing
- **Direct Downloads** - No server storage, files download directly to your device

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Form Handling**: React Hook Form + Zod validation
- **API Client**: Axios + TanStack Query
- **Icons**: Lucide React
- **Theme**: next-themes

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm
- Screenshot Tool Backend API running on `http://localhost:3000`

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd screenly-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` if needed:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=Screenshot Tool
   NEXT_PUBLIC_APP_VERSION=1.0.0
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001) to see the application.

## Project Structure

```
src/
├── app/                     # Next.js 15 App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage with single screenshot tool
│   ├── batch/
│   │   └── page.tsx        # Batch screenshot page
│   ├── api-docs/
│   │   └── page.tsx        # API documentation
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── screenshot/         # Screenshot-specific components
│   ├── theme-provider.tsx  # Theme provider wrapper
│   └── query-provider.tsx  # React Query provider
├── lib/
│   ├── api.ts              # API functions and client
│   ├── constants.ts        # App constants and presets
│   ├── validations.ts      # Zod schemas and validation
│   └── utils.ts            # Utility functions
├── hooks/
│   ├── useScreenshot.ts    # Single screenshot hook
│   └── useBatchScreenshot.ts # Batch screenshot hook
└── types/
    ├── api.ts              # API-related types
    └── screenshot.ts       # Screenshot-specific types
```

## Usage

### Single Screenshot
1. Enter a website URL (including https://)
2. Customize options (optional):
   - Viewport size presets or custom dimensions
   - Image format (PNG/JPEG) and quality
   - Full page capture toggle
   - Timeout settings
3. Click "Take Screenshot"
4. Download starts automatically

### Batch Screenshots
1. Navigate to `/batch` page
2. Enter multiple URLs using:
   - Individual input fields (add/remove as needed)
   - Bulk text input (one URL per line)
3. Configure shared options for all screenshots
4. Click "Create ZIP Archive"
5. Download ZIP file with all screenshots

## API Integration

The frontend communicates with a backend API service. Ensure the backend is running on the configured URL (default: `http://localhost:3000`).

### Required Backend Endpoints
- `GET /api/health` - Health check
- `POST /api/screenshot` - Single screenshot
- `POST /api/batch-screenshots` - Batch processing

See the [API Documentation page](/api-docs) in the app for complete details.

## Development

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

### Code Style

- **TypeScript** with strict mode enabled
- **ESLint** with Next.js config
- **Tailwind CSS** for styling with custom design system
- **Component-first** architecture with reusable UI components
- **Responsive design** with mobile-first approach

### Adding New Components

```bash
# Add shadcn/ui components
npx shadcn@latest add [component-name]

# Example: Add a new dialog component
npx shadcn@latest add dialog
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Screenshot Tool` |
| `NEXT_PUBLIC_APP_VERSION` | App version | `1.0.0` |

### Customization

- **Theme colors**: Edit CSS variables in `src/app/globals.css`
- **Viewport presets**: Modify `VIEWPORT_PRESETS` in `src/lib/constants.ts`
- **API timeouts**: Adjust timeout values in `src/lib/api.ts`
- **Form validation**: Update schemas in `src/lib/validations.ts`

## Features in Detail

### Responsive Design
- Mobile-first approach with breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Collapsible options panel on mobile
- Touch-friendly interface elements

### Dark Mode
- System preference detection
- Manual theme toggle in header
- CSS variables for consistent theming
- Persistent theme selection

### Error Handling
- Network error recovery
- Invalid URL detection
- Timeout handling
- User-friendly error messages
- Retry mechanisms

### Performance
- React Query for API state management
- Image optimization with Next.js
- Code splitting and lazy loading
- Efficient re-renders with proper memoization

## Browser Support

- **Chrome** 88+ ✅
- **Firefox** 85+ ✅
- **Safari** 14+ ✅
- **Edge** 88+ ✅

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### Manual Deployment
```bash
npm run build
npm start
# App runs on port 3000 by default
```

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure backend service is running
   - Check `NEXT_PUBLIC_API_BASE_URL` configuration
   - Verify CORS settings on backend

2. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npx tsc --noEmit`

3. **Styling Issues**
   - Ensure Tailwind CSS is configured correctly
   - Check for CSS specificity conflicts
   - Verify dark mode CSS variables

### Performance Issues
- Enable production build for testing: `npm run build && npm start`
- Use browser dev tools to profile performance
- Check network tab for API response times

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Ensure linting passes: `npm run lint`
5. Commit your changes: `git commit -m 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the [API Documentation](/api-docs) page
2. Review this README for common solutions
3. Create an issue on GitHub with detailed information
4. Include browser console logs and network tab information for bug reports
