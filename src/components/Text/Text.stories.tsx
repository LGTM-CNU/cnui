import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text } from './Text';

export default {
  title: 'Components/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Hello World',
};
