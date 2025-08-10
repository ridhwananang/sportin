import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';
import type { PageProps } from '@/types';

const footerNavItems: NavItem[] = [
  // {
  //   title: 'Repository',
  //   href: 'https://github.com/laravel/react-starter-kit',
  //   icon: Folder,
  // },
  // {
  //   title: 'Documentation',
  //   href: 'https://laravel.com/docs/starter-kits#react',
  //   icon: BookOpen,
  // },
];

export function AppSidebar() {
  const { auth } = usePage<PageProps>().props;
  const isAdmin = auth.user?.role === 'admin' || auth.user?.role === 'super_admin';

  const mainNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutGrid,
    },
    {
      title: 'Sport',
      href: '/sports',
      icon: Folder,
    },
    {
      title: 'Booking',
      href: '/bookings',
      icon: Folder,
    },
    ...(
      isAdmin
        ? [
            {
              title: 'Area',
              href: '/areas',
              icon: Folder,
            },
            {
              title: 'Users',
              href: '/users',
              icon: Folder,
            },
            {
              title: 'Laporan',
              href: '/finance',
              icon: Folder,
            },
          ]
        : []
    ),
  ];

  return (
    <Sidebar collapsible="icon" variant="floating" className="dark:bg-gray-900">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <NavFooter items={footerNavItems} />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
