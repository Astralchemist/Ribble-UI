export interface MetricData {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  trend?: number[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  compare?: number;
}

export interface TrafficSource {
  source: string;
  users: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  percentage: number;
}

export interface UserBehaviorData {
  page: string;
  pageViews: number;
  uniqueViews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  exitRate: number;
}

export interface ConversionFunnelStep {
  step: string;
  users: number;
  percentage: number;
  dropOff?: number;
}

export interface RealTimeMetric {
  activeUsers: number;
  pageViews: number;
  events: number;
  conversions: number;
}

export interface RealTimePageView {
  page: string;
  activeUsers: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface FilterOptions {
  dateRange: DateRange;
  segment?: string;
  source?: string;
  device?: string;
}

export type ExportFormat = 'csv' | 'json' | 'pdf';

export interface ComparisonData {
  current: TimeSeriesData[];
  previous: TimeSeriesData[];
}
