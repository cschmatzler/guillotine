defmodule Guillotine.Menu do
  @moduledoc """
  Menus offer an easy way to build custom, accessible dropdown components with robust support for keyboard navigation.

  ## Example

  ```heex
  <.menu>
    <.menu_trigger class="rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
      Menu
    </.menu_trigger>
    <.menu_positioner>
      <.menu_content class="z-10 w-48 text-sm origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <.menu_item as={&Phoenix.Component.link/1} navigate="/link" class="block px-4 py-2 outline-0 data-[highlighted]:bg-gray-100">
          Phoenix Link
        </.menu_item>
        <.menu_item as="a" href="/anchor" class="block px-4 py-2 outline-0 data-[highlighted]:bg-gray-100">
          Anchor
        </.menu_item>
      </.menu_content>
    </.menu_positioner>
  </.menu>
  ```
  """

  use Phoenix.Component

  attr :id, :string, doc: "ID"
  attr :as, :any, default: "div", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  @doc """

  """
  def menu(assigns) do
    assigns = assign_new(assigns, :id, fn -> Guillotine.nanoid() end)

    Guillotine.render_as_tag_or_component(assigns, %{"role" => "menu", "phx-hook" => "Menu"})
  end

  attr :as, :any, default: "button", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def menu_trigger(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "trigger"})
  end

  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def menu_positioner(assigns) do
    ~H"""
    <div data-part="positioner" {@rest}>
      <%= render_slot(@inner_block) %>
    </div>
    """
  end

  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def menu_content(assigns) do
    ~H"""
    <div data-part="content" {@rest}>
      <%= render_slot(@inner_block) %>
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

  attr :as, :any, default: "hr", doc: "Tag or component to render as"
  attr :rest, :global, include: ~w(href), doc: "Additional attributes"

  def menu_separator(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "separator"})
  end

  attr :id, :string, doc: "ID"
  attr :as, :any, default: "a", doc: "Tag or component to render as"
  attr :rest, :global, include: ~w(href), doc: "Additional attributes"
  slot :inner_block

  def menu_item(assigns) do
    assigns = assign_new(assigns, :id, fn -> Guillotine.nanoid() end)

    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "item"})
  end
end
