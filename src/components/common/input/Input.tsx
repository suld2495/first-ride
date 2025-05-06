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
  small: 'h-7 text-small',
  medium: 'min-w-[60px] p-2 h-9 text-middle',
  large: 'min-w-[100px] h-12 text-large',
};

const Input = ({
  variant = 'primary',
  size = 'medium',
  ...rest
}: InputProps) => {
  return (
    <input
      className={`outline-0 ${variantStyle[variant]} ${sizeStyle[size]}`}
      {...rest}
    />
  );
};

export default Input;
