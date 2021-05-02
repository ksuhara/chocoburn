import StoryComponent from './Container';

export default {
  title: 'Atoms/Container',
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent> {{ slotComponent }} </StoryComponent>',
});

export const Default = Template.bind({});
Default.args = {
  slotComponent: "Container"
};
