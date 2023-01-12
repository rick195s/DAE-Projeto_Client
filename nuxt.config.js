export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    // if you choosed Bootstrap Vue...
    // 'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-buefy'

  ],

  // Auth module configuration: https://auth.nuxtjs.org/
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/',
      home: '/'
    },
    watchLoggedIn: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: null
          },
          logout: false,
          user: {
            url: '/api/auth/user',
            method: 'get',
            propertyName: null
          }
        }
        // tokenRequired: true, -> default
        // tokenType: 'bearer' -> default
      }
    }
  },

  router: {
    middleware: [
      'auth'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true,
    credentials: true
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:8080/project/api/',
      pathRewrite: {
        '^/api/': ''
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
