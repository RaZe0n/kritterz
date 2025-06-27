import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    TrendingUp, 
    ShoppingCart, 
    DollarSign, 
    Activity, 
    Calendar,
    Plus,
    Settings,
    FileText,
    BarChart3,
    Bell,
    Mail,
    Palette,
    MapPin,
    Clock,
    Eye
} from 'lucide-react';

interface Artwork {
    id: number;
    title: string;
    description: string;
    image: string;
    status: 'for sale' | 'sold';
    created_at: string;
    updated_at: string;
}

interface Event {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    date_range: string;
    opening_hours?: string;
    ticket_info?: string;
    status: 'current' | 'upcoming' | 'past';
    start_date?: string;
    end_date?: string;
    created_at: string;
    updated_at: string;
}

interface Activity {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'sale' | 'exhibition' | 'visit' | 'creation';
}

interface Stats {
    totalArtworks: number;
    soldArtworks: number;
    availableArtworks: number;
    totalRevenue: number;
    currentExhibitionsCount: number;
    upcomingExhibitionsCount: number;
}

interface Props {
    artworks: Artwork[];
    currentExhibitions: Event[];
    upcomingExhibitions: Event[];
    recentArtworks: Artwork[];
    recentActivity: Activity[];
    stats: Stats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    }
];

export default function Dashboard({ 
    artworks, 
    currentExhibitions, 
    upcomingExhibitions, 
    recentArtworks, 
    recentActivity, 
    stats 
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome terug!</h1>
                        <p className="text-muted-foreground">
                            Hier kan je je dashboard beheren.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/">
                            <Button variant="outline">
                                Return to Homepage
                            </Button>
                        </Link>
                        <Button variant="outline" size="icon">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Mail className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
                            <Palette className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalArtworks}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">{stats.availableArtworks}</span> available for sale
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">{stats.soldArtworks}</span> artworks sold
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Exhibitions</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.currentExhibitionsCount}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-blue-600">{stats.upcomingExhibitionsCount}</span> upcoming
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Gallery Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,247</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">+12%</span> from last week
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    {/* Recent Activity */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Komt nog :P
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Testbericht!
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Komt nog :P 2
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        2 minuten geleden
                                    </Badge>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Testbericht!
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Komt nog :P
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        2 minuten geleden
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Manage your art business
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                <Link href={route('dashboard.artworks.create')}>
                                    <Button className="justify-start w-full" variant="outline">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add New Artwork
                                    </Button>
                                </Link>
                                <Link href={route('dashboard.events.create')}>
                                    <Button className="justify-start w-full" variant="outline">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Schedule Exhibition
                                    </Button>
                                </Link>
                                <Link href={route('dashboard.gallery')}>
                                    <Button className="justify-start w-full" variant="outline">
                                        <Palette className="mr-2 h-4 w-4" />
                                        View Gallery
                                    </Button>
                                </Link>
                                <Link href={route('dashboard.exhibitions')}>
                                    <Button className="justify-start w-full" variant="outline">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        Manage Exhibitions
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Row */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Current Exhibitions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Exhibitions</CardTitle>
                            <CardDescription>
                                Active exhibitions and events
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {currentExhibitions.map((exhibition) => (
                                    <div key={exhibition.id} className="flex items-start space-x-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{exhibition.title}</p>
                                            <p className="text-xs text-muted-foreground">{exhibition.location}</p>
                                            <p className="text-xs text-muted-foreground">{exhibition.date_range}</p>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            Active
                                        </Badge>
                                    </div>
                                ))}
                                {currentExhibitions.length === 0 && (
                                    <p className="text-sm text-muted-foreground">No active exhibitions</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Artwork Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Artwork Status</CardTitle>
                            <CardDescription>
                                Overview of your collection
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Available for Sale</span>
                                    <span className="text-sm font-medium">{stats.availableArtworks}</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                    <div 
                                        className="bg-green-500 h-2 rounded-full" 
                                        style={{ width: `${stats.totalArtworks > 0 ? (stats.availableArtworks/stats.totalArtworks)*100 : 0}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Sold</span>
                                    <span className="text-muted-foreground">{stats.soldArtworks}</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                    <div 
                                        className="bg-blue-500 h-2 rounded-full" 
                                        style={{ width: `${stats.totalArtworks > 0 ? (stats.soldArtworks/stats.totalArtworks)*100 : 0}%` }}
                                    ></div>
                                </div>
                                <div className="pt-2 text-xs text-muted-foreground">
                                    Total collection: {stats.totalArtworks} pieces
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Events */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                            <CardDescription>
                                Scheduled exhibitions and deadlines
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingExhibitions.map((exhibition) => (
                                    <div key={exhibition.id} className="flex items-center space-x-3">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{exhibition.title}</p>
                                            <p className="text-xs text-muted-foreground">{exhibition.location}</p>
                                            <p className="text-xs text-muted-foreground">{exhibition.date_range}</p>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {exhibition.status}
                                        </Badge>
                                    </div>
                                ))}
                                {upcomingExhibitions.length === 0 && (
                                    <p className="text-sm text-muted-foreground">No upcoming events</p>
                                )}
                                <div className="pt-2">
                                    <Link href={route('dashboard.events.create')}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            <Plus className="mr-2 h-3 w-3" />
                                            Add Event
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
