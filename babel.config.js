module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["@babel/preset-env", {
        targets: {
          browsers: ["last 2 firefox versions"]
        },
        //modules: false
      }],
      "@babel/preset-react"
    ],
    plugins: [
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-optional-chaining",
      ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true, "legacy": false }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-pipeline-operator", { "proposal": "smart" }],
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-export-namespace-from"
    ]
  };
};
