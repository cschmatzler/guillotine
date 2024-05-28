import * as dialog from "@zag-js/dialog";
import { normalizeProps } from "./normalize-props";
import { spreadProps } from "./spread-props";

export const Dialog = {
  mounted() {
    this.context = { id: this.el.id };

    this.service = dialog.machine(this.context);
    this.api = dialog.connect(this.service.state, this.service.send, normalizeProps);

    this.render();
    this.service.subscribe(() => {
      this.api = dialog.connect(this.service.state, this.service.send, normalizeProps);
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

  render() {
    const trigger = this.el.querySelector("[data-part='trigger']");
    const backdrop = this.el.querySelector("[data-part='backdrop']");
    const positioner = this.el.querySelector("[data-part='positioner']");
    const content = this.el.querySelector("[data-part='content']");
    const title = this.el.querySelector("[data-part='title']");
    const description = this.el.querySelector("[data-part='description']");
    const closeTrigger = this.el.querySelector("[data-part='close-trigger']");

    if (trigger) spreadProps(trigger, this.api.triggerProps);
    if (backdrop) spreadProps(backdrop, this.api.backdropProps);
    if (positioner) spreadProps(positioner, this.api.positionerProps);
    if (content) spreadProps(content, this.api.contentProps);
    if (title) spreadProps(title, this.api.titleProps);
    if (description) spreadProps(description, this.api.descriptionProps);
    if (closeTrigger) spreadProps(closeTrigger, this.api.closeTrigger);
  },
};
