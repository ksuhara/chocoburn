import StoryComponent from "./Footer";

export default {
  title: "Organisms/Footer",
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
