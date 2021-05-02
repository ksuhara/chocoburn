export const state = () => ({
  isDisplayed: false,
  props: {
    type: "",
    text: "",
  },
});

export const mutations = {
  toggle(state: any) {
    state.isDisplayed = !state.isDisplayed;
  },
  open(state: any, props: any) {
    state.props = props;
    state.isDisplayed = true;
  },
  close(state: any) {
    state.isDisplayed = false;
  },
};
