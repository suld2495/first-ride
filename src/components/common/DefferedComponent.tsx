import { useEffect, useState } from 'react';

import { useAnimation } from '@/hooks/useAnimation';

interface DefferedComponentProps {
  show: boolean;
  animation?: boolean;
  children: React.ReactNode;
}

const DefferedComponent = ({
  children,
  show,
  animation = false,
}: DefferedComponentProps) => {
  const [shouldRender, handleAnimationEnd, setRender] = useAnimation(show);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 200);

    if (!animation && !show) {
      setRender(false);
    }
  }, [animation, setRender, show]);

  let showClass = 'block';
  let hideClass = 'hidden';

  if (animation) {
    showClass = 'fade-in';
    hideClass = 'fade-out';
  }

  return (
    shouldRender && (
      <div
        className={`${fadeIn ? '' : 'hidden'} ${fadeIn && show ? showClass : ''} ${show ? '' : hideClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default DefferedComponent;
