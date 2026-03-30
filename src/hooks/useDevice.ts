import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface UseDeviceReturn {
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  windowWidth: number;
}

export const useDevice = (): UseDeviceReturn => {
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 768;
  });

  const getDeviceType = (width: number): DeviceType => {
    if (width < 768) {
      return 'mobile';
    } else if (width < 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [deviceType, setDeviceType] = useState<DeviceType>(() => getDeviceType(windowWidth));

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const nextDeviceType = getDeviceType(currentWidth);

      if (nextDeviceType !== deviceType) {
        setDeviceType(nextDeviceType);
        setWindowWidth(currentWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [deviceType]);

  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    windowWidth,
  };
};
