import * as menu from "@zag-js/menu";
import { normalizeProps, spreadProps } from "./util";

export const Menu = {
  mounted() {
    this.context = { id: this.el.id };

    this.service = menu.machine(this.context);
    this.api = menu.connect(this.service.state, this.service.send, normalizeProps);

    this.render();
    this.service.subscribe(() => {
      this.api = menu.connect(this.service.state, this.service.send, normalizeProps);
      this.render();
    });

    this.service.start();
  },

  updated() {
    this.render();
  },

  beforeDestroy() {
    this.service.stop();
  },

  labels() {
    return Array.from(this.el.querySelectorAll("[data-part='label']"));
  },

  groups() {
    return Array.from(this.el.querySelectorAll("[data-part='group']"));
  },

  separators() {
    return Array.from(this.el.querySelectorAll("[data-part='separator']"));
  },

  items() {
    return Array.from(this.el.querySelectorAll("[data-part='item']"));
  },

  render() {
    const trigger = this.el.querySelector("[data-part='trigger']");
    const positioner = this.el.querySelector("[data-part='positioner']");
    const content = this.el.querySelector("[data-part='content']");

    if (trigger) spreadProps(trigger, this.api.triggerProps);
    if (positioner) spreadProps(positioner, this.api.positionerProps);
    if (content) spreadProps(content, this.api.contentProps);

    this.labels().forEach((label) => {
      spreadProps(label, this.api.getItemGroupLabelProps({ htmlFor: label.dataset.for }));
    });

    this.groups().forEach((group) => {
      spreadProps(group, this.api.getItemGroupProps({ id: group.id }));
    });

    this.separators().forEach((separator) => spreadProps(separator, this.api.separatorProps));

    this.items().forEach((item) => {
      spreadProps(item, this.api.getItemProps({ value: item.id }));
    });
  },
};
