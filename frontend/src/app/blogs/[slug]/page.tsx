import React from 'react';
import PostSection from "@/components/PostSection";

const Page = () => {
    return (
        <div className={'w-[95vw] sm:w-[75vw] lg:w-[60vw] mx-auto flex gap-4 my-20'}>
            <PostSection />
        </div>
    );
};

export default Page;