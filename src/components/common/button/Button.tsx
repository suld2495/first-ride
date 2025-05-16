import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'plain';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
}

const variantStyle: Record<ButtonVariant, string> = {
  primary:
    'text-white bg-primary-color hover:bg-primary-color-hover transition-colors duration-200',
  plain: 'text-gray-main hover:text-gray-main-hover',
};

const sizeStyle: Record<ButtonSize, string> = {
  small: 'h-7 text-[12px] rounded-sm',
  medium: 'min-w-[60px] p-2 h-9 text-[14px] rounded-md',
  large: 'min-w-[100px] h-12 text-[18px] rounded-xl',
};

const Button = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        `cursor-pointer ${variantStyle[variant]} ${sizeStyle[size]} ${className}`,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
