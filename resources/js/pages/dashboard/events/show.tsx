import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, Calendar, MapPin, Clock, Users, Tag } from 'lucide-react';

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

interface Props {
    event: Event;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Exhibitions',
        href: '/dashboard/exhibitions',
    },
    {
        title: 'Event Details',
        href: '/dashboard/events/show',
    }
];

export default function ShowEvent({ event }: Props) {
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'current':
                return 'default';
            case 'upcoming':
                return 'secondary';
            case 'past':
                return 'outline';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'current':
                return 'Active';
            case 'upcoming':
                return 'Upcoming';
            case 'past':
                return 'Completed';
            default:
                return status;
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(route('dashboard.events.destroy', event.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${event.title} - Event Details`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
                            <p className="text-muted-foreground">
                                Event details and information
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.events.edit', event.id)}>
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Image */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video overflow-hidden rounded-lg border">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Details */}
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Title</h3>
                                    <p className="text-lg font-semibold">{event.title}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                                    <Badge variant={getStatusBadgeVariant(event.status)} className="mt-1">
                                        {getStatusLabel(event.status)}
                                    </Badge>
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
                                    <p className="text-sm mt-1">{event.description}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Event Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Event Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <h3 className="font-medium text-sm text-muted-foreground">Location</h3>
                                        <p className="text-sm">{event.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <h3 className="font-medium text-sm text-muted-foreground">Date Range</h3>
                                        <p className="text-sm">{event.date_range}</p>
                                    </div>
                                </div>
                                {event.start_date && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <h3 className="font-medium text-sm text-muted-foreground">Start Date</h3>
                                            <p className="text-sm">{new Date(event.start_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                )}
                                {event.end_date && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <h3 className="font-medium text-sm text-muted-foreground">End Date</h3>
                                            <p className="text-sm">{new Date(event.end_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                )}
                                {event.opening_hours && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <h3 className="font-medium text-sm text-muted-foreground">Opening Hours</h3>
                                            <p className="text-sm">{event.opening_hours}</p>
                                        </div>
                                    </div>
                                )}
                                {event.ticket_info && (
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <h3 className="font-medium text-sm text-muted-foreground">Ticket Information</h3>
                                            <p className="text-sm">{event.ticket_info}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Metadata</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <h3 className="font-medium text-sm text-muted-foreground">Created</h3>
                                        <p className="text-sm">{new Date(event.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <h3 className="font-medium text-sm text-muted-foreground">Last Updated</h3>
                                        <p className="text-sm">{new Date(event.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <h3 className="font-medium text-sm text-muted-foreground">ID</h3>
                                        <p className="text-sm font-mono">{event.id}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 