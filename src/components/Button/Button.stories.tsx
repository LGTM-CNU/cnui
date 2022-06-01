import { ComponentStory, ComponentMeta } from '@storybook/react';
import { css } from '@emotion/react';
import { Button } from './Button';
// import { Icon } from '../Icon';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Button',
  type: 'primary',
  variant: 'default',
  size: 'md',
  disabled: false,
  isFullWidth: false,
};

Basic.argTypes = {
  onClick: { action: 'clicked' },
};

export function Size() {
  return (
    <div css={wrapper}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function Type() {
  return (
    <div css={wrapper}>
      <Button>Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="destructive">Destructive</Button>
    </div>
  );
}

export function Outline() {
  return (
    <div css={wrapper}>
      <Button type="primary" variant="outline">
        Primary Outline
      </Button>
      <Button type="secondary" variant="outline">
        Secondary Outline
      </Button>
      <Button type="destructive" variant="outline">
        Destructive Outline
      </Button>
    </div>
  );
}

export function Ghost() {
  return (
    <div css={wrapper}>
      <Button type="primary" variant="ghost">
        Primary Ghost
      </Button>
      <Button type="secondary" variant="ghost">
        Secondary Ghost
      </Button>
      <Button type="destructive" variant="ghost">
        Destructive Ghost
      </Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div>
      <div css={wrapper}>
        <Button type="primary" disabled>
          Primary
        </Button>
        <Button type="secondary" disabled>
          Secondary
        </Button>
        <Button type="destructive" disabled>
          Destructive
        </Button>
      </div>
      <div css={wrapper}>
        <Button type="primary" variant="outline" disabled>
          Primary Outline
        </Button>
        <Button type="secondary" variant="outline" disabled>
          Secondary Outline
        </Button>
        <Button type="destructive" variant="outline" disabled>
          Destructive Outline
        </Button>
      </div>
      <div css={wrapper}>
        <Button type="primary" variant="ghost" disabled>
          Primary Ghost
        </Button>
        <Button type="secondary" variant="ghost" disabled>
          Secondary Ghost
        </Button>
        <Button type="destructive" variant="ghost" disabled>
          Destructive Ghost
        </Button>
      </div>
    </div>
  );
}

export function FullWidth() {
  return <Button isFullWidth>Full Width</Button>;
}

export function WithIcon() {
  return (
    <div>
      <div css={wrapper}>{/* <Button icon={} /> */}</div>
    </div>
  );
}
const wrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  & + & {
    margin-top: 0.5rem;
  }
`;
