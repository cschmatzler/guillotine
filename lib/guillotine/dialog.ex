defmodule Guillotine.Dialog do
  @moduledoc """

  """

  use Phoenix.Component

  attr :id, :string, doc: "ID"
  attr :as, :any, default: "div", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  @doc """

  """
  def dialog(assigns) do
    assigns = assign_new(assigns, :id, fn -> Guillotine.nanoid() end)

    Guillotine.render_as_tag_or_component(assigns, %{"phx-hook" => "Dialog"})
  end

  attr :as, :any, default: "button", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def dialog_trigger(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "trigger"})
  end

  attr :as, :any, default: "div", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"

  def dialog_backdrop(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "backdrop"})
  end

  attr :as, :any, default: "div", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def dialog_positioner(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "positioner"})
  end

  attr :as, :any, default: "div", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def dialog_content(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "content"})
  end

  attr :as, :any, default: "h2", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def dialog_title(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "title"})
  end

  attr :as, :any, default: "span", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def dialog_description(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "description"})
  end

  attr :as, :any, default: "button", doc: "Tag or component to render as"
  attr :rest, :global, doc: "Additional attributes"
  slot :inner_block

  def dialog_close_trigger(assigns) do
    Guillotine.render_as_tag_or_component(assigns, %{"data-part" => "close-trigger"})
  end
end
