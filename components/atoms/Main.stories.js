import StoryComponent from './Main';

export default {
  title: 'Atoms/Main',
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent > {{ slotComponent }} </StoryComponent>',
});

export const Default = Template.bind({});
Default.args = {
  slotComponent: "Main"
};
