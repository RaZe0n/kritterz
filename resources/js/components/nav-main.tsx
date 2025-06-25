import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    
    const isActive = (href: string) => {
        // Normalize URLs by removing trailing slashes for comparison
        const normalizedHref = href.replace(/\/$/, '');
        const normalizedCurrentUrl = page.url.replace(/\/$/, '');
        
        // Exact match
        if (normalizedHref === normalizedCurrentUrl) {
            return true;
        }
        
        // For dashboard sub-pages, check if current URL starts with the href
        if (normalizedHref !== '/dashboard' && normalizedCurrentUrl.startsWith(normalizedHref)) {
            return true;
        }
        
        // Special case for dashboard home
        if (normalizedHref === '/dashboard' && normalizedCurrentUrl === '/dashboard') {
            return true;
        }
        
        return false;
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton  
                            asChild 
                            isActive={isActive(item.href)}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
