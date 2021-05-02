export const state = () => ({
  isDisplayed: false
});

export const mutations = {
  toggle(state: any) {
    state.isDisplayed = !state.isDisplayed;
  },
  open(state: any) {
    state.isDisplayed = true;
  },
  close(state: any) {
    state.isDisplayed = false;
  }
};
