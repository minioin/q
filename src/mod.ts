import { Config } from "./config.ts";

interface SearchEngine {
  url: string;
  queryString: string;
}

export async function getSearchUrl(
  config: Config,
  args: Array<string>,
): Promise<SearchEngine> {
  let [target, ...query] = args;
  // If this is an alias, remove the indirection
  target = config.alias[target] ? config.alias[target] : target;
  let url = config.bookmarks[target];
  let queryString = (url ? query : args).join(" ");
  url = url ? url : config.search.default;
  return { url, queryString };
}
