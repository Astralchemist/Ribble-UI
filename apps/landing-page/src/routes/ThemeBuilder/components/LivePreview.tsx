import React from 'react';
import { ThemeTokens } from '../utils/presets';

interface LivePreviewProps {
  tokens: ThemeTokens;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ tokens }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="live-preview">
      <div className="preview-section">
        <h2>Typography</h2>
        <div className="preview-content">
          <h1 style={{ fontSize: `${tokens.typography.fontSizeH1}px` }}>
            Heading 1
          </h1>
          <h2 style={{ fontSize: `${tokens.typography.fontSizeH2}px` }}>
            Heading 2
          </h2>
          <h3 style={{ fontSize: `${tokens.typography.fontSizeH3}px` }}>
            Heading 3
          </h3>
          <p style={{ fontSize: `${tokens.typography.fontSizeBase}px` }}>
            This is body text using the base font size. It demonstrates the default
            typography settings including font family, size, and line height.
          </p>
          <p
            style={{
              fontSize: `${tokens.typography.fontSizeSmall}px`,
              color: tokens.colors.textSecondary,
            }}
          >
            This is small text in secondary color.
          </p>
        </div>
      </div>

      <div className="preview-section">
        <h2>Buttons</h2>
        <div className="preview-content button-group">
          <button className="preview-button primary">Primary Button</button>
          <button className="preview-button secondary">Secondary Button</button>
          <button className="preview-button success">Success Button</button>
          <button className="preview-button warning">Warning Button</button>
          <button className="preview-button error">Error Button</button>
          <button className="preview-button" disabled>
            Disabled Button
          </button>
        </div>
      </div>

      <div className="preview-section">
        <h2>Form Inputs</h2>
        <div className="preview-content">
          <div className="form-group">
            <label>Text Input</label>
            <input type="text" className="preview-input" placeholder="Enter text..." />
          </div>
          <div className="form-group">
            <label>Email Input</label>
            <input
              type="email"
              className="preview-input"
              placeholder="email@example.com"
            />
          </div>
          <div className="form-group">
            <label>Textarea</label>
            <textarea
              className="preview-textarea"
              placeholder="Enter multiple lines..."
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" className="preview-checkbox" /> Checkbox
            </label>
          </div>
        </div>
      </div>

      <div className="preview-section">
        <h2>Cards</h2>
        <div className="preview-content cards-grid">
          <div className="preview-card">
            <h3>Card Title</h3>
            <p>
              This is a card component with surface background, border, and shadow.
            </p>
            <button className="preview-button primary">Action</button>
          </div>
          <div className="preview-card">
            <h3>Another Card</h3>
            <p>Cards help organize content into distinct sections.</p>
            <button className="preview-button secondary">Learn More</button>
          </div>
          <div className="preview-card">
            <h3>Third Card</h3>
            <p>Each card uses the theme tokens for consistent styling.</p>
            <button className="preview-button success">Get Started</button>
          </div>
        </div>
      </div>

      <div className="preview-section">
        <h2>Alerts</h2>
        <div className="preview-content">
          <div className="preview-alert success">
            <strong>Success!</strong> Your changes have been saved.
          </div>
          <div className="preview-alert warning">
            <strong>Warning!</strong> Please review your input.
          </div>
          <div className="preview-alert error">
            <strong>Error!</strong> Something went wrong.
          </div>
          <div className="preview-alert info">
            <strong>Info:</strong> Here's some helpful information.
          </div>
        </div>
      </div>

      <div className="preview-section">
        <h2>Modal</h2>
        <div className="preview-content">
          <button className="preview-button primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </button>
        </div>
      </div>

      <div className="preview-section">
        <h2>Spacing</h2>
        <div className="preview-content">
          <div className="spacing-demo">
            {Object.entries(tokens.spacing).map(([key, value]) => (
              <div key={key} className="spacing-item">
                <span className="spacing-label">{key}</span>
                <div
                  className="spacing-visual"
                  style={{
                    width: `${value}px`,
                    height: `${value}px`,
                    backgroundColor: tokens.colors.primary,
                  }}
                />
                <span className="spacing-value">{value}px</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="preview-section">
        <h2>Border Radius</h2>
        <div className="preview-content">
          <div className="radius-demo">
            {Object.entries(tokens.borderRadius).map(([key, value]) => (
              <div key={key} className="radius-item">
                <div
                  className="radius-visual"
                  style={{
                    borderRadius: `${value}px`,
                    backgroundColor: tokens.colors.primary,
                  }}
                />
                <span className="radius-label">
                  {key}: {value}px
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="preview-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header">
              <h3>Modal Title</h3>
              <button
                className="preview-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="preview-modal-body">
              <p>
                This is a modal dialog. It demonstrates how your theme tokens apply to
                overlay components.
              </p>
              <p>Notice the background, text colors, and spacing.</p>
            </div>
            <div className="preview-modal-footer">
              <button
                className="preview-button secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="preview-button primary">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
