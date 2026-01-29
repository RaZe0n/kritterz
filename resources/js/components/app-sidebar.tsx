import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Palette, MapPin, DollarSign, Settings, Users, Instagram, Facebook, Mail } from 'lucide-react';
import AppLogo from './app-logo';

function getMainNavItems(locale: string): NavItem[] {
    return [
        { title: 'Gallery', href: `/${locale}/dashboard/gallery`, icon: Palette },
        { title: 'Exhibitions', href: `/${locale}/dashboard/exhibitions`, icon: MapPin },
        { title: 'Newsletter', href: `/${locale}/dashboard/newsletter/subscribers`, icon: Mail },
    ];
}

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
    const locale = (usePage().props as { locale?: string }).locale ?? 'nl';
    const mainNavItems = getMainNavItems(locale);
    const dashboardHref = `/${locale}/dashboard`;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardHref} prefetch>
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
