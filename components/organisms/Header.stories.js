import StoryComponent from './Header';

export default {
  title: 'Organisms/Header',
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent />',
});

export const Default = Template.bind({});
Default.args = {

};
