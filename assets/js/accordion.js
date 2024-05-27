import * as accordion from "@zag-js/accordion";
import { normalizeProps } from "./normalize-props";
import { spreadProps } from "./spread-props";

export const Accordion = {
  mounted() {
    this.context = { id: this.el.id };

    this.service = accordion.machine(this.context);
    this.api = accordion.connect(this.service.state, this.service.send, normalizeProps);

    this.init();
  },

  beforeDestroy() {
    this.service.stop();
  },

  init() {
    const service = this.service;

    this.render();
    service.subscribe(() => {
      this.api = accordion.connect(service.state, service.send, normalizeProps);
      this.render();
    });

    service.start();
  },

  items() {
    return Array.from(this.el.querySelectorAll("[data-element='item']"));
  },

  render() {
    spreadProps(this.el, this.api.rootProps);

    this.items().forEach((item) => {
      this.renderItem(item);
    });
  },

  renderItem(item) {
    const index = item.dataset.index;
    if (!index) throw new Error("Expected index to be defined");

    const trigger = item.querySelector("[data-element='trigger']");
    const content = item.querySelector("[data-element='content']");

    if (!trigger) throw new Error("Expected trigger to be defined");
    if (!content) throw new Error("Expected content to be defined");

    spreadProps(item, this.api.getItemProps({ value: index }));
    spreadProps(trigger, this.api.getItemTriggerProps({ value: index }));
    spreadProps(content, this.api.getItemContentProps({ value: index }));
  },
};
