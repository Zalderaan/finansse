import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB limit
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/finansse-backend/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              plugins: [
                {
                  cacheKeyWillBeUsed: async ({ request }) => {
                    const url = new URL(request.url);
                    url.search = '';
                    return url.toString()
                  },
                },
              ],
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week cache
              },

            }
          },
          {
            urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,  // 30 days
              },
            },
          },
        ]
      },
      includeAssets: [
        'finansse-logo/logo-x192.png',
        'finansse-logo/logo-x512.png',
        'finansse-logo/logo-maskable-x512.png'
      ],
      manifest: {
        name: 'Finansse',
        short_name: 'Finansse',
        description: 'Powerful expense-tracking system with AI integration that allows you to talk to your data',
        theme_color: '#ffffff',
        background_color: '#ffffff',  // Background color for the splash screen (matches theme_color for consistency)
        start_url: '/',  // URL to open when launched from home screen (root is typical)
        display: 'standalone',  // Makes it feel like a native app (hides browser UI)
        scope: '/',  // Navigation scope (limits where the app can navigate)
        orientation: 'portrait-primary',  // Preferred orientation (good for mobile finance apps)
        lang: 'en',  // Language of the app (adjust if multi-language)
        dir: 'ltr',  // Text direction (left-to-right for English)
        categories: ['finance', 'productivity'],  // For app store categorization
        icons: [
          // Your existing icons are fine, but consider adding more sizes for better coverage
          // VitePWA can auto-generate these if you point to a source image (see below)
          {
            src: 'finansse-logo/logo-x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'finansse-logo/logo-x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'finansse-logo/logo-maskable-x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
