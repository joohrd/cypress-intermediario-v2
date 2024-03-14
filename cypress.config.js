const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true,
      requestMode: true,
    },
    //Executa todos os testes em modo interativo
    experimentalRunAllSpecs: true,
  },
  fixturesFolder: false,
  video: false,
})
