import { useMemo, useState } from 'react';

import { toPxels } from '@/utils/css-utils';

import Skeleton from '../skelton/Skeleton';

interface PreviewImageProps {
  className?: string;
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}

const PreviewImage = ({
  className,
  src,
  alt,
  width = '100%',
  height = '100%',
}: PreviewImageProps) => {
  const [show, setShow] = useState(true);
  const style = useMemo(() => {
    return {
      width: toPxels(width),
      height: toPxels(height),
    };
  }, [width, height]);

  const handleLoad = () => {
    setTimeout(() => {
      setShow(false);
    }, 400);
  };

  return (
    <div className="relative w-full h-full" style={style}>
      <img
        className={`w-full h-full rounded-lg object-contain ${className} ${show ? 'hidden' : ''}`}
        src={src}
        alt={alt}
        onLoad={handleLoad}
      />
      <Skeleton
        className="absolute top-0 left-0 rounded-2xl"
        show={show}
        width={style.width}
        height={style.height}
      />
    </div>
  );
};

export default PreviewImage;
