defmodule Guillotine.Accordion do
  @moduledoc false
  use Phoenix.Component

  attr :id, :string, required: true

  attr :heading, :string,
    default: "h3",
    values: ["h2", "h3", "h4", "h5", "h6"],
    doc: """
    The heading level for the section title (trigger).
    """

  attr :class, :any,
    default: [],
    doc: "Additional CSS classes. Can be a string or a list of strings."

  attr :rest, :global, doc: "Any additional HTML attributes."

  slot :section, required: true do
    attr :title, :string
  end

  def accordion(assigns) do
    ~H"""
    <div id={@id} phx-hook="Accordion" class={List.wrap(@class)} {@rest}>
      <div :for={{section, index} <- Enum.with_index(@section, 1)} data-element="item" data-index={index}>
        <.dynamic_tag name={@heading}>
          <button type="button" data-element="trigger">
            <span><%= section.title %></span>
          </button>
        </.dynamic_tag>
        <div data-element="content">
          <%= render_slot(section) %>
        </div>
      </div>
    </div>
    """
  end
end
