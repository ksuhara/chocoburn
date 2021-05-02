import StoryComponent from './Radio';

export default {
  title: 'Atoms/Radio',
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent :values=values :labels=labels />',
});

export const Default = Template.bind({});
Default.args = {
  values: ["value1", "value2"],
  labels: ["label1", "label2"]
};
