import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/server/test/**/*.test.ts'],
    setupFiles: ['src/server/test/setup.ts'],
  },
})
