# Commands

| Command | Description |
| --- | --- |
| `yarn dev` | Runs API locally for development purposes using [Serverless Offline](https://www.serverless.com/plugins/serverless-offline) (AWS Lambda version). |
| `yarn generate` | Generates both Nexus Schema Typings and Prisma Client |
| `yarn lint` | Runs ESLint. Use `yarn lint --fix` to autofix errors/warnings. |
| `yarn db:migrate` | Migrates the local database up to a specific state. Alias to `prisma migrate up --experimental`. |
| `yarn db:seed` | Generate test data for local database

# Running first time

Prerequisites:
- Postgres installed locally, setup with credentials postgres / postgres

Commands:
- `yarn` to install dependencies
- `yarn generate` to make sure all the correct types are generated
- `yarn db:migrate` to make sure latest migrations are applied to the deb
- `yarn db:seed` generate test data
- `yarn dev` to start. GraphQL endpoint will be available on http://localhost:4000/development/graphql

Note: This commands assume Unix based shell (bash or similar). If you are running from Window Command Line, you need to adjust `generate` command, since it sets env variable `TYPEGEN` before running the script
