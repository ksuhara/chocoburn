import StoryComponent from './MessageModal';

export default {
  title: 'Molecules/MessageModal',
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent :icon=icon :messageText=messageText :buttonText=buttonText :onClickConfirm=onClickConfirm />',
});

export const Default = Template.bind({});
Default.args = {
  icon: "🎉",
  messageText: "Message",
  buttonText: "Button",
  onClickConfirm: "onClickConfirm"
};
