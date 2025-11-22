import React, { useState } from 'react';
import { ExportFormat } from '../../types';
import { exportData } from '../../utils/helpers';
import './common.css';

interface ExportButtonProps {
  data: any[];
  filename: string;
  formats?: ExportFormat[];
}

const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  filename,
  formats = ['csv', 'json'],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format: ExportFormat) => {
    exportData(data, filename, format);
    setIsOpen(false);
  };

  return (
    <div className="export-button-container">
      <button
        className="export-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="export-icon">⬇</span>
        <span>Export</span>
        <span className="export-chevron">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="export-dropdown">
          {formats.map((format) => (
            <button
              key={format}
              className="export-option"
              onClick={() => handleExport(format)}
            >
              Export as {format.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportButton;
