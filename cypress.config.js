const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Viewport padrão

  viewportHeight: 880,
  viewportWidth: 1280,
  video: true,
  e2e: {
    setupNodeEvents(on, config) {

    },
  },
});
