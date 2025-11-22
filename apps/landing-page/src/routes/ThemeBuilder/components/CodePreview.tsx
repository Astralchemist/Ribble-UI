import React from 'react';
import { ThemeTokens } from '../utils/presets';
import {
  generateCSS,
  generateJSON,
  generateTypeScript,
  generateFigmaTokens,
  generateSCSS,
} from '../utils/tokenGenerator';

interface CodePreviewProps {
  tokens: ThemeTokens;
  format: 'css' | 'json' | 'typescript' | 'figma' | 'scss';
}

export const CodePreview: React.FC<CodePreviewProps> = ({ tokens, format }) => {
  const [copied, setCopied] = React.useState(false);

  const getCode = () => {
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getLanguage = () => {
    switch (format) {
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'typescript':
        return 'typescript';
      case 'figma':
        return 'json';
      case 'scss':
        return 'scss';
      default:
        return 'text';
    }
  };

  return (
    <div className="code-preview">
      <div className="code-preview-header">
        <div className="code-preview-title">
          <span className="code-preview-language">{getLanguage().toUpperCase()}</span>
          <span className="code-preview-description">Generated theme code</span>
        </div>
        <button
          className={`code-preview-copy ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="code-preview-content">
        <code className={`language-${getLanguage()}`}>{getCode()}</code>
      </pre>
    </div>
  );
};
