"use client"
import React from 'react';
import { SessionProvider } from 'next-auth/react';


const Auth = ({children}:{children: Readonly<React.ReactNode>}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default Auth;