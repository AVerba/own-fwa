import { useMediaQuery } from 'react-responsive';

const media = (children, device) => {
  return device ? children : null;
};

export const isDesktop = cb => cb({ minWidth: 1280 });
export const isTablet = cb => cb({ minWidth: 768, maxWidth: 1279 });
export const isMobile = cb => cb({ maxWidth: 767 });
export const isDefault = cb => cb({ minWidth: 768 });

export const Desktop = ({ children }) => {
  return media(children, isDesktop(useMediaQuery));
};
export const Tablet = ({ children }) => {
  return media(children, isTablet(useMediaQuery));
};
export const Mobile = ({ children }) => {
  return media(children, isMobile(useMediaQuery));
};
export const Default = ({ children }) => {
  return media(children, isDefault(useMediaQuery));
};
