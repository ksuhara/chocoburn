export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Chocoburn",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Burn your NFT and redeem it" },
      { hid: "og:site_name", property: "og:site_name", content: "Chocoburn" },
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:url", property: "og:url", content: "https://burn.chocomint.app" },
      { hid: "og:title", property: "og:title", content: "Chocoburn" },
      { hid: "og:description", property: "og:description", content: "Burn your NFT and redeem it" },
      { hid: "og:image", property: "og:image", content: "https://burn.chocomint.app/ogp.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@fortawesome/fontawesome-svg-core/styles.css", "~/assets/css/tailwind.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/fontawesome.ts"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "vue-social-sharing/nuxt"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  storybook: {
    // Options
  },
  router: {
    trailingSlash: false,
  },
};
