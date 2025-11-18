# Analytics Dashboard

A production-ready, feature-rich analytics dashboard built with React, TypeScript, and Vite. This template provides comprehensive data visualization and analytics capabilities with a clean, modern interface.

## Features

### Core Features
- **Real-time Metrics Display** - Monitor key performance indicators with live updates
- **Interactive Charts** - Line, Bar, Pie, and Area chart visualizations
- **Date Range Picker** - Flexible date range selection with presets
- **Data Export** - Export analytics data in CSV and JSON formats
- **Filter Panels** - Advanced filtering capabilities for data analysis
- **Comparison Views** - Compare current vs. previous period metrics
- **Responsive Design** - Fully responsive layout for all device sizes

### Analytics Pages

#### 1. Overview Dashboard
- Key metrics summary with trend indicators
- Visitors and sessions over time
- Device breakdown visualization
- Geographic distribution
- Quick stats panel

#### 2. Traffic Analytics
- Traffic sources breakdown (Organic, Direct, Social, Referral, Email)
- Browser distribution analysis
- Detailed traffic sources table with key metrics
- Traffic trend visualization
- Filterable by source and device type

#### 3. User Behavior Analytics
- Page performance metrics
- Top pages by views and engagement
- Average time on page analysis
- Bounce rate and exit rate tracking
- Sortable data table with detailed metrics

#### 4. Conversion Analytics
- Visual conversion funnel with drop-off analysis
- Conversion rate tracking
- Goal completions monitoring
- Revenue and order value metrics
- Conversion trend over time

#### 5. Real-Time Stats
- Live active users count
- Real-time page views and events
- Active pages monitoring
- Recent events stream
- Geographic and device breakdown in real-time

## Technology Stack

- **React 18.2** - UI library
- **TypeScript** - Type-safe development
- **Vite 5.0** - Fast build tool and dev server
- **React Router 6** - Client-side routing
- **CSS3** - Styling with modern CSS features
- **SVG** - Scalable vector graphics for charts

## Project Structure

```
analytics-dashboard/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── AreaChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   └── charts.css
│   │   └── common/
│   │       ├── DateRangePicker.tsx
│   │       ├── ExportButton.tsx
│   │       ├── FilterPanel.tsx
│   │       ├── MetricCard.tsx
│   │       └── common.css
│   ├── pages/
│   │   ├── Overview.tsx
│   │   ├── Traffic.tsx
│   │   ├── UserBehavior.tsx
│   │   ├── Conversions.tsx
│   │   ├── RealTime.tsx
│   │   └── pages.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── mockData.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher (or yarn/pnpm)

### Installation

1. Clone or navigate to the template directory:
```bash
cd analytics-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Customizing Data

The dashboard currently uses mock data located in `src/utils/mockData.ts`. To integrate with your own API:

1. Create API service functions in a new file (e.g., `src/services/api.ts`)
2. Replace mock data imports with API calls in your page components
3. Handle loading and error states appropriately

Example:
```typescript
// Before (mock data)
import { mockMetrics } from '../utils/mockData';

// After (real API)
import { fetchMetrics } from '../services/api';

const [metrics, setMetrics] = useState([]);
useEffect(() => {
  fetchMetrics().then(setMetrics);
}, []);
```

### Adding New Chart Types

1. Create a new chart component in `src/components/charts/`
2. Define props interface with TypeScript
3. Implement the chart using SVG or CSS
4. Export and use in your pages

### Customizing Styles

The dashboard uses CSS modules and CSS variables for easy customization:

- **Colors**: Modify color values in component CSS files
- **Fonts**: Update font-family in `src/index.css`
- **Spacing**: Adjust padding and margins in respective CSS files
- **Breakpoints**: Modify responsive breakpoints in media queries

### Date Range Filtering

The DateRangePicker component supports:
- Today
- Last 7 days
- Last 30 days
- Last 90 days
- Custom date range

To implement date filtering:
```typescript
const [dateRange, setDateRange] = useState<DateRange>({
  startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  endDate: new Date(),
});

const handleDateRangeChange = (range: DateRange) => {
  setDateRange(range);
  // Fetch new data based on range
};
```

### Exporting Data

Use the ExportButton component to enable data export:
```typescript
<ExportButton
  data={yourData}
  filename="export-name"
  formats={['csv', 'json']}
/>
```

## Component API

### MetricCard
```typescript
interface MetricCardProps {
  metric: MetricData;
  showTrend?: boolean;
}
```

### DateRangePicker
```typescript
interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
  initialRange?: DateRange;
}
```

### FilterPanel
```typescript
interface FilterPanelProps {
  filters: Filter[];
  onFilterChange: (filterId: string, value: string) => void;
}
```

### Chart Components
All chart components accept similar props:
```typescript
interface ChartProps {
  data: ChartDataPoint[] | TimeSeriesData[];
  height?: number;
  color?: string;
  // Additional props specific to chart type
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

The dashboard is optimized for performance:
- Lazy loading of chart components
- Efficient re-rendering with React.memo
- CSS-based charts (no heavy libraries)
- Optimized bundle size with Vite

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Reduced motion support

## Customization Examples

### Changing Color Scheme
Edit the color values in chart components:
```typescript
// In component files
color="#your-color"
```

### Adding Authentication
1. Install auth library (e.g., Firebase, Auth0)
2. Wrap App in auth provider
3. Add protected route wrapper
4. Implement login/logout

### Connecting to Backend API
```typescript
// src/services/api.ts
export const fetchAnalytics = async (dateRange: DateRange) => {
  const response = await fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(dateRange),
  });
  return response.json();
};
```

## Troubleshooting

### Port Already in Use
Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3001, // Change to available port
}
```

### Build Errors
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## License

MIT License - feel free to use this template for any project.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Support

For questions or issues, please open an issue in the repository.

---

Built with ❤️ using React, TypeScript, and Vite
