import Button, { ButtonProps } from './Button';

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  iconPosition?: 'left' | 'right';
  gap?: number;
}

const IconButton = ({
  icon,
  iconPosition = 'left',
  children,
  gap = 2,
  ...props
}: IconButtonProps) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ gap: `${gap}px` }}
    >
      <Button {...props}>
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </Button>
    </div>
  );
};

export default IconButton;
