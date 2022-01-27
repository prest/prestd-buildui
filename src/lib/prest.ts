import PRestAPI from "@postgresrest/node";

export const getDatabaseScheme: string =
  process.env.PREST_DATABASE + "." + process.env.PREST_SCHEME;

export const prestAPI = new PRestAPI({
  baseUrl: process.env.PREST_URL,
});
