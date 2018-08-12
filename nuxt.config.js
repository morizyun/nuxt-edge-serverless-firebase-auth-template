const cookieParser = require("cookie-parser");
const yaml = require("require-yml");

const serverlessConfig = yaml("./serverless.yml");
const awsRegion = serverlessConfig.provider.region;
const awsS3AssetsBucketName =
  serverlessConfig.resources.Resources.AssetsBucket.Properties.BucketName;

module.exports = {
  apollo: { clientConfigs: { default: "~/apollo/clientConfigs/default.js" } },
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
  modules: ["@nuxtjs/apollo", "@nuxtjs/axios", "@nuxtjs/bulma"],

  render: {
    etag: false,
    // Disabled gzip compression
    gzip: { threshold: 1073741824 }
  },
  serverMiddleware: [cookieParser()],
  srcDir: "src/"
};
