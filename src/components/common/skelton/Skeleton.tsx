import { useMemo } from 'react';

import { useAnimation } from '@/hooks/useAnimation';

type SkeltonVariants = 'pulse';

interface SkeltonProps {
  show: boolean;
  variant?: SkeltonVariants;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const variantStyles: Record<SkeltonVariants, string> = {
  pulse: 'w-full h-full animate-pulse bg-gray-200',
};

const Skeleton = ({
  show,
  variant = 'pulse',
  width = '100%',
  height = '100%',
  className = '',
}: SkeltonProps) => {
  const [shouldRender, handleAnimationEnd] = useAnimation(show);

  const style = useMemo(() => {
    const toPxels = (value: string | number) =>
      typeof value === 'number' ? `${value}px` : value;

    return {
      width: toPxels(width),
      height: toPxels(height),
    };
  }, [width, height]);

  return (
    shouldRender && (
      <div
        className={`${show ? 'fade-in' : 'fade-out'}`}
        style={style}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={`${variantStyles[variant]} ${className}`} />
      </div>
    )
  );
};

export default Skeleton;
