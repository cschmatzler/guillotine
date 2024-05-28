defmodule Guillotine.Dialog do
  @moduledoc """
  A dialog component.

  ## Example

  ```heex
  <.dialog>
    <.dialog_trigger class="rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
      Open dialog
    </.dialog_trigger>
    <.dialog_backdrop class="absolute inset-0 w-full h-full bg-gray-200"></.dialog_backdrop>
    <.dialog_positioner class="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-center justify-center p-4">
      <.dialog_content class="w-full max-w-md rounded-xl bg-white p-6 outline-0">
        <.dialog_title class="text-base font-medium">Dialog</.dialog_title>
        <.dialog_description class="mt-2 text-sm">Welcome to Guillotine!</.dialog_description>
        <div class="mt-4">
          <.dialog_close_trigger class="rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
            Close
          </.dialog_close_trigger>
        </div>
      </.dialog_content>
    </.dialog_positioner>
  </.dialog>
  ```
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
