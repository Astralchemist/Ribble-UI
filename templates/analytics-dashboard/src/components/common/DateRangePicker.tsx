import React, { useState } from 'react';
import { DateRange } from '../../types';
import { formatDate } from '../../utils/helpers';
import './common.css';

interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
  initialRange?: DateRange;
}

type Preset = 'today' | '7days' | '30days' | '90days' | 'custom';

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  initialRange,
}) => {
  const [preset, setPreset] = useState<Preset>('30days');
  const [isOpen, setIsOpen] = useState(false);
  const [customRange, setCustomRange] = useState<DateRange>(
    initialRange || {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    }
  );

  const getPresetRange = (presetType: Preset): DateRange | null => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (presetType) {
      case 'today':
        return { startDate: today, endDate: now };
      case '7days':
        return {
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          endDate: now,
        };
      case '30days':
        return {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          endDate: now,
        };
      case '90days':
        return {
          startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
          endDate: now,
        };
      default:
        return null;
    }
  };

  const handlePresetClick = (presetType: Preset) => {
    setPreset(presetType);
    const range = getPresetRange(presetType);
    if (range) {
      setCustomRange(range);
      onChange(range);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleCustomDateChange = (type: 'start' | 'end', value: string) => {
    const newRange = {
      ...customRange,
      [type === 'start' ? 'startDate' : 'endDate']: new Date(value),
    };
    setCustomRange(newRange);
  };

  const handleApplyCustom = () => {
    onChange(customRange);
    setIsOpen(false);
  };

  const currentRange = getPresetRange(preset) || customRange;

  return (
    <div className="date-range-picker">
      <button
        className="date-range-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="date-range-icon">📅</span>
        <span className="date-range-text">
          {formatDate(currentRange.startDate)} - {formatDate(currentRange.endDate)}
        </span>
        <span className="date-range-chevron">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="date-range-dropdown">
          <div className="date-range-presets">
            <button
              className={`preset-button ${preset === 'today' ? 'active' : ''}`}
              onClick={() => handlePresetClick('today')}
            >
              Today
            </button>
            <button
              className={`preset-button ${preset === '7days' ? 'active' : ''}`}
              onClick={() => handlePresetClick('7days')}
            >
              Last 7 days
            </button>
            <button
              className={`preset-button ${preset === '30days' ? 'active' : ''}`}
              onClick={() => handlePresetClick('30days')}
            >
              Last 30 days
            </button>
            <button
              className={`preset-button ${preset === '90days' ? 'active' : ''}`}
              onClick={() => handlePresetClick('90days')}
            >
              Last 90 days
            </button>
            <button
              className={`preset-button ${preset === 'custom' ? 'active' : ''}`}
              onClick={() => {
                setPreset('custom');
                setIsOpen(true);
              }}
            >
              Custom
            </button>
          </div>

          {preset === 'custom' && (
            <div className="date-range-custom">
              <div className="custom-date-input">
                <label>Start Date</label>
                <input
                  type="date"
                  value={customRange.startDate.toISOString().split('T')[0]}
                  onChange={(e) => handleCustomDateChange('start', e.target.value)}
                />
              </div>
              <div className="custom-date-input">
                <label>End Date</label>
                <input
                  type="date"
                  value={customRange.endDate.toISOString().split('T')[0]}
                  onChange={(e) => handleCustomDateChange('end', e.target.value)}
                />
              </div>
              <button className="apply-button" onClick={handleApplyCustom}>
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
