"use client"
import React from 'react';
import {Calendar, ExternalLink} from 'lucide-react';
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/components/ui/skeleton";

type Project = {
    id: string;
    title: string;
    description: string;
    year: number;
    techStack: string[];
    link: string;
}

const ProjectsContainer = () => {
    const {isFetched, data, error, isFetching} = useQuery({
        queryFn: async () => {
            const response = await fetch("http://localhost:8000/api/admin/jeet/devDiaries/1982/fetchProjects");

            if (!response.ok) {
                throw new Error(`Failed to fetch projects: ${response.status}`);
            }

            const {allProjects}: { allProjects: Project[] } = await response.json();
            console.log(allProjects);
            return allProjects;
        },
        queryKey: ['allProjects'], // Fixed: was 'allBlogs'
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 gap-8">
            {Array.from({length: 4}).map((_, index) => (
                <Skeleton key={index} className="h-64 w-full"/>
            ))}
        </div>
    );

    const ErrorDisplay = () => (
        <div className="h-screen flex justify-center items-center font-bold text-5xl">An Error Occurred, Try again
            later...</div>
    );

    const EmptyState = () => (
        <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Projects Found
                </h3>
                <p className="text-gray-600">
                    Check back soon for exciting new projects!
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Header Section */}
            <div className="bg-white border-b border-blue-100">
                <div className="max-w-4xl mx-auto px-6 py-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">
                        My Projects
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        A collection of projects that showcase my journey in software development
                    </p>
                </div>
            </div>

            {/* Projects Section */}
            <main className="max-w-5xl mx-auto px-6 py-12">
                {isFetching && <LoadingSkeleton/>}

                {error && <ErrorDisplay/>}

                {isFetched && data && data.length === 0 && <EmptyState/>}

                {isFetched && data && data.length > 0 && (
                    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                        {data.map((project) => (
                            <article
                                key={project.id}
                                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 overflow-hidden"
                            >
                                {/* Gradient overlay */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"/>

                                <div className="p-8">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                                                {project.title}
                                            </h2>
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Calendar className="w-4 h-4"/>
                                                <span className="text-sm font-medium">{project.year}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                                Technologies Used
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* GitHub Link */}
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${buttonVariants({variant: "outline"})} font-semibold gap-2`}
                                        >
                                            <span>View on GitHub</span>
                                            <ExternalLink className="w-4 h-4"/>
                                        </Link>
                                    </div>
                                </div>

                                {/* Hover effect overlay */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"/>
                            </article>
                        ))}
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Want to collaborate?
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            I&#39;m always excited to work on new projects and learn from fellow developers.
                            Let&#39;s build something amazing together!
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Let&#39;s Talk
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectsContainer;