import StoryComponent from './NotificationToast';

export default {
  title: 'Molecules/NotificationToast',
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent :text=text />',
});

export const Default = Template.bind({});
Default.args = {
  text: "text"
};
