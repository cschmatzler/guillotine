defmodule Guillotine do
  @moduledoc false
  import Phoenix.Component

  def nanoid do
    Nanoid.generate(16, "0123456789abcdefghijklmnopqrstuvwxyz")
  end

  def render_as_tag_or_component(assigns, extras \\ %{}) do
    assigns =
      assigns
      |> Map.merge(Map.get(assigns, :rest, %{}))
      |> Map.delete(:rest)
      |> Map.merge(extras)

    ~H"""
    <%= if is_function(@as) do %>
      <%= Phoenix.LiveView.TagEngine.component(@as, Map.delete(assigns, :as), {__ENV__.module, __ENV__.function, __ENV__.file, __ENV__.line}) %>
    <% end %>

    <%= if is_binary(@as) do %>
      <.dynamic_tag name={@as} {Map.delete(assigns, :as)} />
    <% end %>
    """
  end
end
