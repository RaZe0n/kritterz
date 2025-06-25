import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus,
    Edit,
    Trash2,
    Eye,
    Calendar,
    MapPin,
    Clock,
    Users,
    TrendingUp,
    Filter,
    Search,
    Download,
    Upload
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
    id: number;
    title: string;
    image: string;
    location: string;
    date_range: string;
    description: string;
    opening_hours?: string;
    ticket_info?: string;
    status: 'current' | 'upcoming' | 'past';
    start_date?: string;
    end_date?: string;
    created_at: string;
    updated_at: string;
}

interface Stats {
    total: number;
    active: number;
    upcoming: number;
    completed: number;
}

interface Props {
    currentExhibitions: Event[];
    upcomingExhibitions: Event[];
    pastExhibitions: Event[];
    stats: Stats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Exhibitions',
        href: '/dashboard/exhibitions',
    }
];

export default function DashboardExhibitions({ 
    currentExhibitions, 
    upcomingExhibitions, 
    pastExhibitions, 
    stats 
}: Props) {
    const handleDelete = (eventId: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(route('dashboard.events.destroy', eventId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exhibition Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Exhibition Management</h1>
                        <p className="text-muted-foreground">
                            Manage your exhibitions, events, and gallery shows
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.events.create')}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Exhibition
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.active}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.upcoming}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completed}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Current Exhibitions */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Current Exhibitions</CardTitle>
                                <CardDescription>
                                    Active exhibitions and events
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentExhibitions.map((exhibition, index) => (
                                <motion.div
                                    key={exhibition.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-lg border bg-card"
                                >
                                    <div className="relative pt-[56.25%]">
                                        <img
                                            src={exhibition.image}
                                            alt={exhibition.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                            <div className="flex gap-2">
                                                <Link href={route('dashboard.events.show', exhibition.id)}>
                                                    <Button size="sm" variant="secondary">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('dashboard.events.edit', exhibition.id)}>
                                                    <Button size="sm" variant="secondary">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    size="sm" 
                                                    variant="destructive"
                                                    onClick={() => handleDelete(exhibition.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-medium">{exhibition.title}</h3>
                                            <Badge variant="default">Active</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">{exhibition.description}</p>
                                        <div className="space-y-2 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3 w-3" />
                                                <span>{exhibition.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3 w-3" />
                                                <span>{exhibition.date_range}</span>
                                            </div>
                                            {exhibition.opening_hours && (
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{exhibition.opening_hours}</span>
                                                </div>
                                            )}
                                            {exhibition.ticket_info && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-3 w-3" />
                                                    <span>{exhibition.ticket_info}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming and Past Exhibitions */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Upcoming Exhibitions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                            <CardDescription>
                                Scheduled exhibitions and events
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingExhibitions.map((exhibition, index) => (
                                    <motion.div
                                        key={exhibition.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start space-x-3 p-3 rounded-lg border"
                                    >
                                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                            <img
                                                src={exhibition.image}
                                                alt={exhibition.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <h4 className="text-sm font-medium truncate">{exhibition.title}</h4>
                                                <Badge variant="secondary" className="text-xs">Upcoming</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">{exhibition.location}</p>
                                            <p className="text-xs text-muted-foreground">{exhibition.date_range}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <Link href={route('dashboard.events.edit', exhibition.id)}>
                                                    <Button size="sm" variant="outline">
                                                        <Edit className="h-3 w-3 mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link href={route('dashboard.events.show', exhibition.id)}>
                                                    <Button size="sm" variant="outline">
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        View
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                <Link href={route('dashboard.events.create')}>
                                    <Button variant="outline" className="w-full">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Upcoming Event
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Past Exhibitions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Past Events</CardTitle>
                            <CardDescription>
                                Completed exhibitions and events
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pastExhibitions.map((exhibition, index) => (
                                    <motion.div
                                        key={exhibition.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start space-x-3 p-3 rounded-lg border opacity-75"
                                    >
                                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                            <img
                                                src={exhibition.image}
                                                alt={exhibition.title}
                                                className="w-full h-full object-cover grayscale"
                                                onError={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <h4 className="text-sm font-medium truncate">{exhibition.title}</h4>
                                                <Badge variant="outline" className="text-xs">Completed</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">{exhibition.location}</p>
                                            <p className="text-xs text-muted-foreground">{exhibition.date_range}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Link href={route('dashboard.events.show', exhibition.id)}>
                                                    <Button size="sm" variant="outline">
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        View
                                                    </Button>
                                                </Link>
                                                <Button size="sm" variant="outline">
                                                    <Download className="h-3 w-3 mr-1" />
                                                    Report
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 