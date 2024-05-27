defmodule Guillotine do
  @moduledoc "README.md"
             |> File.read!()
             |> String.split("<!-- MDOC !-->")
             |> Enum.fetch!(1)

  import Phoenix.Component

  @external_resource "README.md"

  @doc false
  def nanoid do
    Nanoid.generate(16, "0123456789abcdefghijklmnopqrstuvwxyz")
  end

  @doc false
  def render_as_tag_or_component(assigns, extras \\ %{}) do
    assigns =
      assigns
      |> Map.merge(Map.get(assigns, :rest, %{}))
      |> Map.delete(:rest)
      |> Map.merge(extras)

    ~H"""
    <%= if is_function(@as) do %>
      <%= Phoenix.LiveView.TagEngine.component(@as, Map.delete(assigns, :as), {__ENV__.module, __ENV__.function, __ENV__.file, __ENV__.line}) %>
    <% else %>
      <.dynamic_tag name={@as} {Map.delete(assigns, :as)} />
    <% end %>
    """
  end
end
