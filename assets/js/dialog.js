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
    parts = ["trigger", "backdrop", "positioner", "content", "title", "description", "close-trigger"]
    parts.forEach((part) => this.renderPart(part));
  },

  renderPart(name) {
    const part = this.el.querySelector(`[data-part='${name}']`);
    if (part) spreadProps(part, this.api[`${kebabToCamel(name)}Props`]);
  }
};

function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, function(_match, letter) {
    return letter.toUpperCase();
  });
}
