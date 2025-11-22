import { useState } from 'react';
import { useTokens } from './hooks/useTokens';
import { TokenEditor } from './components/TokenEditor';
import { LivePreview } from './components/LivePreview';
import { ExportPanel } from './components/ExportPanel';
import { PresetThemes } from './components/PresetThemes';
import './styles/app.css';

type Tab = 'edit' | 'preview' | 'export' | 'presets';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('edit');

  const {
    tokens,
    updateColor,
    updateTypography,
    updateSpacing,
    updateBorderRadius,
    updateShadow,
    loadTheme,
    resetTheme,
    importTheme,
  } = useTokens();

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-title">
            <h1>KansoUI Theme Builder</h1>
            <p>Create and customize your design system</p>
          </div>
          <button className="reset-button" onClick={resetTheme} title="Reset to default theme">
            Reset Theme
          </button>
        </div>
      </header>

      <nav className="app-tabs">
        <button
          className={`app-tab ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          <span className="tab-icon">🎨</span>
          <span className="tab-label">Edit Tokens</span>
        </button>
        <button
          className={`app-tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <span className="tab-icon">👁️</span>
          <span className="tab-label">Live Preview</span>
        </button>
        <button
          className={`app-tab ${activeTab === 'presets' ? 'active' : ''}`}
          onClick={() => setActiveTab('presets')}
        >
          <span className="tab-icon">🎭</span>
          <span className="tab-label">Presets</span>
        </button>
        <button
          className={`app-tab ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          <span className="tab-icon">📦</span>
          <span className="tab-label">Export</span>
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'edit' && (
          <div className="tab-content">
            <TokenEditor
              tokens={tokens}
              onColorChange={updateColor}
              onTypographyChange={updateTypography}
              onSpacingChange={updateSpacing}
              onBorderRadiusChange={updateBorderRadius}
              onShadowChange={updateShadow}
            />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="tab-content">
            <LivePreview tokens={tokens} />
          </div>
        )}

        {activeTab === 'presets' && (
          <div className="tab-content">
            <PresetThemes onLoadTheme={loadTheme} currentTokens={tokens} />
          </div>
        )}

        {activeTab === 'export' && (
          <div className="tab-content">
            <ExportPanel tokens={tokens} onImport={importTheme} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with KansoUI &middot; Theme changes are automatically saved to local
          storage
        </p>
      </footer>
    </div>
  );
}

export default App;
