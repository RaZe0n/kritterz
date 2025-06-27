import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useState } from 'react';

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
        title: 'Edit Event',
        href: '/dashboard/events/edit',
    }
];

export default function EditEvent({ event }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(event.image);
    
    const { data, setData, post, processing, errors } = useForm({
        title: event.title,
        description: event.description,
        image: null as File | null,
        location: event.location,
        date_range: event.date_range,
        opening_hours: event.opening_hours || '',
        ticket_info: event.ticket_info || '',
        status: event.status,
        start_date: event.start_date || '',
        end_date: event.end_date || '',
        _method: 'PUT',
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.events.update', event.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Event" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Edit Event</h1>
                            <p className="text-muted-foreground">
                                Update event details
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                            <CardDescription>
                                Update the details for your event
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter event title"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">{errors.title}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Describe your event"
                                        rows={4}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Enter event location"
                                        className={errors.location ? 'border-red-500' : ''}
                                    />
                                    {errors.location && (
                                        <p className="text-sm text-red-500">{errors.location}</p>
                                    )}
                                </div>

                                {/* Date Range */}
                                <div className="space-y-2">
                                    <Label htmlFor="date_range">Date Range</Label>
                                    <Input
                                        id="date_range"
                                        value={data.date_range}
                                        onChange={(e) => setData('date_range', e.target.value)}
                                        placeholder="e.g., 1 May - 30 June 2024"
                                        className={errors.date_range ? 'border-red-500' : ''}
                                    />
                                    {errors.date_range && (
                                        <p className="text-sm text-red-500">{errors.date_range}</p>
                                    )}
                                </div>

                                {/* Start Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className={errors.start_date ? 'border-red-500' : ''}
                                    />
                                    {errors.start_date && (
                                        <p className="text-sm text-red-500">{errors.start_date}</p>
                                    )}
                                </div>

                                {/* End Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className={errors.end_date ? 'border-red-500' : ''}
                                    />
                                    {errors.end_date && (
                                        <p className="text-sm text-red-500">{errors.end_date}</p>
                                    )}
                                </div>

                                {/* Opening Hours */}
                                <div className="space-y-2">
                                    <Label htmlFor="opening_hours">Opening Hours</Label>
                                    <Input
                                        id="opening_hours"
                                        value={data.opening_hours}
                                        onChange={(e) => setData('opening_hours', e.target.value)}
                                        placeholder="e.g., Di-Zo: 10:00 - 17:00"
                                        className={errors.opening_hours ? 'border-red-500' : ''}
                                    />
                                    {errors.opening_hours && (
                                        <p className="text-sm text-red-500">{errors.opening_hours}</p>
                                    )}
                                </div>

                                {/* Ticket Info */}
                                <div className="space-y-2">
                                    <Label htmlFor="ticket_info">Ticket Information</Label>
                                    <Input
                                        id="ticket_info"
                                        value={data.ticket_info}
                                        onChange={(e) => setData('ticket_info', e.target.value)}
                                        placeholder="e.g., €10 regulier, €5 studenten"
                                        className={errors.ticket_info ? 'border-red-500' : ''}
                                    />
                                    {errors.ticket_info && (
                                        <p className="text-sm text-red-500">{errors.ticket_info}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value: 'current' | 'upcoming' | 'past') => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="current">Current</SelectItem>
                                            <SelectItem value="upcoming">Upcoming</SelectItem>
                                            <SelectItem value="past">Past</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-red-500">{errors.status}</p>
                                    )}
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Image</Label>
                                    <div className="space-y-4">
                                        {imagePreview ? (
                                            <div className="relative">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-64 object-cover rounded-lg border"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2"
                                                    onClick={removeImage}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="mt-4">
                                                    <Label htmlFor="image" className="cursor-pointer">
                                                        <span className="text-blue-600 hover:text-blue-500">
                                                            Click to upload
                                                        </span>
                                                        <span className="text-gray-500"> or drag and drop</span>
                                                    </Label>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        PNG, JPG, GIF up to 20MB
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </div>
                                    {errors.image && (
                                        <p className="text-sm text-red-500">{errors.image}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1"
                                    >
                                        {processing ? 'Updating...' : 'Update Event'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 