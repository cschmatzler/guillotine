import * as menu from "@zag-js/menu";
import { normalizeProps } from "./normalize-props";
import { spreadProps } from "./spread-props";

export const Menu = {
  mounted() {
    this.context = { id: this.el.id };

    this.service = menu.machine(this.context);
    this.api = menu.connect(this.service.state, this.service.send, normalizeProps);

    this.init();
  },

  beforeDestroy() {
    this.service.stop();
  },

  init() {
    const service = this.service;

    this.render();
    service.subscribe(() => {
      this.api = menu.connect(service.state, service.send, normalizeProps);
      this.render();
    });

    service.start();
  },

  labels() {
    return Array.from(this.el.querySelectorAll("[data-part='label']"));
  },

  groups() {
    return Array.from(this.el.querySelectorAll("[data-part='group']"));
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
      this.renderLabel(label);
    });

    this.groups().forEach((group) => {
      this.renderGroup(group);
    });

    this.items().forEach((item) => {
      this.renderItem(item);
    });
  },

  renderLabel(label) {
    spreadProps(label, this.api.getItemGroupLabelProps({ htmlFor: label.dataset.for }));
  },
  renderGroup(group) {
    spreadProps(group, this.api.getItemGroupProps({ id: group.id }));
  },
  renderItem(item) {
    spreadProps(item, this.api.getItemProps({ value: item.id }));
  },
};
