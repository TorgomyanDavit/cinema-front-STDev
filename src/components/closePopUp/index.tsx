import React, { useEffect, useRef } from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClickOutside?(e: MouseEvent): void;
}

const ClickToOutsideClose: React.FC<IProps> = ({ children, className, onClickOutside }) => {
  const container = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (container.current && !container.current.contains(e.target as HTMLElement) && onClickOutside) {
        onClickOutside(e);
      }
    };

    document.addEventListener('click', handle, true);

    return () => {
      document.removeEventListener('click', handle, true);
    };
  }, [onClickOutside]);

  return <div style={{display:"flex",justifyContent:"space-between"}} className={className} ref={container}>{children}</div>;
};

export default ClickToOutsideClose;