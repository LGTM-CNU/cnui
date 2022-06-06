import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '../Input/Input';
import { LabelGroup } from './LabelGroup';

export default {
  title: 'Components/LabelGroup',
  component: LabelGroup,
} as ComponentMeta<typeof LabelGroup>;

const Template: ComponentStory<typeof LabelGroup> = (args) => (
  <LabelGroup {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  name: 'LabelGroup',
  children: ({ onFocus, onBlur }) => (
    <Input onFocus={onFocus} onBlur={onBlur} />
  ),
};

Basic.argTypes = {};
