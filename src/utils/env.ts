interface ProcessEnv {
  APP_SECRET: string
  NODE_ENV: string
  WEB_APP_URL: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  PRISMA_DATABASE_URL: string
  TYPEGEN: string
  SLS_REGION: string
  SLS_STAGE: string
}

const env = (process.env as unknown) as ProcessEnv

export default env
