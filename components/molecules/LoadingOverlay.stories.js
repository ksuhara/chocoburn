import StoryComponent from "./LoadingOverlay";

export default {
  title: "Molecules/LoadingOverlay",
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: "<StoryComponent > {{ slotComponent }} </StoryComponent>",
});

export const Default = Template.bind({});
Default.args = {
  slotComponent: "Main",
};
