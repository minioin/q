# Readme
Search bookmarks server and cli.

## Installation
- Cli: ``deno install -A -f -n q https://raw.githubusercontent.com/minioin/q/release/bin/cli.ts``
- Server: Download [systemd unit](./systemd/qservice.service) and enable it.
- Extension: Download and install [Firefox](https://addons.mozilla.org/en-US/firefox/addon/q-search-engine/)
- Configuration: ``~/.config/q/config.toml``

## Configuration
See example config at [default.toml](default.toml).
Sources: frontend-search plugin, my own additions.

## Usage
- ``q caniuse serviceworker``
