import {
  MetricData,
  TimeSeriesData,
  TrafficSource,
  UserBehaviorData,
  ConversionFunnelStep,
  RealTimePageView,
  ChartDataPoint,
} from '../types';

// Generate time series data for the last 30 days
export const generateTimeSeriesData = (days: number = 30): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 5000) + 2000,
      compare: Math.floor(Math.random() * 4500) + 1800,
    });
  }

  return data;
};

// Generate hourly data for real-time stats
export const generateHourlyData = (): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const date = new Date(now);
    date.setHours(date.getHours() - i);

    data.push({
      date: `${date.getHours()}:00`,
      value: Math.floor(Math.random() * 500) + 100,
    });
  }

  return data;
};

export const mockMetrics: MetricData[] = [
  {
    label: 'Total Users',
    value: 45231,
    change: 12.5,
    changeType: 'increase',
    trend: [100, 120, 115, 140, 135, 150, 145],
  },
  {
    label: 'Sessions',
    value: 67893,
    change: 8.3,
    changeType: 'increase',
    trend: [200, 210, 205, 220, 215, 230, 225],
  },
  {
    label: 'Bounce Rate',
    value: 42.3,
    change: 2.1,
    changeType: 'decrease',
    trend: [50, 48, 49, 45, 44, 43, 42],
  },
  {
    label: 'Avg. Session Duration',
    value: 3.42,
    change: 5.7,
    changeType: 'increase',
    trend: [3.0, 3.1, 3.2, 3.3, 3.35, 3.4, 3.42],
  },
];

export const mockTrafficSources: TrafficSource[] = [
  {
    source: 'Organic Search',
    users: 18500,
    sessions: 24300,
    bounceRate: 38.5,
    avgSessionDuration: 4.2,
    percentage: 40.9,
  },
  {
    source: 'Direct',
    users: 12800,
    sessions: 16900,
    bounceRate: 42.1,
    avgSessionDuration: 3.8,
    percentage: 28.3,
  },
  {
    source: 'Social Media',
    users: 8200,
    sessions: 11400,
    bounceRate: 51.2,
    avgSessionDuration: 2.9,
    percentage: 18.1,
  },
  {
    source: 'Referral',
    users: 3900,
    sessions: 5100,
    bounceRate: 44.3,
    avgSessionDuration: 3.5,
    percentage: 8.6,
  },
  {
    source: 'Email',
    users: 1831,
    sessions: 2493,
    bounceRate: 35.7,
    avgSessionDuration: 4.8,
    percentage: 4.1,
  },
];

export const mockUserBehavior: UserBehaviorData[] = [
  {
    page: '/home',
    pageViews: 25600,
    uniqueViews: 18400,
    avgTimeOnPage: 2.4,
    bounceRate: 35.2,
    exitRate: 22.1,
  },
  {
    page: '/products',
    pageViews: 18900,
    uniqueViews: 14200,
    avgTimeOnPage: 3.8,
    bounceRate: 28.5,
    exitRate: 18.3,
  },
  {
    page: '/pricing',
    pageViews: 12300,
    uniqueViews: 9800,
    avgTimeOnPage: 4.2,
    bounceRate: 31.7,
    exitRate: 42.5,
  },
  {
    page: '/about',
    pageViews: 8700,
    uniqueViews: 7100,
    avgTimeOnPage: 2.9,
    bounceRate: 45.3,
    exitRate: 38.2,
  },
  {
    page: '/contact',
    pageViews: 6500,
    uniqueViews: 5400,
    avgTimeOnPage: 3.1,
    bounceRate: 39.8,
    exitRate: 58.7,
  },
  {
    page: '/blog',
    pageViews: 15800,
    uniqueViews: 11900,
    avgTimeOnPage: 5.6,
    bounceRate: 42.1,
    exitRate: 25.4,
  },
];

export const mockConversionFunnel: ConversionFunnelStep[] = [
  {
    step: 'Page Visit',
    users: 10000,
    percentage: 100,
  },
  {
    step: 'Product View',
    users: 6500,
    percentage: 65,
    dropOff: 35,
  },
  {
    step: 'Add to Cart',
    users: 3200,
    percentage: 32,
    dropOff: 33,
  },
  {
    step: 'Checkout',
    users: 1800,
    percentage: 18,
    dropOff: 14,
  },
  {
    step: 'Purchase',
    users: 1260,
    percentage: 12.6,
    dropOff: 5.4,
  },
];

export const mockRealTimePages: RealTimePageView[] = [
  { page: '/home', activeUsers: 342 },
  { page: '/products/laptop', activeUsers: 186 },
  { page: '/checkout', activeUsers: 124 },
  { page: '/products/phone', activeUsers: 98 },
  { page: '/blog/latest-post', activeUsers: 76 },
  { page: '/pricing', activeUsers: 54 },
  { page: '/about', activeUsers: 32 },
  { page: '/contact', activeUsers: 28 },
];

export const mockDeviceBreakdown: ChartDataPoint[] = [
  { label: 'Desktop', value: 52.3 },
  { label: 'Mobile', value: 38.7 },
  { label: 'Tablet', value: 9.0 },
];

export const mockBrowserBreakdown: ChartDataPoint[] = [
  { label: 'Chrome', value: 58.2 },
  { label: 'Safari', value: 22.8 },
  { label: 'Firefox', value: 11.5 },
  { label: 'Edge', value: 5.3 },
  { label: 'Other', value: 2.2 },
];

export const mockGeographicData: ChartDataPoint[] = [
  { label: 'United States', value: 28500 },
  { label: 'United Kingdom', value: 12300 },
  { label: 'Germany', value: 8900 },
  { label: 'France', value: 7200 },
  { label: 'Canada', value: 6800 },
  { label: 'Australia', value: 5400 },
  { label: 'Japan', value: 4900 },
  { label: 'Other', value: 11231 },
];
