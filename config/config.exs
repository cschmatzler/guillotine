import Config

esbuild = fn args ->
  [
    args: ~w(./js/index.js --bundle) ++ args,
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]
end

config :esbuild,
  version: "0.21.3",
  module: esbuild.(~w(--format=esm --sourcemap --outfile=../dist/guillotine.mjs)),
  main: esbuild.(~w(--format=cjs --sourcemap --outfile=../dist/guillotine.cjs.js))

config :nanoid,
  size: 16,
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
