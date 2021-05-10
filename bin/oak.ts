import "https://deno.land/x/fetch_event_adapter/listen.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

import { getSearchUrl } from "../src/mod.ts";
import { loadUserConfig } from "../src/config.ts";
const config = await loadUserConfig();

async function search(ctx: any) {
  const query = ctx.request.url.searchParams.get("q");
  if (query) {
    const args = query.split(" ");
    const { url, queryString } = await getSearchUrl(config, args);
    const finalUrl = encodeURI(url.replace("%s", queryString));

    ctx.response.status = 307;
    ctx.response.headers.set("location", finalUrl);
  }
}

const app = new Application();
app.use(search);

addEventListener("fetch", app.fetchEventHandler());
