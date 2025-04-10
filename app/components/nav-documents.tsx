import { Link, useLocation } from 'react-router';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '~/components/ui/sidebar';

type Item = {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

type NavDocumentsProps = {
  items: Item[];
};

export function NavDocuments(props: NavDocumentsProps) {
  const { items } = props;

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Resources</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link to={item.url}>
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
