# Guillotine

[![Hex.pm](https://img.shields.io/hexpm/v/guillotine.svg)](https://hex.pm/packages/guillotine)
[![Hexdocs.pm](https://img.shields.io/badge/hexdocs-online-green)](https://hexdocs.pm/guillotine/)

<!-- MDOC !-->

Fully accessible unstyled Phoenix components.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)

## Installation

First, add `guillotine` to the list of dependencies in your `mix.exs`:

```elixir
def deps do
  [
    {:guillotine, "~> 0.1.0"}
  ]
end
```

Guillotine relies heavily on Phoenix hooks that need to be added to your JavaScript bundle.

If you use the default `esbuild` setup that comes with Phoenix, just head to your `app.js` and add the hooks:

```javascript
import { Hooks } from "guillotine";

let liveSocket = new LiveSocket("/live", Socket, {
  hooks: {
    ...Hooks
  },
});
```

If you have a more advanced setup for your assets and use a package manager, install the `phoenix-guillotine` package and import the hooks
from there:

```shell
npm install phoenix-guillotine
```

```javascript
import { Hooks } from "phoenix-guillotine";

let liveSocket = new LiveSocket("/live", Socket, {
  hooks: {
    ...Hooks
  },
});
```
