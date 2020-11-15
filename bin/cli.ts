import { parse } from "https://deno.land/std/encoding/toml.ts";

interface SearchConfig {
	default: string,
};

interface Config {
	search: Record<string, string>,
	bookmarks: Record<string, string>,
	alias: Record<string, string>,
};

async function main(){
	const home = Deno.env.get("HOME");
	const contents = await Deno.readTextFile(`${home}/.config/q/config.toml`)
	const parsed: unknown = parse(contents);
	const config: Config = parsed as Config;

	let [target, ...query] = Deno.args
	if(config.alias[target]) {
		target = config.alias[target]
	}
	let url  = config.bookmarks[target]
	let queryString = (url ? query: Deno.args).join(' ');

	const open = Deno.run({ cmd: ["xdg-open", url.replace("%s", queryString)]});
	const openResult = await open.status();
	if (!openResult.success) {
		throw new Error("Failed to open editor.");
	}
}

main()
