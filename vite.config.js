import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiVersion = env.GEMINI_API_VERSION || 'v1beta';
  const model = env.GEMINI_MODEL || 'gemini-2.0-flash';
  
  return {
    server: {
      proxy: {
        // Secure local proxy to mask Gemini API calls
        '/api/audit': {
          target: 'https://generativelanguage.googleapis.com',
          changeOrigin: true,
          rewrite: (path) => {
            return `/${apiVersion}/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;
          }
        }
      }
    }
  };
});
