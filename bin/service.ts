import "https://deno.land/x/fetch_event_adapter/listen.ts";

import { getSearchUrl } from "../src/mod.ts";
import { loadUserConfig } from "../src/config.ts";
const config = await loadUserConfig();

async function search(request: Request) {
  const query = new URL(request.url).searchParams.get("q");
  if (query) {
    const args = query.split(" ");
    const { url, queryString } = await getSearchUrl(config, args);
    const finalUrl = encodeURI(url.replace("%s", queryString));

    return new Response("", {
      status: 307,
      headers: {
        "location": finalUrl,
      },
    });
  }

  return new Response("Hello");
}

self.addEventListener(
  "fetch",
  (event) => event.respondWith(search(event.request)),
);

// Or if you are using oak, use following
// addEventListener("fetch", app.fetchEventHandler());
