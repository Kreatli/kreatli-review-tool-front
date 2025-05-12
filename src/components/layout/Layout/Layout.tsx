import React from 'react';

import { AppLoader } from '../AppLoader';

export const Layout = ({ children }: React.PropsWithChildren) => {
  return <AppLoader>{children}</AppLoader>;
};
