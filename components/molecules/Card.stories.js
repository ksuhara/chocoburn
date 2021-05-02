import StoryComponent from "./Card";

export default {
  title: "Molecules/Card",
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
    contentUrl: "https://twitter.com/home",
    nftContractAddress: "0x84E9445f43995b0C6a4D4C1d40bb123571c2Eb06",
  },
};
