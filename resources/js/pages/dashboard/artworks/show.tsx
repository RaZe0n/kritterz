import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, Calendar, Tag } from 'lucide-react';

interface Artwork {
    id: number;
    title: string;
    description: string;
    image: string;
    status: 'for sale' | 'sold';
    created_at: string;
    updated_at: string;
}

interface Props {
    artwork: Artwork;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gallery',
        href: '/dashboard/gallery',
    },
    {
        title: 'Artwork Details',
        href: '/dashboard/artworks/show',
    }
];

export default function ShowArtwork({ artwork }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this artwork?')) {
            router.delete(route('dashboard.artworks.destroy', artwork.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${artwork.title} - Artwork Details`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{artwork.title}</h1>
                            <p className="text-muted-foreground">
                                Artwork details and information
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.artworks.edit', artwork.id)}>
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
                            <CardTitle>Artwork Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={artwork.image}
                                    alt={artwork.title}
                                    className="w-full h-auto object-contain"
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
                                    <p className="text-lg font-semibold">{artwork.title}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                                    <Badge variant={artwork.status === 'sold' ? 'secondary' : 'default'} className="mt-1">
                                        {artwork.status === 'sold' ? 'Sold' : 'For Sale'}
                                    </Badge>
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
                                    <p className="text-sm mt-1">{artwork.description}</p>
                                </div>
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
                                        <p className="text-sm">{new Date(artwork.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <h3 className="font-medium text-sm text-muted-foreground">Last Updated</h3>
                                        <p className="text-sm">{new Date(artwork.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <h3 className="font-medium text-sm text-muted-foreground">ID</h3>
                                        <p className="text-sm font-mono">{artwork.id}</p>
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