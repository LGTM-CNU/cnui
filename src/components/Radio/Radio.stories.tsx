import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radio } from './Radio';
import { Button } from '../Button';

export default {
  title: 'Components/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(!!args.checked);
  }, [args.checked]);

  return (
    <div>
      <Radio
        {...args}
        checked={selected}
        onChange={(e) => {
          setSelected(true);
        }}
      />
      <Button
        onClick={() => setSelected(false)}
        css={css`
          margin-top: 1rem;
        `}
      >
        Clear
      </Button>
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  children: 'Option 1',
  checked: false,
};

Basic.argTypes = {};

export function Size() {
  const [value, setValue] = useState<number | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div>
      <div css={wrapper}>
        <Radio value={1} size="sm" checked={value === 1} onChange={onChange}>
          Option 1
        </Radio>
        <Radio value={2} size="md" checked={value === 2} onChange={onChange}>
          Option 2
        </Radio>
        <Radio value={3} size="lg" checked={value === 3} onChange={onChange}>
          Option 3
        </Radio>
      </div>
      <Button onClick={() => setValue(null)}>Clear</Button>
    </div>
  );
}

export function Color() {
  const [value, setValue] = useState<number | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div>
      <div css={wrapper}>
        <Radio
          value={1}
          checked={value === 1}
          onChange={onChange}
          color="black"
        >
          Option 1
        </Radio>
        <Radio value={2} checked={value === 2} onChange={onChange} color="red">
          Option 2
        </Radio>
        <Radio
          value={3}
          checked={value === 3}
          onChange={onChange}
          color="orange"
        >
          Option 3
        </Radio>
      </div>
      <Button onClick={() => setValue(null)}>Clear</Button>
    </div>
  );
}

const wrapper = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;
