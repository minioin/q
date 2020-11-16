import { Config, loadUserConfig } from "../src/config.ts";
import { getSearchUrl } from "../src/mod.ts";
import { opn } from "https://denopkg.com/hashrock/deno-opn/opn.ts";

const { run, args } = Deno;

async function main() {
  const config: Config = await loadUserConfig();
  const { url, queryString } = await getSearchUrl(config, args);

  return opn(url.replace("%s", queryString));
}

main();
