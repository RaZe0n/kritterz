import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Palette, MapPin, DollarSign, Settings, Users, Instagram, Facebook, Mail } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Gallery',
        href: '/dashboard/gallery',
        icon: Palette,
    },
    {
        title: 'Exhibitions',
        href: '/dashboard/exhibitions',
        icon: MapPin,
    },
    {
        title: 'Newsletter',
        href: '/dashboard/newsletter/subscribers',
        icon: Mail,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Instagram',
        href: 'https://www.instagram.com/',
        icon: Instagram,
    },
    {
        title: 'Facebook',
        href: 'https://www.facebook.com/',
        icon: Facebook,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
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

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
