import React from 'react';
export type SideNavItem = {
  title: string;
  path: string;
  icon?: React.ReactElement; // Use ReactElement for specific React elements
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
