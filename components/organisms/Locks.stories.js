import StoryComponent from "./Locks";

export default {
  title: "Organisms/Locks",
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: "<StoryComponent :lockList=lockList />",
});

export const Default = Template.bind({});
Default.args = {
  lockList: [
    {
      id: "id",
      chainId: "1",
      contentUrl: "https://twitter.com/home",
      nftContractAddress: "0x84E9445f43995b0C6a4D4C1d40bb123571c2Eb06",
    },
    {
      id: "id",
      chainId: "1",
      contentUrl: "https://twitter.com/home",
      nftContractAddress: "0x84E9445f43995b0C6a4D4C1d40bb123571c2Eb06",
    },
  ],
};
