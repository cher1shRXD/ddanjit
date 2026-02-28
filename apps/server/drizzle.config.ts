import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'mysql',
  schema: ['../../packages/domain/src/**/schema.ts', '../../packages/domain/src/**/enums.ts'],
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})