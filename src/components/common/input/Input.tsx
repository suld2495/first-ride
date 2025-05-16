import { twMerge } from 'tailwind-merge';

type InputVariant = 'primary' | 'plain';
type InputSize = 'small' | 'medium' | 'large';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
}

const variantStyle: Record<InputVariant, string> = {
  primary:
    'border-[1px] border-gray-300 rounded-md focus:border-gray-500 focus:ring-0 transition-colors duration-300',
  plain: 'text-gray-main hover:text-gray-main-hover',
};

const sizeStyle: Record<InputSize, string> = {
  small: 'h-7 text-[12px]',
  medium: 'min-w-[60px] p-2 h-9 text-[14px]',
  large: 'min-w-[100px] h-12 text-[16px]',
};

const Input = ({
  className,
  variant = 'primary',
  size = 'medium',
  ...rest
}: InputProps) => {
  return (
    <input
      className={twMerge(
        `outline-0 ${variantStyle[variant]} ${sizeStyle[size]}`,
        className,
      )}
      {...rest}
    />
  );
};

export default Input;
