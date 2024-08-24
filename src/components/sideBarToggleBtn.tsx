import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface SideNavToggleBtnProps {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
  className: string;
}

export const SideBarToggleBtn = (props: SideNavToggleBtnProps) => {
  const handleClick = () => {
    props.setSidebarOpen(!props.sidebarOpen);
  };

  return (
    <div onClick={handleClick} className={props.className}>
      {props.sidebarOpen ? (
        <PanelLeftClose className="h-5 w-5" />
      ) : (
        <PanelLeftOpen className="h-5 w-5" />
      )}
    </div>
  );
};
