import { TimeSeriesData, ChartDataPoint, ExportFormat } from '../types';

/**
 * Format a number with commas for thousands
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Format a number as a percentage
 */
export const formatPercentage = (num: number, decimals: number = 1): string => {
  return `${num.toFixed(decimals)}%`;
};

/**
 * Format seconds into a readable time string
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds.toFixed(0)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
};

/**
 * Format a date string
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Calculate percentage change between two values
 */
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Get date range label
 */
export const getDateRangeLabel = (startDate: Date, endDate: Date): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

/**
 * Export data to CSV format
 */
export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    ),
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
};

/**
 * Export data to JSON format
 */
export const exportToJSON = (data: any[], filename: string): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
};

/**
 * Download a file
 */
const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export data based on format
 */
export const exportData = (data: any[], filename: string, format: ExportFormat): void => {
  switch (format) {
    case 'csv':
      exportToCSV(data, filename);
      break;
    case 'json':
      exportToJSON(data, filename);
      break;
    case 'pdf':
      // PDF export would require a library like jsPDF
      // For now, we'll export as JSON
      alert('PDF export coming soon. Exporting as JSON instead.');
      exportToJSON(data, filename);
      break;
  }
};

/**
 * Get color based on change type
 */
export const getChangeColor = (changeType: 'increase' | 'decrease', isPositive: boolean = true): string => {
  if (isPositive) {
    return changeType === 'increase' ? '#10b981' : '#ef4444';
  } else {
    return changeType === 'decrease' ? '#10b981' : '#ef4444';
  }
};

/**
 * Calculate trend direction
 */
export const getTrendDirection = (data: number[]): 'up' | 'down' | 'flat' => {
  if (data.length < 2) return 'flat';

  const first = data[0];
  const last = data[data.length - 1];

  if (last > first * 1.05) return 'up';
  if (last < first * 0.95) return 'down';
  return 'flat';
};

/**
 * Normalize data for chart display
 */
export const normalizeChartData = (data: number[], maxHeight: number = 100): number[] => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  if (range === 0) return data.map(() => maxHeight / 2);

  return data.map(value => ((value - min) / range) * maxHeight);
};

/**
 * Get last N days date range
 */
export const getLastNDays = (n: number): { startDate: Date; endDate: Date } => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - n);

  return { startDate, endDate };
};

/**
 * Generate color palette
 */
export const generateColorPalette = (count: number): string[] => {
  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
  ];

  if (count <= colors.length) {
    return colors.slice(0, count);
  }

  // Generate additional colors if needed
  const result = [...colors];
  while (result.length < count) {
    result.push(`hsl(${(result.length * 137.5) % 360}, 70%, 50%)`);
  }

  return result;
};
