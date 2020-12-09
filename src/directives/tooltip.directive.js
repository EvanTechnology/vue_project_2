export default {
  bind(el, { value }) {
    // eslint-disable-next-line no-undef
    M.Tooltip.init(el, { html: value, position: "top", margin: -25 });
  },
  unbind(el) {
    // eslint-disable-next-line no-undef
    const tooltip = M.Tooltip.getInstance(el);
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
};
