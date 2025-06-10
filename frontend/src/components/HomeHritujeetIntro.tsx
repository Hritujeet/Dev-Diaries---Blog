import React from 'react';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const HomeHritujeetIntro = () => {
    return (
        <section className="w-[90vw] max-w-4xl mx-auto my-16 px-6 py-10 bg-white shadow-lg rounded-2xl">
            <h2 className="text-4xl font-extrabold text-center text-blue-500 mb-8">Who’s Hritujeet?</h2>

            <p className="text-neutral-800 text-sm md:text-lg leading-relaxed mb-4">
                Amid the quiet hum of a computer’s fan and the soft glow of a dual-screen setup, I find my rhythm in code.
                I’m <span className="font-semibold text-blue-600">Hritujeet Sharma</span> — a teenage developer driven by curiosity and creativity.
                From building sleek, responsive websites to experimenting with immersive game mechanics and machine learning models,
                I thrive where logic meets imagination.
            </p>

            <p className="text-neutral-800 text-sm md:text-lg leading-relaxed mb-8">
                With a strong foundation in modern web development and a growing portfolio of hands-on projects,
                I’m constantly exploring new dimensions in tech. Whether it’s designing seamless user experiences or
                prototyping intelligent systems, I write every line of code with intention and insight. Currently I am 16 and looking for better opportunities to learn Machine Learning
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/projects" className={buttonVariants({ variant: "default" })}>
                    View Projects
                </Link>
                <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
                    Let’s Talk
                </Link>
            </div>
        </section>
    );
};

export default HomeHritujeetIntro;
