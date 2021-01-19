import { Application } from "https://deno.land/x/abc@v1.2.1/mod.ts";
import { loadUserConfig } from "../src/config.ts";
import { getSearchUrl } from "../src/mod.ts";

const app = new Application();
const config = await loadUserConfig();

app.get("/search", async (c) => {
  const query = c.queryParams["q"];
  if (query) {
    const logSearch = fetch("http://localhost:3737/event/default", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "searched",
        data: JSON.stringify(query),
      }),
    });
    const args = query.split(" ");
    const { url, queryString } = await getSearchUrl(config, args);
    c.response.status = 307;
    c.response.headers.append("location", url.replace("%s", queryString));
    await logSearch;
    return c.response;
  }

  return "Hello, there";
})
.start({ port: 3738 });
