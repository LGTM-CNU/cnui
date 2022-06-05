import { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radio } from '../Radio/Radio';
import { RadioGroup } from './RadioGroup';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = (args) => {
  const [value, setValue] = useState<string | number | null>(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <RadioGroup
      {...args}
      value={value}
      onChangeValue={(value) => setValue(Number(value))}
    >
      <Radio value={1}>Option 1</Radio>
      <Radio value={2}>Option 2</Radio>
      <Radio value={3}>Option 3</Radio>
    </RadioGroup>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  value: 1,
  gap: 16,
  direction: 'column',
};

Basic.argTypes = {
  gap: {
    type: 'number',
  },
};
