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
    Mail,
    Search,
    Filter,
    Download,
    UserCheck,
    UserX,
    Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';

interface NewsletterSubscriber {
    id: number;
    email: string;
    is_active: boolean;
    subscribed_at: string;
    created_at: string;
    updated_at: string;
}

interface Stats {
    total: number;
    active: number;
    inactive: number;
}

interface Props {
    subscribers: NewsletterSubscriber[];
    stats: Stats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Newsletter',
        href: '/dashboard/newsletter/subscribers',
    }
];

export default function DashboardNewsletter({ subscribers, stats }: Props) {
    const handleDelete = async (subscriberId: number) => {
        if (!confirm('Are you sure you want to delete this subscriber?')) return;
        setManualAddMessage(null);
        setManualAddError(null);
        try {
            const response = await axios.delete(route('dashboard.newsletter.subscribers.destroy', subscriberId));
            if (response.data.success) {
                setManualAddMessage('Abonnee succesvol verwijderd!');
                router.reload({ only: ['subscribers', 'stats'] });
            } else {
                setManualAddError(response.data.message || 'Er is een fout opgetreden.');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setManualAddError(error.response.data.message);
            } else {
                setManualAddError('Er is een fout opgetreden.');
            }
        }
    };

    const handleToggleStatus = (subscriberId: number) => {
        router.patch(route('dashboard.newsletter.subscribers.toggle', subscriberId));
    };

    // State for manual add
    const [manualEmail, setManualEmail] = useState('');
    const [manualAddLoading, setManualAddLoading] = useState(false);
    const [manualAddMessage, setManualAddMessage] = useState<string|null>(null);
    const [manualAddError, setManualAddError] = useState<string|null>(null);
    const [copied, setCopied] = useState(false);

    const handleManualAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setManualAddLoading(true);
        setManualAddMessage(null);
        setManualAddError(null);
        try {
            const response = await axios.post(route('dashboard.newsletter.subscribers.add'), { email: manualEmail });
            if (response.data.success) {
                setManualAddMessage('Abonnee succesvol toegevoegd!');
                setManualEmail('');
                // Reload the page to update the list
                router.reload({ only: ['subscribers', 'stats'] });
            } else {
                setManualAddError(response.data.message || 'Er is een fout opgetreden.');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setManualAddError(error.response.data.message);
            } else {
                setManualAddError('Er is een fout opgetreden.');
            }
        } finally {
            setManualAddLoading(false);
        }
    };

    // Copy all emails to clipboard or open mailto
    const handleCopyAllEmails = () => {
        const allEmails = subscribers.map(s => s.email).join(', ');
        if (navigator.clipboard) {
            navigator.clipboard.writeText(allEmails);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    const handleMailAll = () => {
        const allEmails = subscribers.map(s => s.email).join(',');
        window.open(`mailto:?bcc=${encodeURIComponent(allEmails)}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Newsletter Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Newsletter Management</h1>
                        <p className="text-muted-foreground">
                            Beheren van abonnees 
                        </p>
                    </div>
                </div>

                {/* Manual Add & Email Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Handmatig e-mail toevoegen</CardTitle>
                        <CardDescription>Voeg een e-mailadres toe aan de nieuwsbrieflijst.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleManualAdd} className="flex flex-col md:flex-row gap-2 md:items-center">
                            <input
                                type="email"
                                value={manualEmail}
                                onChange={e => setManualEmail(e.target.value)}
                                placeholder="E-mailadres invoeren..."
                                className="border border-input rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring flex-1"
                                required
                                disabled={manualAddLoading}
                            />
                            <Button type="submit" disabled={manualAddLoading || !manualEmail}>
                                <Plus className="mr-2 h-4 w-4" />
                                Toevoegen
                            </Button>
                            <Button type="button" variant="outline" onClick={handleCopyAllEmails}>
                                <Mail className="mr-2 h-4 w-4" />
                                Kopieer alle e-mails
                            </Button>
                            <Button type="button" variant="outline" onClick={handleMailAll}>
                                <Mail className="mr-2 h-4 w-4" />
                                Mail alle abonnees
                            </Button>
                        </form>
                        {copied && <div className="mt-2 text-green-600">Gekopieerd!</div>}
                        {manualAddMessage && <div className="mt-2 text-green-600">{manualAddMessage}</div>}
                        {manualAddError && <div className="mt-2 text-red-600">{manualAddError}</div>}
                    </CardContent>
                </Card>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.active}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inactive Subscribers</CardTitle>
                            <UserX className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.inactive}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Subscribers List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Newsletter Subscribers</CardTitle>
                                <CardDescription>
                                    Manage your newsletter subscribers
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
                                    placeholder="Search subscribers..."
                                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>

                        {/* Subscribers Table */}
                        <div className="rounded-md border">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="text-left p-4 font-medium">Email</th>
                                        <th className="text-left p-4 font-medium">Status</th>
                                        <th className="text-left p-4 font-medium">Subscribed Date</th>
                                        <th className="text-right p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscribers.map((subscriber, index) => (
                                        <motion.tr
                                            key={subscriber.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="border-b hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="p-4">
                                                <div className="font-medium">{subscriber.email}</div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={subscriber.is_active ? "default" : "secondary"}>
                                                    {subscriber.is_active ? "Active" : "Inactive"}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-sm text-muted-foreground">
                                                {new Date(subscriber.subscribed_at).toLocaleDateString('nl-NL', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline"
                                                        onClick={() => handleToggleStatus(subscriber.id)}
                                                    >
                                                        {subscriber.is_active ? (
                                                            <>
                                                                <UserX className="h-3 w-3 mr-1" />
                                                                Deactivate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserCheck className="h-3 w-3 mr-1" />
                                                                Activate
                                                            </>
                                                        )}
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        variant="destructive"
                                                        onClick={() => handleDelete(subscriber.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 