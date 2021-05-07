import { Application } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import { loadUserConfig } from "../src/config.ts";
import { getSearchUrl } from "../src/mod.ts";

const app = new Application();
const config = await loadUserConfig();

app.get("/search", async (c) => {
  const query = c.queryParams["q"];
  if (query) {
    const args = query.split(" ");
    const { url, queryString } = await getSearchUrl(config, args);
    const finalUrl = encodeURI(url.replace("%s", queryString));
    c.response.status = 307;
    c.response.headers.append("location", finalUrl);
    return c.response;
  }

  return "Hello, there";
})
  .start({ port: 3738 });
