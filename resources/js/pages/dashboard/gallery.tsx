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
    Filter,
    Search,
    Grid3X3,
    List,
    Download,
    Upload
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Artwork {
    id: number;
    title: string;
    image: string;
    description: string;
    status: 'for sale' | 'sold';
    tags: Array<{
        id: number;
        name: string;
        color: string;
    }>;
    created_at: string;
    updated_at: string;
}

interface Stats {
    total: number;
    forSale: number;
    sold: number;
    totalValue: number;
}

interface Props {
    artworks: Artwork[];
    stats: Stats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gallery',
        href: '/dashboard/gallery',
    }
];

export default function DashboardGallery({ artworks, stats }: Props) {
    const handleDelete = (artworkId: number) => {
        if (confirm('Are you sure you want to delete this artwork?')) {
            router.delete(route('dashboard.artworks.destroy', artworkId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gallery Management</h1>
                        <p className="text-muted-foreground">
                            Manage your artwork collection and inventory
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.tags.index')}>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Manage Tags
                            </Button>
                        </Link>
                        <Link href={route('dashboard.artworks.create')}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Artwork
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">For Sale</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.forSale}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sold</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.sold}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">€{stats.totalValue.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Artwork Collection</CardTitle>
                                <CardDescription>
                                    Manage and organize your artwork inventory
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search artworks..."
                                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>

                        {/* Artwork Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {artworks.map((artwork, index) => (
                                <motion.div
                                    key={artwork.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-lg border"
                                >
                                    <div className="relative">
                                        <img
                                            src={artwork.image}
                                            alt={artwork.title}
                                            className="w-full h-auto max-h-80 object-contain transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                            <div className="flex gap-2">
                                                <Link href={route('dashboard.artworks.show', artwork.id)}>
                                                    <Button size="sm" variant="secondary">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('dashboard.artworks.edit', artwork.id)}>
                                                    <Button size="sm" variant="secondary">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    size="sm" 
                                                    variant="destructive"
                                                    onClick={() => handleDelete(artwork.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-medium text-sm">{artwork.title}</h3>
                                            <Badge variant={artwork.status === 'sold' ? 'secondary' : 'default'}>
                                                {artwork.status === 'sold' ? 'Sold' : 'For Sale'}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2">{artwork.description}</p>
                                        
                                        {/* Tags */}
                                        {artwork.tags && artwork.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {artwork.tags.map((tag) => (
                                                    <span
                                                        key={tag.id}
                                                        className="px-2 py-1 text-xs rounded-full"
                                                        style={{
                                                            backgroundColor: tag.color + '20',
                                                            color: tag.color,
                                                        }}
                                                    >
                                                        {tag.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{new Date(artwork.created_at).getFullYear()}</span>
                                            <span>{artwork.status === 'sold' ? 'Sold' : 'Available'}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 