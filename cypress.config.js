const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "viewportHeight": 880,
    "viewportWidth": 1280
  },
  component:{
    "pluginsFile": false
  }
});
