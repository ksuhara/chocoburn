import StoryComponent from "./WalletConnect";

export default {
  title: "Organisms/WalletConnect",
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: "<StoryComponent />",
});

export const Default = Template.bind({});
Default.args = {};
