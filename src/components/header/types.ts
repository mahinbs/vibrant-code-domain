
export interface MenuItem {
  name: string;
  href: string;
  section: string;
}

export interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
  isHomePage: boolean;
  onSmoothScroll: (href: string, sectionId: string) => void;
  onClose?: () => void;
}
