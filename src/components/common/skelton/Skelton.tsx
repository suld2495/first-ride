import { useMemo } from 'react';

import { useAnimation } from '@/hooks/useAnimation';

type SkeltonVariants = 'pulse';

interface SkeltonProps {
  show: boolean;
  variant?: SkeltonVariants;
  width?: string;
  height?: string;
  className?: string;
}

const variantStyles: Record<SkeltonVariants, string> = {
  pulse: 'w-full h-full animate-pulse bg-gray-200',
};

const Skelton = ({
  show,
  variant = 'pulse',
  width = '100%',
  height = '100%',
  className = '',
}: SkeltonProps) => {
  const [shouldRender, handleAnimationEnd] = useAnimation(show);

  const style = useMemo(() => {
    const widthValue = Number.isNaN(Number(width)) ? width : `${width}px`;
    const heightValue = Number.isNaN(Number(height)) ? height : `${height}px`;

    return {
      width: widthValue,
      height: heightValue,
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

export default Skelton;
