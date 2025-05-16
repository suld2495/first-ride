import { twMerge } from 'tailwind-merge';

type LabelSize = 'small' | 'medium' | 'large';

const sizeStyle: Record<LabelSize, string> = {
  small: 'h-7 text-[12px]',
  medium: 'min-w-[60px] p-2 h-9 text-[14px]',
  large: 'min-w-[100px] h-12 text-[16px]',
};

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  size?: LabelSize;
}

const Label = ({ children, size = 'medium', ...props }: LabelProps) => {
  return (
    <label
      className={twMerge(`font-semibold block ${sizeStyle[size]}`)}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
