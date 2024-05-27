defmodule Guillotine.Menu do
  @moduledoc """
  An accessible dropdown and context menu that is used to display a list of actions or options that a user can choose.
  """

  use Phoenix.Component

  attr :id, :string, doc: "ID"
  attr :as, :any, default: "div", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def menu(assigns) do
    assigns = assign_new(assigns, :id, fn -> Guillotine.nanoid() end)

    Guillotine.render_as_tag_or_component(assigns, %{"phx-hook" => "Menu"})
  end

  attr :as, :any, default: "button", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def menu_trigger(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "trigger"})
  end

  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def menu_items(assigns) do
    ~H"""
    <div data-part="positioner" {@rest}>
      <div data-part="content">
        <%= render_slot(@inner_block) %>
      </div>
    </div>
    """
  end

  attr :for, :string, required: true, doc: "Group the label belongs to"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def menu_label(assigns) do
    ~H"""
    <div data-part="label" data-for={@for} {@rest}>
      <%= render_slot(@inner_block) %>
    </div>
    """
  end

  attr :id, :string, doc: "ID"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def menu_group(assigns) do
    assigns = assign_new(assigns, :id, fn -> Guillotine.nanoid() end)

    ~H"""
    <div id={@id} data-part="group" {@rest}>
      <%= render_slot(@inner_block) %>
    </div>
    """
  end

  attr :id, :string, doc: "ID"
  attr :as, :any, default: "a", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def menu_item(assigns) do
    assigns = assign_new(assigns, :id, fn -> Guillotine.nanoid() end)

    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "item"})
  end
end
