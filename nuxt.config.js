// https://github.com/nuxt/nuxt.js/blob/dev/examples/with-sockets/nuxt.config.js
module.exports = {
  telemetry: false,
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "spa",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        defer: true,
        async: true,
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js",
      },
      {
        defer: true,
        async: true,
        src:
          "https://cdn.jsdelivr.net/gh/aframevr/aframe@a326cebe05da7541fb885ed0ce8e16facad7d5bd/dist/aframe-master.min.js",
      },
      // {
      //   src: "https://unpkg.com/networked-aframe/dist/networked-aframe.min.js",
      // },
      { defer: true, async: true, src: "/js/build.js" },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  vue: {
    config: {
      ignoredElements: [
        "a-scene",
        "a-assets",
        "a-asset-item",
        "a-sphere",
        "a-gltf-model",
        "a-camera",
        "a-entity",
        "a-text",
        "a-sky",
        "naf-template",
      ],
    },
  },
}
