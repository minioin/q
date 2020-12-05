import { Application } from "https://deno.land/x/abc@v1.2.1/mod.ts";
import { loadUserConfig } from "../src/config.ts";
import { getSearchUrl } from "../src/mod.ts";

const app = new Application();
const config = await loadUserConfig();
const home = Deno.env.get("HOME");

app.get("/search", async (c) => {
  const query = c.queryParams["q"];
  if (query) {
    const loggingProxy = Deno.writeTextFile(
      `${home}/.local/share/q/history.log`,
      `${+new Date()}, ${query}\n`,
      { append: true, create: true },
    );
    const args = query.split(" ");
    const { url, queryString } = await getSearchUrl(config, args);
    c.response.status = 307;
    c.response.headers.append("location", url.replace("%s", queryString));
    await loggingProxy;
    return c.response;
  }

  return "Hello, there";
}).start({ port: 3738 });
