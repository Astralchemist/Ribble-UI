interface KansoUILogoProps {
  className?: string;
  showText?: boolean;
  iconOnly?: boolean;
  width?: number;
  height?: number;
}

const KansoUILogo = ({
  className = '',
  showText = true,
  iconOnly = false,
  width,
  height
}: KansoUILogoProps) => {
  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || 32}
        height={height || 32}
      >
        <path
          d="M25 25 L45 25 L45 35 L35 35 L35 45 L45 45 L45 55 L35 55 L35 65 L45 65 L45 75 L25 75 L25 65 L35 65 L35 55 L25 55 L25 45 L35 45 L35 35 L25 35 Z"
          fill="url(#gradient1)"
        />
        <path
          d="M55 25 L75 25 L75 35 L65 35 L65 45 L75 45 L75 55 L65 55 L65 65 L75 65 L75 75 L55 75 L55 65 L65 65 L65 55 L55 55 L55 45 L65 45 L65 35 L55 35 Z"
          fill="url(#gradient2)"
        />
        <path
          d="M35 45 L45 45 L45 35 L55 35 L55 45 L65 45 L65 55 L55 55 L55 65 L45 65 L45 55 L35 55 Z"
          fill="white"
          opacity="0.9"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e0e0e0', stopOpacity: 0.8 }} />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#d0d0d0', stopOpacity: 0.7 }} />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      viewBox={showText ? "0 0 400 100" : "0 0 100 100"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
    >
      {/* Icon */}
      <g transform={showText ? "translate(0, 0)" : "translate(0, 0)"}>
        <path
          d="M25 25 L45 25 L45 35 L35 35 L35 45 L45 45 L45 55 L35 55 L35 65 L45 65 L45 75 L25 75 L25 65 L35 65 L35 55 L25 55 L25 45 L35 45 L35 35 L25 35 Z"
          fill="url(#gradient1)"
        />
        <path
          d="M55 25 L75 25 L75 35 L65 35 L65 45 L75 45 L75 55 L65 55 L65 65 L75 65 L75 75 L55 75 L55 65 L65 65 L65 55 L55 55 L55 45 L65 45 L65 35 L55 35 Z"
          fill="url(#gradient2)"
        />
        <path
          d="M35 45 L45 45 L45 35 L55 35 L55 45 L65 45 L65 55 L55 55 L55 65 L45 65 L45 55 L35 55 Z"
          fill="white"
          opacity="0.9"
        />
      </g>

      {/* Text */}
      {showText && (
        <g transform="translate(110, 30)">
          <text
            x="0"
            y="40"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="48"
            fontWeight="500"
            fill="white"
            letterSpacing="-0.5"
          >
            KansoUI
          </text>
        </g>
      )}

      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#e0e0e0', stopOpacity: 0.8 }} />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: '#d0d0d0', stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default KansoUILogo;
