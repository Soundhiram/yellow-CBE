import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run yellow:serve',
        production: 'nx run yellow:preview',
      },
      ciWebServerCommand: 'nx run yellow:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
