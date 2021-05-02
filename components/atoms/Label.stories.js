import StoryComponent from './Label';

export default {
  title: 'Atoms/Label',
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent :text=text />',
});

export const Default = Template.bind({});
Default.args = {
  text: "Label"
};
