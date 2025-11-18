/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_KEY: string
  readonly VITE_ANALYTICS_ID: string
  readonly VITE_TRACKING_ENABLED: string
  readonly VITE_ENABLE_REAL_TIME: string
  readonly VITE_ENABLE_EXPORT: string
  readonly VITE_DEV_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
