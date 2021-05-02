import StoryComponent from "./Lock";

export default {
  title: "Organisms/Lock",
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: "<StoryComponent :lock=lock />",
});

export const Default = Template.bind({});
Default.args = {
  lock: {
    id: "id",
    chainId: "1",
    contentUrl: "https://vimeo.com/310675655",
    nftContractAddress: "0x84f6261350151dc9cbf5b33c5354fe9a82166e26",
  },
};
