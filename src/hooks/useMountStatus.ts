import { useEffect, useState } from 'react';

const useMountStatus = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

export default useMountStatus;
