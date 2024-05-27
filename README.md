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

Guillotine relies heavily on Phoenix hooks that need to be added to your JavaScript bundle. To do that, head to your `app.js` and add the
hooks:

```javascript
import { Hooks } from "guillotine";

let liveSocket = new LiveSocket("/live", Socket, {
  hooks: {
    ...Hooks
  },
});
```
