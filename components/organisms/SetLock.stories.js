import StoryComponent from "./SetLock";

export default {
  title: "Organisms/SetLock",
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: "<StoryComponent />",
});

export const Default = Template.bind({});
Default.args = {};
