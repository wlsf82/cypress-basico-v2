// module.exports = {
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// };


const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implementa listeners se necessário
    },
    viewportWidth: 411,
    viewportHeight: 731,
    videosFolder: 'cypress/videos', 
    video: true,
  },
});

