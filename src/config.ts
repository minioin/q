import { parse } from "https://deno.land/std/encoding/toml.ts";

export interface SearchConfig {
  default: string;
}

export interface Config {
  search: Record<string, string>;
  bookmarks: Record<string, string>;
  alias: Record<string, string>;
}

export async function loadUserConfig(): Promise<Config> {
  const home = Deno.env.get("HOME");
  const contents = await Deno.readTextFile(`${home}/.config/q/config.toml`);
  return loadConfig(contents);
}

export function loadConfig(contents: string): Config {
  const parsed: unknown = parse(contents);
  const config: Config = parsed as Config;
  return config;
}
