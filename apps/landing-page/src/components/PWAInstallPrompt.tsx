import { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * PWA Install Prompt Component
 *
 * Provides:
 * - Install app prompt for mobile devices
 * - Update notification when new version is available
 * - iOS-specific install instructions
 */
export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  // Service worker update logic
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('Service Worker registered:', r);
    },
    onRegisterError(error) {
      console.error('Service Worker registration error:', error);
    },
  });

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      return; // Already installed, don't show prompt
    }

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator as any).standalone;

    if (isIOS && !isInStandaloneMode) {
      // Show iOS instructions after a delay
      setTimeout(() => setShowIOSInstructions(true), 3000);
    }

    // Android/Desktop install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show install prompt after a delay to avoid being intrusive
      setTimeout(() => setShowInstallPrompt(true), 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleUpdateClick = () => {
    updateServiceWorker(true);
  };

  return (
    <>
      {/* Update Available Notification */}
      {needRefresh && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md p-4 bg-indigo-600 text-white rounded-lg shadow-2xl animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Update Available</h3>
              <p className="text-sm opacity-90 mb-3">A new version of KansoUI is available. Update now for the latest features.</p>
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateClick}
                  className="px-4 py-2 bg-white text-indigo-600 rounded font-medium text-sm hover:bg-gray-100 transition-colors"
                >
                  Update Now
                </button>
                <button
                  onClick={() => setNeedRefresh(false)}
                  className="px-4 py-2 bg-indigo-700 text-white rounded font-medium text-sm hover:bg-indigo-800 transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
            <button
              onClick={() => setNeedRefresh(false)}
              className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Android/Desktop Install Prompt */}
      {showInstallPrompt && !showIOSInstructions && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-2xl animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Install KansoUI</h3>
              <p className="text-sm opacity-90 mb-3">Install our app for quick access and offline support.</p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="px-4 py-2 bg-white text-indigo-600 rounded font-medium text-sm hover:bg-gray-100 transition-colors"
                >
                  Install
                </button>
                <button
                  onClick={() => setShowInstallPrompt(false)}
                  className="px-4 py-2 bg-indigo-700 text-white rounded font-medium text-sm hover:bg-indigo-800 transition-colors"
                >
                  Not Now
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* iOS Install Instructions */}
      {showIOSInstructions && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-2xl animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Install on iOS</h3>
              <ol className="text-sm opacity-90 space-y-1 list-decimal list-inside mb-3">
                <li>Tap the Share button <span className="inline-block">⎙</span></li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" to confirm</li>
              </ol>
            </div>
            <button
              onClick={() => setShowIOSInstructions(false)}
              className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
