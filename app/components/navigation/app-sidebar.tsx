import * as React from 'react';
import {
  IconBarcode,
  IconChartBar,
  IconCoin,
  IconDashboard,
  IconDatabase,
  IconFileAnalytics,
  IconHelp,
  IconInnerShadowTop,
  IconLeaf,
  IconPlant,
  IconSearch,
  IconSeeding,
  IconSettings,
  IconShoppingCart,
  IconTractor,
  IconUsers,
  IconPlant2,
  IconUser,
} from '@tabler/icons-react';

import { NavDocuments } from '~/components/navigation/nav-documents';
import { NavMain } from '~/components/navigation/nav-main';
import { NavSecondary } from '~/components/navigation/nav-secondary';
import { NavUser } from '~/components/navigation/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';
import { BoxesIcon, WarehouseIcon } from 'lucide-react';

const data = {
  user: {
    name: 'Farmer',
    email: '6209tanvir@gmail.com',
    avatar: '/avatars/farmer.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Product Catalog',
      url: '/products',
      icon: IconDatabase,
    },
    {
      title: 'My Farm',
      url: '/my-farm',
      icon: IconTractor,
    },
    {
      title: 'Market Analysis',
      url: '/market-analysis',
      icon: IconChartBar,
    },
    {
      title: 'Crop Management',
      url: '/crop-management',
      icon: IconPlant,
    },
    {
      title: 'Buyers & Sellers',
      url: '/buyers-sellers',
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: 'Produce',
      icon: IconPlant2,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Current Inventory',
          url: '#',
        },
        {
          title: 'Seasonal Crops',
          url: '#',
        },
      ],
    },
    {
      title: 'Sales',
      icon: IconCoin,
      url: '#',
      items: [
        {
          title: 'Recent Sales',
          url: '#',
        },
        {
          title: 'Price History',
          url: '#',
        },
      ],
    },
    {
      title: 'Forecasts',
      icon: IconFileAnalytics,
      url: '#',
      items: [
        {
          title: 'Price Predictions',
          url: '#',
        },
        {
          title: 'Demand Trends',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
    {
      title: 'Login',
      url: '/login',
      icon: IconUser,
    },
  ],
  documents: [
    {
      name: 'Crop Database',
      url: '/crop-database',
      icon: IconDatabase,
    },
    {
      name: 'Market Reports',
      url: '/market-reports',
      icon: IconFileAnalytics,
    },
    {
      name: 'Warehouses',
      url: '/warehouses',
      icon: WarehouseIcon,
    },
    {
      name: 'Inventory',
      url: '/inventory',
      icon: BoxesIcon,
    },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    id: number;
    role: string;
    name: string;
    email: string;
    avatar: string;
  };
};

export function AppSidebar(props: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconLeaf className="text-primary h-6 w-6" />
                <span className="text-base font-semibold">Krishok's</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
