import React, { useState } from 'react';
import { css } from '@emotion/react';
import { TextProps } from '../Text';
import { Label } from '../Label';

interface LabelGroupRenderProps {
  focused: boolean;
  onFocus: (e: React.FocusEvent<HTMLElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLElement>) => void;
  setFocused: (focused: boolean) => void;
}

interface Props {
  children:
    | React.ReactNode
    | ((props: LabelGroupRenderProps) => React.ReactNode);
  className?: string;
  labelClassName?: string;
  size?: TextProps['size'];
  name: string;
  focusedColor?: string;
}

export function LabelGroup({
  children,
  className,
  labelClassName,
  size,
  name,
  focusedColor,
}: Props) {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const content =
    typeof children === 'function'
      ? children({ focused, onFocus, onBlur, setFocused })
      : children;

  return (
    <section css={sectionStyle} className={className}>
      <Label className={labelClassName} focused={focused}>
        {name}
      </Label>
      {content}
    </section>
  );
}

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
