import { css } from '@emotion/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

type CheckboxStory = ComponentStory<typeof Checkbox>;

const Template: CheckboxStory = (args) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onToggle={() => {
        setChecked(!checked);
        args.onToggle();
      }}
    />
  );
};

export const Basic = Template.bind({});

Basic.args = {
  size: 'sm',
};
Basic.argTypes = {
  onToggle: { action: 'onToggle' },
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};
Disabled.argTypes = {
  onToggle: { action: 'onToggle' },
};

const SizeTemplate: CheckboxStory = (args) => {
  const [checked, setChecked] = useState(false);
  const onToggle = () => setChecked(!checked);

  return (
    <div
      css={css`
        display: flex;
        gap: 1rem;
        flex-direction: column;
      `}
    >
      <div>
        <Checkbox size="sm" checked={checked} onToggle={onToggle}>
          Small
        </Checkbox>
      </div>
      <div>
        <Checkbox size="md" checked={checked} onToggle={onToggle}>
          Medium
        </Checkbox>
      </div>
      <div>
        <Checkbox size="lg" checked={checked} onToggle={onToggle}>
          Large
        </Checkbox>
      </div>
    </div>
  );
};

export const Size = SizeTemplate.bind({});
