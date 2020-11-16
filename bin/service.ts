import { Application } from "https://deno.land/x/abc@v1.2.1/mod.ts";
import { loadUserConfig } from "../src/config.ts";
import { getSearchUrl } from "../src/mod.ts";

const app = new Application();
const config = await loadUserConfig();

app.get("/search", async (c) => {
  const query = c.queryParams["q"];
  if (query) {
    let args = query.split(" ");
    const { url, queryString } = await getSearchUrl(config, args);
    c.response.status = 307;
    c.response.headers.append("location", url.replace("%s", queryString));
    return c.response;
  }

  return "Hello, there";
}).start({ port: 3738 });
