module.exports = defineConfig({
  video: true, // Grava vídeos dos testes
  screenshotOnRunFailure: true, // Tira screenshots em caso de falha
    viewportHeight: 960,
  viewportWidth: 1440,
  e2e: {
    setupNodeEvents(on, config) {},
  },
});
