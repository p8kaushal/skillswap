export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@sidebase/nuxt-auth'],
  css: ['@/assets/css/main.css'],
  app: {
    head: {
      title: 'Nuxt-Prisma Example (TypeScript)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  runtimeConfig: {
    baseURL: '/api/auth',
    jwtSecret: 'demo-secret-key-change-in-production'
  },
  auth: {
    originEnvKey: 'NUXT_BASE_URL',
    pages: {
      login: '/login' // If your login page is at app/pages/auth/signin.vue
    },    
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/signup', method: 'post' },
        getSession: { path: '/session', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        headerName : 'Authorization',
      }      
    }
  },
  nitro: {
    preset: 'vercel',
    // Ensure @prisma/client is treated as an external dependency for Nitro builds
    externals: {
      external: ['@prisma/client'],
      inline: []
    }
  },
  vite: {
    build: {
      rollupOptions: {
        // Externalize Prisma and its runtime so Rollup doesn't try to bundle node-only APIs into the browser build
        external: ['@prisma/client', '.prisma/client', /@prisma\/client\/runtime\/.*/]
      }
    },
    optimizeDeps: {
      // Prevent Vite from pre-bundling Prisma
      exclude: ['@prisma/client', '.prisma/client', /@prisma\/client\/runtime\/.*/]
    },
    ssr: {
      // Ensure Prisma is not bundled for SSR client-side bundles
      external: ['@prisma/client', '@prisma/client/runtime/*', '.prisma/client']
    }
  },
  // Do NOT transpile Prisma client into the client bundle — keep it external
  build: {
    transpile: []
  }   
});