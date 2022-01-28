import PRestAPI from "@postgresrest/node";

export default new PRestAPI({
  baseUrl: process.env.PREST_URL,
});
