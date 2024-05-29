defmodule Guillotine.Menu do
  @moduledoc """
  Menus offer an easy way to build custom, accessible dropdown components with robust support for keyboard navigation.

  ## Example

  ```heex
      <div {menu()}>
        <button
          class="rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          {menu_trigger()}
        >
          Menu
        </button>
        <div {menu_positioner()}>
          <div
            class="z-10 w-48 text-sm origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            {menu_content()}
          >
            <Phoenix.Component.link navigate="/link" class="block px-4 py-2 outline-0 data-[highlighted]:bg-gray-100" {menu_item()}>
              Link
            </Phoenix.Component.link>
            <a href="/anchor" id="test" class="block px-4 py-2 outline-0 data-[highlighted]:bg-gray-100" {menu_item()}>Anchor</a>
          </div>
        </div>
      </div>
    </div>
  ```
  """

  use Phoenix.Component

  import Guillotine

  def menu do
    %{"id" => nanoid(), "phx-hook" => "Menu"}
  end

  def menu_trigger do
    %{"data-part" => "trigger"}
  end

  def menu_positioner do
    %{"data-part" => "positioner"}
  end

  def menu_content do
    %{"data-part" => "content"}
  end

  def menu_separator do
    %{"data-part" => "separator"}
  end

  def menu_label do
    %{"data-part" => "label"}
  end

  def menu_group do
    %{"data-part" => "group", "id" => nanoid()}
  end

  def menu_item do
    %{"data-part" => "item", "id" => nanoid()}
  end
end
