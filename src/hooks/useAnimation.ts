import { useEffect, useState } from 'react';

export const useAnimation = (
  show: boolean,
): [boolean, React.AnimationEventHandler, (render: boolean) => void] => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) {
      setRender(true);
    }
  }, [show]);

  const handleAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return [shouldRender, handleAnimationEnd, setRender];
};
