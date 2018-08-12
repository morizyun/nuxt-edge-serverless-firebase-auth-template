const cookieParser = require("cookie-parser");
const yaml = require("require-yml");
require("dotenv").config();

const serverlessConfig = yaml("./serverless.yml");
const awsRegion = serverlessConfig.provider.region;
const awsS3AssetsBucketName =
  serverlessConfig.resources.Resources.AssetsBucket.Properties.BucketName;

module.exports = {
  apollo: { clientConfigs: { default: "~/apollo/clientConfigs/default.ts" } },
  build: {
    extractCSS: true,
    publicPath: `https://s3.${awsRegion}.amazonaws.com/${awsS3AssetsBucketName}/`,
    extend(config, { isServer }) {
      const tsLoader = {
        exclude: [/vendor/, /\.nuxt/],
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true }
      };
      config.module.rules.push({
        test: /((client|server)\.js)|(\.tsx?)$/,
        ...tsLoader
      });
      config.resolve.extensions.push(".ts");
      config.module.rules.map(rule => {
        if (rule.loader === "vue-loader") {
          rule.options.loaders = { ts: tsLoader };
        }
        return rule;
      });
      if (isServer) {
        config.externals = [];
      }
    }
  },
  env: {
    FIREBASE_CLIENT_API_KEY: process.env.FIREBASE_CLIENT_API_KEY,
    FIREBASE_CLIENT_AUTH_DOMAIN: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
    FIREBASE_CLIENT_DATABASE_URL: process.env.FIREBASE_CLIENT_DATABASE_URL,
    FIREBASE_CLIENT_MESSAGING_SENDER_ID:
      process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID,
    FIREBASE_CLIENT_PROJECT_ID: process.env.FIREBASE_CLIENT_PROJECT_ID,
    FIREBASE_CLIENT_STORAGE_BUCKET: process.env.FIREBASE_CLIENT_STORAGE_BUCKET
  },
  extensions: ["js", "ts"],
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        content: "Nuxt-edge Serverless Template",
        hid: "description",
        name: "description"
      }
    ],
    title: "Nuxt Edge Serverless Template"
  },
  loading: { color: "#51cf66" },
  modules: ["@nuxtjs/apollo", "@nuxtjs/bulma", "@nuxtjs/dotenv"],
  plugins: [
    { src: "~/plugins/firebase-client-init.ts", ssr: false },
    { src: "~/plugins/auth-cookie.ts", ssr: false }
  ],
  render: {
    etag: false,
    // Disabled gzip compression
    gzip: { threshold: 1073741824 }
  },
  router: {
    middleware: "router-auth"
  },
  serverMiddleware: [
    cookieParser(),
    "~/serverMiddleware/validateFirebaseIdToken"
  ],
  srcDir: "src/",
  vendor: ["firebase"]
};
