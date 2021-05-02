import StoryComponent from "./Button";

export default {
  title: "Atoms/Button",
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: "<StoryComponent> {{ slotComponent }} </StoryComponent>",
});

export const Default = Template.bind({});
Default.args = {
  slotComponent: "Button",
};
