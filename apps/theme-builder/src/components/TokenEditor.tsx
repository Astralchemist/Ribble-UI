import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { ThemeTokens } from '../utils/presets';

interface TokenEditorProps {
  tokens: ThemeTokens;
  onColorChange: (key: keyof ThemeTokens['colors'], value: string) => void;
  onTypographyChange: (key: keyof ThemeTokens['typography'], value: string | number) => void;
  onSpacingChange: (key: keyof ThemeTokens['spacing'], value: number) => void;
  onBorderRadiusChange: (key: keyof ThemeTokens['borderRadius'], value: number) => void;
  onShadowChange: (key: keyof ThemeTokens['shadows'], value: string) => void;
}

export const TokenEditor: React.FC<TokenEditorProps> = ({
  tokens,
  onColorChange,
  onTypographyChange,
  onSpacingChange,
  onBorderRadiusChange,
  onShadowChange,
}) => {
  const [activeColorPicker, setActiveColorPicker] = React.useState<string | null>(null);

  return (
    <div className="token-editor">
      <div className="token-section">
        <h2>Colors</h2>
        <div className="token-grid">
          {Object.entries(tokens.colors).map(([key, value]) => (
            <div key={key} className="token-item">
              <label>{formatLabel(key)}</label>
              <div className="color-input-wrapper">
                <div
                  className="color-swatch"
                  style={{ backgroundColor: value }}
                  onClick={() =>
                    setActiveColorPicker(activeColorPicker === key ? null : key)
                  }
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    onColorChange(key as keyof ThemeTokens['colors'], e.target.value)
                  }
                  className="color-text-input"
                />
              </div>
              {activeColorPicker === key && (
                <div className="color-picker-popover">
                  <div
                    className="color-picker-backdrop"
                    onClick={() => setActiveColorPicker(null)}
                  />
                  <HexColorPicker
                    color={value}
                    onChange={(newColor: string) =>
                      onColorChange(key as keyof ThemeTokens['colors'], newColor)
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2>Typography</h2>
        <div className="token-grid">
          <div className="token-item">
            <label>Font Family</label>
            <input
              type="text"
              value={tokens.typography.fontFamily}
              onChange={(e) => onTypographyChange('fontFamily', e.target.value)}
            />
          </div>
          <div className="token-item">
            <label>Font Family Mono</label>
            <input
              type="text"
              value={tokens.typography.fontFamilyMono}
              onChange={(e) => onTypographyChange('fontFamilyMono', e.target.value)}
            />
          </div>
          <div className="token-item">
            <label>Font Size Base</label>
            <input
              type="number"
              value={tokens.typography.fontSizeBase}
              onChange={(e) => onTypographyChange('fontSizeBase', Number(e.target.value))}
            />
          </div>
          <div className="token-item">
            <label>Font Size Small</label>
            <input
              type="number"
              value={tokens.typography.fontSizeSmall}
              onChange={(e) => onTypographyChange('fontSizeSmall', Number(e.target.value))}
            />
          </div>
          <div className="token-item">
            <label>Font Size Large</label>
            <input
              type="number"
              value={tokens.typography.fontSizeLarge}
              onChange={(e) => onTypographyChange('fontSizeLarge', Number(e.target.value))}
            />
          </div>
          <div className="token-item">
            <label>Font Size H1</label>
            <input
              type="number"
              value={tokens.typography.fontSizeH1}
              onChange={(e) => onTypographyChange('fontSizeH1', Number(e.target.value))}
            />
          </div>
          <div className="token-item">
            <label>Font Size H2</label>
            <input
              type="number"
              value={tokens.typography.fontSizeH2}
              onChange={(e) => onTypographyChange('fontSizeH2', Number(e.target.value))}
            />
          </div>
          <div className="token-item">
            <label>Font Size H3</label>
            <input
              type="number"
              value={tokens.typography.fontSizeH3}
              onChange={(e) => onTypographyChange('fontSizeH3', Number(e.target.value))}
            />
          </div>
          <div className="token-item">
            <label>Font Weight Normal</label>
            <input
              type="number"
              value={tokens.typography.fontWeightNormal}
              onChange={(e) =>
                onTypographyChange('fontWeightNormal', Number(e.target.value))
              }
            />
          </div>
          <div className="token-item">
            <label>Font Weight Medium</label>
            <input
              type="number"
              value={tokens.typography.fontWeightMedium}
              onChange={(e) =>
                onTypographyChange('fontWeightMedium', Number(e.target.value))
              }
            />
          </div>
          <div className="token-item">
            <label>Font Weight Bold</label>
            <input
              type="number"
              value={tokens.typography.fontWeightBold}
              onChange={(e) => onTypographyChange('fontWeightBold', Number(e.target.value))}
            />
          </div>
          <div className="token-item">
            <label>Line Height</label>
            <input
              type="number"
              step="0.1"
              value={tokens.typography.lineHeight}
              onChange={(e) => onTypographyChange('lineHeight', Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="token-section">
        <h2>Spacing</h2>
        <div className="token-grid">
          {Object.entries(tokens.spacing).map(([key, value]) => (
            <div key={key} className="token-item">
              <label>{formatLabel(key)}</label>
              <div className="number-input-wrapper">
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    onSpacingChange(
                      key as keyof ThemeTokens['spacing'],
                      Number(e.target.value)
                    )
                  }
                />
                <span className="unit">px</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2>Border Radius</h2>
        <div className="token-grid">
          {Object.entries(tokens.borderRadius).map(([key, value]) => (
            <div key={key} className="token-item">
              <label>{formatLabel(key)}</label>
              <div className="number-input-wrapper">
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    onBorderRadiusChange(
                      key as keyof ThemeTokens['borderRadius'],
                      Number(e.target.value)
                    )
                  }
                />
                <span className="unit">px</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2>Shadows</h2>
        <div className="token-grid">
          {Object.entries(tokens.shadows).map(([key, value]) => (
            <div key={key} className="token-item">
              <label>{formatLabel(key)}</label>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  onShadowChange(key as keyof ThemeTokens['shadows'], e.target.value)
                }
              />
              <div className="shadow-preview" style={{ boxShadow: value }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};
