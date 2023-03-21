
import type { CodegenConfig } from '@graphql-codegen/cli';
import path from "path"

const pathToSchema = path.join(__dirname, './src/graphql/schema/schema.graphql');
const pathToOperations = path.join(__dirname, './src/graphql/operations.graphql');
const outputPath = path.join(__dirname, "./src/graphql/codegen/graphql.ts");
const introspectionPath = path.join(__dirname, "./graphql.schema.json");


const config: CodegenConfig = {
  overwrite: true,
  // schema: "https://kc2i6rqidfamdby4uc7nwk7siq.appsync-api.us-east-1.amazonaws.com/graphql",
  schema: pathToSchema,
  documents: pathToOperations,
  generates: {
    [outputPath]: {
      // preset: "client",
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-urql'
      ]
    },
    [introspectionPath]: {
      plugins: [
        "introspection"
      ]
    }
  }
};

export default config;
