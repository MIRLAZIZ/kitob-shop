// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

  nitro: {
    routeRules: {
      '/**': { ssr: true }
    }
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  imports: {
    dirs: ["store"],
  },

  modules: ["@nuxt/devtools", "@pinia/nuxt", 'nuxt-swiper'],

  routeRules: {
    "/**": { robots: "index, follow" },
  },

  runtimeConfig: {
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL,
      siteName: "Kitob",
      bookUrl: process.env.BOOK_URL,
      siteDescription:
        "A Full StoreFront built with Nuxt 3 + Pinia 2 + Bootstrap 5....",
      language: "uz",
    },
  },


  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },

  css: ["~/assets/styles/main.scss"],

  render: {
    csp: {
      hashAlgorithm: "sha256",
      policies: {
        "script-src": ["'self'", "*.vercel-insights.com"],
      },
      addMeta: true,
    },
  },

  devtools: { enabled: false },
  ssr: true,

  // server: {
  //   port: process.env.PORT || 3000,
  // },

  compatibilityDate: "2025-02-18",

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true  // SASS warninglarni o'chirish
        }
      }
    }
  }
});