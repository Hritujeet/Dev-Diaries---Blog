import React from 'react';
import {BookOpen, Code, Coffee, Heart, Lightbulb, Users} from 'lucide-react';
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

const AboutPage = () => {
    const skills = [
        {name: "JavaScript", level: 90, color: "bg-yellow-500"},
        {name: "React", level: 75, color: "bg-blue-500"},
        {name: "Node.js", level: 80, color: "bg-green-500"},
        {name: "Python", level: 95, color: "bg-blue-600"},
        {name: "TypeScript", level: 70, color: "bg-blue-700"},
        {name: "MongoDB", level: 95, color: "bg-green-600"}
    ];

    const values = [
        {
            icon: <Code className="w-6 h-6"/>,
            title: "Clean Code Advocate",
            description: "I believe in writing code that tells a story - readable, maintainable, and elegant."
        },
        {
            icon: <Lightbulb className="w-6 h-6"/>,
            title: "Continuous Learner",
            description: "Technology evolves rapidly, and I'm committed to growing with it, one concept at a time."
        },
        {
            icon: <Users className="w-6 h-6"/>,
            title: "Early Bird",
            description: "Started Coding when I was 11. Currently, I am 16 and trying to enhance my skills and puch my limits"
        },
        {
            icon: <Heart className="w-6 h-6"/>,
            title: "Problem Solver",
            description: "Every bug is a puzzle, every feature is an opportunity to create something meaningful."
        }
    ];

    const milestones = [
        {year: "2020", event: "Started my programming journey with Python at the age of 11"},
        {year: "2021", event: "Built my first project ever with python"},
        {year: "2022", event: "Started Javascript and Web dev"},
        {year: "2023", event: "Enhanced my Web dev Capabilities and improved Programming skills. Started Github"},
        {year: "2024", event: "Full stack web dev with Typescript, React, NextJS and Express."},
        {year: "2025", event: "Building my profile and exploring the world of machine learning"}
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden w-[80vw] mx-auto my-20 bg-white shadow-lg rounded-lg">
                <div className="absolute inset-0"></div>
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6">
                            It&#39;s me, <span className="text-blue-400">Hritujeet</span>
                        </h1>
                        <p className="text-base text-neutral-800 mb-8 max-w-3xl mx-auto">
                            A passionate developer sharing the journey through code, coffee, and countless debugging
                            sessions.
                            Welcome to my corner of the internet where I document the beautiful chaos of programming.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link href="/projects" className={buttonVariants({variant: "default"})}>
                                View Projects
                            </Link>
                            <Link href="/contact" className={buttonVariants({variant: "outline"})}>
                                Let’s Talk
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Story</h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                My programming journey began with curiosity and a simple Hello, World! that changed
                                everything.
                                What started as tinkering with code has evolved into a passionate pursuit of creating
                                digital solutions
                                that make a difference.
                            </p>
                            <p>
                                Through Dev Diaries, I share the real, unfiltered experience of being a developer - the
                                victories,
                                the failures, the late-night debugging sessions, and those magical moments when
                                everything finally clicks.
                                It&#39;s not just about the code; it&#39;s about the journey.
                            </p>
                            <p>
                                When I&#39;m not coding, you&#39;ll find me exploring new technologies, contributing to
                                open-source projects,
                                or mentoring fellow developers. I believe that knowledge grows when shared, and every
                                challenge
                                is an opportunity to learn something new.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Code className="w-5 h-5 text-blue-600"/>
                                <span className="font-semibold text-gray-800">Programming Experience</span>
                            </div>
                            <p className="text-gray-600">4+ years</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Coffee className="w-5 h-5 text-blue-600"/>
                                <span className="font-semibold text-gray-800">Fuel of Choice</span>
                            </div>
                            <p className="text-gray-600">Coffee ☕ (and occasionally tea)</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <BookOpen className="w-5 h-5 text-blue-600"/>
                                <span className="font-semibold text-gray-800">Currently Reading</span>
                            </div>
                            <p className="text-gray-600">Python for Data Analysis</p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What Drives Me</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div key={index}
                                 className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                <div
                                    className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="font-bold text-gray-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Technical Arsenal</h2>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Skills & Proficiency</h3>
                                <div className="space-y-4">
                                    {skills.map((skill, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-gray-700">{skill.name}</span>
                                                <span className="text-sm text-gray-500">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                                                    style={{width: `${skill.level}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Tech Stack Highlights</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs">Frontend:</span>
                                        {["React", "Next.js", "Tailwind CSS", "TypeScript"].map((tech) => (
                                            <span key={tech}
                                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs">Backend:</span>
                                        {["Node.js", "Express", "MongoDB", "PostgreSQL"].map((tech) => (
                                            <span key={tech}
                                                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs">Tools:</span>
                                        {["Git", "Vercel"].map((tech) => (
                                            <span key={tech}
                                                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Journey Milestones</h2>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex items-center gap-6 group">
                                    <div
                                        className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                                        {milestone.year}
                                    </div>
                                    <div className="flex-grow">
                                        <div
                                            className="bg-gray-50 rounded-lg p-4 group-hover:bg-blue-50 transition-colors duration-300">
                                            <p className="text-gray-700 font-medium">{milestone.event}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;