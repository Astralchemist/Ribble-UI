import React from 'react';
import { presetThemes } from '../utils/presets';
import { ThemeTokens } from '../utils/presets';

interface PresetThemesProps {
  onLoadTheme: (tokens: ThemeTokens) => void;
  currentTokens?: ThemeTokens;
}

export const PresetThemes: React.FC<PresetThemesProps> = ({
  onLoadTheme,
}) => {
  const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null);

  const handleLoadTheme = (key: string, tokens: ThemeTokens) => {
    setSelectedPreset(key);
    onLoadTheme(tokens);
  };

  return (
    <div className="preset-themes">
      <div className="preset-header">
        <h2>Preset Themes</h2>
        <p>Start with a pre-designed theme or use as inspiration for your custom theme</p>
      </div>

      <div className="presets-grid">
        {Object.entries(presetThemes).map(([key, { name, tokens }]) => (
          <div key={key} className={`preset-card ${selectedPreset === key ? 'selected' : ''}`}>
            <div className="preset-preview">
              <div className="preset-colors">
                <div
                  className="preset-color-block large"
                  style={{ backgroundColor: tokens.colors.primary }}
                  title="Primary"
                />
                <div className="preset-color-row">
                  <div
                    className="preset-color-block"
                    style={{ backgroundColor: tokens.colors.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="preset-color-block"
                    style={{ backgroundColor: tokens.colors.success }}
                    title="Success"
                  />
                </div>
                <div className="preset-color-row">
                  <div
                    className="preset-color-block"
                    style={{ backgroundColor: tokens.colors.warning }}
                    title="Warning"
                  />
                  <div
                    className="preset-color-block"
                    style={{ backgroundColor: tokens.colors.error }}
                    title="Error"
                  />
                </div>
              </div>
              <div
                className="preset-surface"
                style={{
                  backgroundColor: tokens.colors.background,
                  color: tokens.colors.text,
                }}
              >
                <div
                  className="preset-surface-inner"
                  style={{
                    backgroundColor: tokens.colors.surface,
                    borderColor: tokens.colors.border,
                  }}
                >
                  <div className="preset-text">Aa</div>
                  <div
                    className="preset-button"
                    style={{
                      backgroundColor: tokens.colors.primary,
                      borderRadius: `${tokens.borderRadius.md}px`,
                    }}
                  >
                    Button
                  </div>
                </div>
              </div>
            </div>
            <div className="preset-info">
              <h3>{name}</h3>
              <button
                className="preset-load-button"
                onClick={() => handleLoadTheme(key, tokens)}
              >
                Load Theme
              </button>
            </div>
            <div className="preset-details">
              <div className="preset-detail-item">
                <span className="preset-detail-label">Primary:</span>
                <span className="preset-detail-value">{tokens.colors.primary}</span>
              </div>
              <div className="preset-detail-item">
                <span className="preset-detail-label">Background:</span>
                <span className="preset-detail-value">{tokens.colors.background}</span>
              </div>
              <div className="preset-detail-item">
                <span className="preset-detail-label">Font Size:</span>
                <span className="preset-detail-value">
                  {tokens.typography.fontSizeBase}px
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="preset-tips">
        <h3>Tips for Using Presets</h3>
        <ul>
          <li>
            Load a preset theme as a starting point, then customize the tokens to match
            your brand
          </li>
          <li>
            Compare different presets to understand how color combinations affect the
            overall feel
          </li>
          <li>
            The Default theme matches KansoUI's default styling - use it as a reference
          </li>
          <li>
            Dark Mode preset is optimized for low-light environments with appropriate
            contrast
          </li>
          <li>Export your customized theme to use across your projects</li>
        </ul>
      </div>
    </div>
  );
};
