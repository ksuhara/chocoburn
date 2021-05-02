export const state = () => ({
  address: "",
});

export const mutations = {
  setAddress(state: any, address: string) {
    state.address = address;
  },
};
