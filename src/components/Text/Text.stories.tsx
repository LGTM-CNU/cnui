import { ComponentMeta, ComponentStory } from '@storybook/react';
import { css } from '@emotion/react';
import { Text } from './Text';

export default {
  title: 'Components/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Done is better than perfect. 완수하는 것이 완벽한 것 보다 낫다.',
  size: 32,
  weight: 500,
};

export function Size() {
  const text =
    'Done is better than perfect. 완수하는 것이 완벽한 것 보다 낫다.';

  return (
    <div css={wrapper}>
      <Text size={72}>{text}</Text>
      <Text size={56}>{text}</Text>
      <Text size={48}>{text}</Text>
      <Text size={40}>{text}</Text>
      <Text size={32}>{text}</Text>
      <Text size={24}>{text}</Text>
      <Text size={20}>{text}</Text>
      <Text size={16}>{text}</Text>
      <Text size={14}>{text}</Text>
      <Text size={12}>{text}</Text>
      <Text size={10}>{text}</Text>
    </div>
  );
}

export function Weight() {
  const text =
    'Done is better than perfect. 완수하는 것이 완벽한 것 보다 낫다.';
  return (
    <div css={wrapper}>
      <Text size={32} weight={900}>
        {text}
      </Text>
      <Text size={32} weight={800}>
        {text}
      </Text>
      <Text size={32} weight={700}>
        {text}
      </Text>
      <Text size={32} weight={600}>
        {text}
      </Text>
      <Text size={32} weight={500}>
        {text}
      </Text>
      <Text size={32} weight={400}>
        {text}
      </Text>
      <Text size={32} weight={300}>
        {text}
      </Text>
      <Text size={32} weight={200}>
        {text}
      </Text>
      <Text size={32} weight={100}>
        {text}
      </Text>
    </div>
  );
}

export function Align() {
  const text = 'hyunjin';

  return (
    <div css={wrapper}>
      <Text align="left">{text}</Text>
      <Text align="center">{text}</Text>
      <Text align="right">{text}</Text>
    </div>
  );
}

export function Truncate() {
  const text =
    'Done is better than perfect. 완수하는 것이 완벽한 것 보다 낫다.';
  return (
    <div css={[wrapper, { width: '150px' }]}>
      <Text truncate>{text}</Text>
    </div>
  );
}

export function Clamp() {
  const text =
    'Done is better than perfect. 완수하는 것이 완벽한 것 보다 낫다.';
  return (
    <div css={[wrapper, { width: '150px' }]}>
      <Text clamp={2}>{text}</Text>
    </div>
  );
}

const wrapper = css`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex-direction: column;
  & + & {
    margin-top: 0.5rem;
  }
`;
