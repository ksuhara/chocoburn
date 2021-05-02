import StoryComponent from './Input';

export default {
  title: 'Atoms/Input',
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent :placeholder=placeholder />',
});

export const Default = Template.bind({});
Default.args = {
  type: "text",
  placeholder: "Input"
};
