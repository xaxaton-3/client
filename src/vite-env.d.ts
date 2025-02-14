/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GEOIS_API_URL: string;
  readonly VITE_GEOIS_USERNAME: string;
  readonly VITE_GEOIS_PASSWORD: string;
  readonly VITE_GEOIS_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
