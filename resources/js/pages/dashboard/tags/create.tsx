import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette } from 'lucide-react';

const TagCreate: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        color: '#3B82F6',
        description: '',
    });

    const [showColorPicker, setShowColorPicker] = useState(false);

    const predefinedColors = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.tags.store'));
    };

    return (
        <>
            <Head title="Create Tag | Dashboard" />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex items-center mb-6">
                            <Link
                                href={route('dashboard.tags.index')}
                                className="text-gray-400 hover:text-gray-600 mr-4"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-light text-gray-900">Create New Tag</h1>
                                <p className="mt-2 text-gray-600">Add a new tag to organize your gallery</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-4 py-6 sm:px-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white shadow rounded-lg p-6"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Tag Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.name ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter tag name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Color Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tag Color *
                                    </label>
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setShowColorPicker(!showColorPicker)}
                                                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <div
                                                    className="w-6 h-6 rounded border"
                                                    style={{ backgroundColor: data.color }}
                                                />
                                                <span className="text-sm text-gray-700">{data.color}</span>
                                                <Palette className="w-4 h-4 text-gray-400" />
                                            </button>
                                            
                                            {showColorPicker && (
                                                <div className="absolute z-10 mt-2 p-3 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    <div className="grid grid-cols-5 gap-2">
                                                        {predefinedColors.map((color) => (
                                                            <button
                                                                key={color}
                                                                type="button"
                                                                onClick={() => {
                                                                    setData('color', color);
                                                                    setShowColorPicker(false);
                                                                }}
                                                                className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                                                                style={{ backgroundColor: color }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="mt-3">
                                                        <input
                                                            type="color"
                                                            value={data.color}
                                                            onChange={(e) => setData('color', e.target.value)}
                                                            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {errors.color && (
                                        <p className="mt-1 text-sm text-red-600">{errors.color}</p>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.description ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter tag description (optional)"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Preview */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preview
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="px-3 py-1 rounded-full text-sm font-medium"
                                            style={{
                                                backgroundColor: data.color + '20',
                                                color: data.color,
                                            }}
                                        >
                                            {data.name || 'Tag Name'}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-3 pt-6">
                                    <Link
                                        href={route('dashboard.tags.index')}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Creating...' : 'Create Tag'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TagCreate; 