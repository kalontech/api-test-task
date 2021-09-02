import { Config } from "apollo-server-lambda"
import { applyMiddleware } from "graphql-middleware"
import { nexusPrisma } from "nexus-plugin-prisma"
import { SchemaConfig } from "nexus/dist/builder"
import path from "path"

import env from "../utils/env"
import { TMiddleware } from "./middlewares/auth-middleware"

interface ConfigWithMiddleware extends Config {
  middleware: TMiddleware[]
}

export const configureSchemaWithTypes = (types: any[]): SchemaConfig => {
  const schemaConfig: SchemaConfig = {
    outputs: {},
    plugins: [],
    types,
  }
  if (env.TYPEGEN) {
    schemaConfig.outputs = {
      schema: path.join(__dirname, "..", "..", "generated", "schema.graphql"),
      typegen: path.join(__dirname, "..", "..", "generated", "nexus.ts"),
    }
  }
  if (env.TYPEGEN) {
    schemaConfig.contextType = {
      alias: "ctx",
      export: "Context",
      module: path.join(__dirname, "context.ts"),
    }
  }
  if (env.TYPEGEN) {
    schemaConfig.plugins?.push(
      nexusPrisma({
        experimentalCRUD: true,
        outputs: {
          typegen: path.join(__dirname, "..", "..", "generated", "prisma.ts"),
        },
        shouldGenerateArtifacts: true,
      }),
    )
  } else {
    schemaConfig.plugins?.push(
      nexusPrisma({
        experimentalCRUD: true,
        outputs: {},
        shouldGenerateArtifacts: false,
      }),
    )
  }
  return schemaConfig
}

export const configureServer = ({
  context,
  middleware,
  schema,
  ...rest
}: ConfigWithMiddleware): Config => {
  const config = { context, middleware, schema, ...rest }
  // If some middleware provided, apply them on the schema.
  if (middleware.length && schema) {
    config.schema = applyMiddleware(schema, ...middleware)
  }
  return config
}
