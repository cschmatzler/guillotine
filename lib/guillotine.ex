defmodule Guillotine do
  @moduledoc "README.md"
             |> File.read!()
             |> String.split("<!-- MDOC !-->")
             |> Enum.fetch!(1)

  @external_resource "README.md"

  @doc false
  def nanoid do
    Nanoid.generate(16, "0123456789abcdefghijklmnopqrstuvwxyz")
  end
end
