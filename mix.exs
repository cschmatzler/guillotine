defmodule Guillotine.MixProject do
  use Mix.Project

  def project do
    [
      app: :guillotine,
      description: "Fully accessible unstyled Phoenix components",
      version: "0.1.1",
      elixir: "~> 1.13",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      package: package()
    ]
  end

  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:esbuild, "~> 0.8", runtime: Mix.env() == :dev},
      {:phoenix, "~> 1.7"},
      {:nanoid, "~> 2.1"},
      {:phoenix_live_view, "~> 0.20"},
      {:ex_doc, "~> 0.33", only: :dev, runtime: false},
      {:styler, "== 1.0.0-rc.0", only: [:dev, :test], runtime: false}
    ]
  end

  defp package do
    [
      maintainers: ["Christoph Schmatzler"],
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/cschmatzler/guillotine"},
      files: ~w(assets/js lib dist LICENSE.md mix.exs package.json README.md .formatter.exs)
    ]
  end
end
