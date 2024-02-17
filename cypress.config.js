module.exports = {
    // fixturesFolder: false,
    
  e2e: {
    // baseUrl: "http://localhost:3000",
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    // supportFile: false,
    // viewportHeight: 1000, // Resolução de 1280x1000 pixels do navegador em que os testes serão executados
    // viewportWidth: 1280,
    // defaultCommandTimeout: 5000,
    video: true,
    cacheDirectory: ".cache/Cypress",
    experimentalRunAllSpecs: true, // Permite a execução de todos os arquivos de testes em um único processo, em vez de iniciar um novo processo para cada arquivo
    setupNodeEvents(on, config) {
      /* Configuração de event listeners do Node.js surante a execução de testes, 
      por exemplo configurar endpoints de API de teste com base em variáveis de ambiente ou outras configurações.
      Ex: const testDataApiEndpoint = `${config.env.apiUrl}/testData`; */
    }
  }
}
