import React from 'react';
import { saveAs } from 'file-saver';
import { ThemeTokens } from '../utils/presets';
import {
  generateCSS,
  generateJSON,
  generateTypeScript,
  generateFigmaTokens,
  generateSCSS,
} from '../utils/tokenGenerator';

interface ExportPanelProps {
  tokens: ThemeTokens;
  onImport: (jsonString: string) => { success: boolean; message: string };
}

type ExportFormat = 'css' | 'json' | 'typescript' | 'figma' | 'scss';

export const ExportPanel: React.FC<ExportPanelProps> = ({ tokens, onImport }) => {
  const [selectedFormat, setSelectedFormat] = React.useState<ExportFormat>('css');
  const [importError, setImportError] = React.useState<string | null>(null);
  const [importSuccess, setImportSuccess] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getExportContent = (format: ExportFormat): string => {
    switch (format) {
      case 'css':
        return generateCSS(tokens);
      case 'json':
        return generateJSON(tokens);
      case 'typescript':
        return generateTypeScript(tokens);
      case 'figma':
        return generateFigmaTokens(tokens);
      case 'scss':
        return generateSCSS(tokens);
      default:
        return '';
    }
  };

  const getFileExtension = (format: ExportFormat): string => {
    switch (format) {
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'typescript':
        return 'ts';
      case 'figma':
        return 'json';
      case 'scss':
        return 'scss';
      default:
        return 'txt';
    }
  };

  const handleExport = () => {
    const content = getExportContent(selectedFormat);
    const extension = getFileExtension(selectedFormat);
    const filename =
      selectedFormat === 'figma'
        ? 'kanso-ui-tokens.figma.json'
        : `kanso-ui-theme.${extension}`;

    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, filename);
  };

  const handleCopy = async () => {
    const content = getExportContent(selectedFormat);
    try {
      await navigator.clipboard.writeText(content);
      setImportSuccess('Copied to clipboard!');
      setTimeout(() => setImportSuccess(null), 3000);
    } catch (err) {
      setImportError('Failed to copy to clipboard');
      setTimeout(() => setImportError(null), 3000);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const result = onImport(content);

      if (result.success) {
        setImportSuccess(result.message);
        setImportError(null);
      } else {
        setImportError(result.message);
        setImportSuccess(null);
      }

      setTimeout(() => {
        setImportSuccess(null);
        setImportError(null);
      }, 5000);
    };

    reader.readAsText(file);
    // Reset input so same file can be selected again
    event.target.value = '';
  };

  const exportContent = getExportContent(selectedFormat);

  return (
    <div className="export-panel">
      <div className="export-header">
        <h2>Export Theme</h2>
        <p>Export your custom theme in various formats</p>
      </div>

      <div className="export-format-selector">
        <label>Select Format:</label>
        <div className="format-buttons">
          <button
            className={`format-button ${selectedFormat === 'css' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('css')}
          >
            CSS Variables
          </button>
          <button
            className={`format-button ${selectedFormat === 'scss' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('scss')}
          >
            SCSS Variables
          </button>
          <button
            className={`format-button ${selectedFormat === 'json' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('json')}
          >
            JSON
          </button>
          <button
            className={`format-button ${selectedFormat === 'typescript' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('typescript')}
          >
            TypeScript
          </button>
          <button
            className={`format-button ${selectedFormat === 'figma' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('figma')}
          >
            Figma Tokens
          </button>
        </div>
      </div>

      <div className="export-preview">
        <div className="export-preview-header">
          <h3>Preview</h3>
          <div className="export-actions">
            <button className="action-button" onClick={handleCopy}>
              Copy to Clipboard
            </button>
            <button className="action-button primary" onClick={handleExport}>
              Download File
            </button>
          </div>
        </div>
        <pre className="export-code">
          <code>{exportContent}</code>
        </pre>
      </div>

      <div className="import-section">
        <h2>Import Theme</h2>
        <p>Import a theme from a JSON file</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <button className="action-button" onClick={handleImportClick}>
          Import JSON File
        </button>
        {importError && <div className="import-message error">{importError}</div>}
        {importSuccess && <div className="import-message success">{importSuccess}</div>}
      </div>

      <div className="export-info">
        <h3>Export Format Details</h3>
        <div className="format-info">
          <div className="format-info-item">
            <h4>CSS Variables</h4>
            <p>
              Standard CSS custom properties that can be used directly in your
              stylesheets. Compatible with all modern browsers.
            </p>
          </div>
          <div className="format-info-item">
            <h4>SCSS Variables</h4>
            <p>
              Sass/SCSS variables for use with preprocessors. Ideal for projects using
              Sass build tooling.
            </p>
          </div>
          <div className="format-info-item">
            <h4>JSON</h4>
            <p>
              Pure JSON format for easy importing and sharing. Can be used with
              JavaScript/TypeScript or imported back into this tool.
            </p>
          </div>
          <div className="format-info-item">
            <h4>TypeScript</h4>
            <p>
              Typed TypeScript module with full type definitions. Perfect for TypeScript
              projects with type safety.
            </p>
          </div>
          <div className="format-info-item">
            <h4>Figma Tokens</h4>
            <p>
              Design tokens format compatible with Figma's design tokens plugins. Sync
              your theme with Figma designs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
