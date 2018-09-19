// 无状态组件

import React, { MouseEvent, SFC }from 'React';

export const withDefaultProps = <
  P extends object,
  DP extends Partial<P> = Partial<P>
>(
  defaultProps: DP,
  Cmp: ComponentType<P>,
) => {
  // 提取出必须的属性
  type RequiredProps = Omit<P, keyof DP>;
  // 重新创建我们的属性定义，通过一个相交类型，将所有的原始属性标记成可选的，必选的属性标记成可选的
  type Props = Partial<DP> & Required<RequiredProps>;

  Cmp.defaultProps = defaultProps;

  // 返回重新的定义的属性类型组件，通过将原始组件的类型检查关闭，然后再设置正确的属性类型
  return (Cmp as ComponentType<any>) as ComponentType<Props>;
};

const defaultProps = {
    color: 'red',
};
type DefaultProps = typeof defaultProps;

type Props = {
    onClick(e: MouseEvent<HTMLElement>): void;
    color?: string;
} & DefaultProps;

const Button: SFC<Props> = ({onClick: handleClick, color, children}) => (
    <button style={{color}} onClick={(e) => handleClick(e)}>
        {children}
    </button>
)

const ButtonWithDefaultProps = withDefaultProps(defaultProps, Button);

export default Button;